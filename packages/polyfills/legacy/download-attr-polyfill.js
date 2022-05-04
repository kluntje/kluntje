// check support for "download" attribute
var downloadAttributeSupport = 'download' in document.createElement('a');
var msSaveBlob = typeof window.navigator.msSaveBlob !== 'undefined';

if (!downloadAttributeSupport && msSaveBlob) {
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    var tagName = target.tagName;
    var href = target.href;
    // const fileName = new URL(href).pathname.split('/').pop();

    if (tagName === 'A' && target.hasAttribute('download')) {
      evt.preventDefault();

      var fileName = new URL(href).pathname.split('/').pop();

      var xhr = new XMLHttpRequest();

      xhr.open('GET', href);

      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          window.navigator.msSaveBlob(xhr.response, fileName);
        } else {
          console.error('download-attribute-polyfill:', xhr.status, xhr.statusText);
        }
      };

      xhr.send();
    }
  });
}