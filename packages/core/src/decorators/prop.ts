// eslint-disable-next-line prettier/prettier
import type { Component } from '../component';

export const decoratedProps = Symbol('decorated-props');

/**
 * types property decorator can cast from html attributes
 *
 * @enum {string}
 */
export type PropCastTypes = 'string' | 'boolean' | 'number' | 'object';

/**
 * options that can be passed to the `@prop()` decorator
 */
export type PropDefinition<T = any> = {
  /**
   * when reading from attribute, the value should be casted to this type before storing as property.
   * Default behavior is string
   */
  type?: PropCastTypes;
  /**
   * Component should warn when initializing and not finding the attribute in the markup
   */
  required?: boolean;
  /**
   * default value for the property, when the attribute is not present
   */
  defaultValue?: string | boolean | number | Record<string, unknown> | undefined | null;
  /**
   * list of components methods, method name which should be called when the attribute/property is changed
   */
  reactions?: Array<keyof T | Function> | null;
  /**
   * call the reactions when during initialization of the component the attribute is present in the markup
   */
  reactOnInit?: boolean;
  /**
   * name of the attribute connected to the prop. default is kebab case of the prop name.
   */
  attributeName?: string;
};

export const propDefinitionKeys = ['type', 'required', 'defaultValue', 'reactions', 'reactOnInit', 'attributeName'];

/**
 * default options used by property decorator if not passed in the argument when using the decorator
 */
export const DEFAULT_PROP_DECORATOR_OPTIONS: PropDefinition = {
  required: false,
  reactions: null,
  reactOnInit: false,
};

/**
 * generates a function consumable by legacy decorator implementation with the given options for the prop decorator
 *
 * @param {PropDefinition} options - options used for the elements property
 * @returns {Function}
 */
function getPropDecorator(options: PropDefinition): PropertyDecorator {
  return function propertyDecoratorFunction(proto: Component, propertyName: string): void {
    proto[decoratedProps] = proto[decoratedProps] || {};
    proto[decoratedProps]![propertyName] = options;
  } as PropertyDecorator;
}

/**
 * `@prop` decorator
 *
 * @param {(Component | PropDefinition)} prototypeOrOption - PropDefinition when decorator is called first as a function, custom element when used directly as `@prop`
 * @param {string} [propName] - name of the property, will be kebab-cased to use as attribute
 * @returns {Function}
 */
function propDecorator(prototypeOrOption: Component | PropDefinition, propName?: string): PropertyDecorator | void {
  // used as `@prop propName = 0`
  if (prototypeOrOption instanceof HTMLElement) {
    // execute the function
    const options = {
      ...DEFAULT_PROP_DECORATOR_OPTIONS,
    };

    return getPropDecorator(options)(prototypeOrOption, propName!);
  }
  // used as `@prop({type: "number", required: true, ...})`
  const options: PropDefinition = {
    ...DEFAULT_PROP_DECORATOR_OPTIONS,
    ...prototypeOrOption,
  };
  // return the function
  return getPropDecorator(options);
}

/**
 * `@prop` decorator to add properties to a custom element with or without specific options and reads / reflects to DOM attributes
 * @example
 *  JS
 *  class MyComp extends Component {
 *    // implicit type of boolean with default value: 0
 *    @prop
 *    myProp = 0;
 *
 *    // with more options
 *    @prop({ type: "object", required: true, reactions: ["someCallback"] })
 *    myOtherProp;
 *
 *    someCallback(myOtherProp) {
 *      console.log(myOtherProp);
 *    }
 *  }
 *
 *  HTML
 *  <my-comp my-prop="42" my-other-prop=[1,2]></my-comp>
 */
export default propDecorator as ((options: PropDefinition) => PropertyDecorator) & PropertyDecorator;
