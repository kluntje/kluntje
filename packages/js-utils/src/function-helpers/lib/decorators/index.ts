import { debounce as debounceHelper, throttle as throttleHelper } from "../../";
import { decoratorGenerator } from "./decoratorGenerator";

export const debounce = decoratorGenerator(debounceHelper) as (wait?: number) => MethodDecorator;
export const throttle = decoratorGenerator(throttleHelper) as (wait?: number) => MethodDecorator;
