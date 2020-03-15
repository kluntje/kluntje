jest.mock('@kluntje/js-utils/lib/api-helpers');

import { fetchJSON } from '@kluntje/js-utils/lib/api-helpers';
import { I18nService } from '../I18nService';

describe('services / I18nService test:', () => {
  let instance: I18nService = I18nService.getInstance();
  beforeEach(() => {
    // @ts-ignore - modifing private field to reset singleton
    I18nService._instance = undefined;
    instance = I18nService.getInstance();
  });

  describe('"getInstance" method', () => {
    test('should return the same singleton instance when called twice', () => {
      const firstInstance = I18nService.getInstance();
      const secondInstance = I18nService.getInstance();
      expect(firstInstance).toBe(secondInstance);
    });
  });

  describe('"setUp" method', () => {
    it("should'nt trhow when an url is passed", () => {
      expect(() => instance.setUp({ url: 'path/to/target' })).not.toThrow();
    });

    it("should'nt trhow when a dictionary is passed", () => {
      expect(() => instance.setUp({ dictionary: { key: 'value' } })).not.toThrow();
    });

    it('should trhow when no dictionary or an url is passed', () => {
      expect(() => instance.setUp()).toThrow();
    });
  });

  describe('"isSetUp" accessor', () => {
    it("should return false when service hasn't been setup", () => {
      expect(instance.isSetUp).toEqual(false);
    });

    it('should return true when has been setup by url', () => {
      instance.setUp({ url: 'path/to/target' });
      expect(instance.isSetUp).toEqual(true);
    });

    it('should return true when has been setup by dictionary', () => {
      instance.setUp({ dictionary: { key: 'value' } });
      expect(instance.isSetUp).toEqual(true);
    });
  });

  describe('"get" metod', () => {
    beforeAll(() => {
      // @ts-ignore
      fetchJSON.mockReturnValue(
        Promise.resolve({
          'foo.bar': 'value',
          'bar.bam': 'Hallo {1}, {0}',
          'foo.bam': '{hour} Stunden und {minutes} Minuten.',
        }),
      );
    });

    beforeEach(() => {
      document.documentElement.innerHTML = '';
    });

    it('should return the value when the dictionary was provided', () => {
      instance.setUp({ dictionary: { 'foo.bar': 'value' } });
      expect(instance.get('foo.bar')).toBe('value');
    });

    it('should return a placeholder when the url was provided', () => {
      instance.setUp({ url: 'path/to/target' });
      expect(instance.get('foo.bar').includes('bar')).toBe(true);
      expect(instance.get('foo.bar').includes('</span>')).toBe(true);
    });

    it('should return the value when the fetch was succesfull', async () => {
      instance.setUp({ url: 'path/to/target' });

      instance.get('foo.bar');
      await instance.ready;
      expect(instance.get('foo.bar')).toBe('value');
    });

    it('should replace placeholder markup after server fetch', async () => {
      const container = document.createElement('div');
      instance.setUp({ url: 'path/to/target' });

      container.innerHTML = instance.get('foo.bar');
      document.documentElement.appendChild(container);

      await instance.ready;

      expect(container.innerHTML).toEqual('value');
    });

    it('should replace interpolatins (object) after server fetch', async () => {
      const container = document.createElement('div');
      instance.setUp({ url: 'path/to/target' });

      // 'foo.bam': '{hour} Stunden und {minutes} Minuten.'
      container.innerHTML = instance.get('foo.bam', { interpolations: { hour: '10', minutes: '15' } });
      document.documentElement.appendChild(container);

      await instance.ready;

      expect(container.innerHTML).toEqual('10 Stunden und 15 Minuten.');
    });

    it('should replace interpolatins (array) after server fetch', async () => {
      const container = document.createElement('div');
      instance.setUp({ url: 'path/to/target' });

      // using 'bar.bam': 'Hallo {1}, {0}',
      container.innerHTML = instance.get('bar.bam', { interpolations: ['Max', 'Mustermann'] });
      document.documentElement.appendChild(container);

      await instance.ready;

      expect(container.innerHTML).toEqual('Hallo Mustermann, Max');
    });
  });
});
