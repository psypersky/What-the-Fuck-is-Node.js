console.log('Client Login');
(function() {
  'use strict';
  let errorBox = '<span class="" id="_ID_">_MSG_</span>';

  // Form register
  let formRegister = document.getElementById('form_register');

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

    cleanErrors();

    let data = {
      username: formRegister.elements.username.value,
      email: formRegister.elements.email.value,
      password: formRegister.elements.password.value,
      telephone: formRegister.elements.telephone.value,
    };

    Rq({
      method: 'POST',
      url: '/register',
      data: data,
      headers: {
        'Accept': "application/json;text/html"
      }
    }).then((data) => {
      console.log('Data->', data);
      window.location = data; // I don't like this, but it works.
    }, (reason) => {
      //console.log('Some errors appeared->', reason);
      try {
        reason = JSON.parse(reason);

        if(reason && reason.errors) {
          reason.errors.forEach(error => {

            // input
            let inputUsername = document.getElementsByName(error.type)[0];

            // element
            let errorHTML = createDOMElement('span', {
              class: 'form-error is-visible'
            }, error.msg);

            errorHTML.addEventListener('click', (e) => {
              console.log(errorHTML);
            });

            inputUsername.insertAdjacentHTML('afterend', errorHTML.outerHTML);
          });
        }

      } catch (e) {
        throw e;
      }
    });
  });

  // Request Object
  let Rq = function (options) {
    let method = options.method || 'GET',
        url = options.url || '/',
        data = options.data || null,
        headers = options.headers || {},
        parse = options.parse || null;

    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();

      req.open(method, url, true);

      headers.charset = "utf-8";

      Object.keys(headers).forEach(k => {
          req.setRequestHeader(k, headers[k]);
      });

      req.onload = function() {
        let response = req.response;

        if (req.status === 200 || req.status === 302) {
          if(parse && typeof parse === 'function') {
            try {
              response = parse(response);
            } catch (e) {
              reject(e);
            }
          }
          resolve(response);
        } else {
            reject(response);
        }
      };

      req.onerror = function() {
        reject(new Error("Network error"));
      };

      req.send(serializeBody(data));
    });
  };

  function serializeBody(data) {
    if(data && typeof data === 'object') {
      let body = [];
      for (let k in data){
        body.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
      }
      return body.join('&');
    }
    return null;
  }

  function createDOMElement(name, attributes) {
      attributes = attributes || {};
      let node = document.createElement(name);

      // Attributes
      Object.keys(attributes).forEach(attr => {
          node.setAttribute(attr, attributes[attr]);
      });

      // Children
      for (let i = 2; i < arguments.length; i++) {
          let child = arguments[i];

          if (typeof child === "string") {
              child = document.createTextNode(child);
          }
          node.appendChild(child);
      }

      return node;
  }

  function cleanErrors(){
    let elements = document.getElementsByClassName('form-error');

    while(elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
}());
