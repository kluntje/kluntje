export default function renderAsync<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    _shouldRenderAsync = true;
  };
}
