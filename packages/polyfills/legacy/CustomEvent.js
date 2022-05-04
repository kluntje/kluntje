(function () {

  const CustomEvent = function (event, params) {
    const evt = document.createEvent("CustomEvent");
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  if (typeof window.CustomEvent !== "function") {
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }

}());