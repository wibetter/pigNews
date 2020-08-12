/**
 * Module exports.
 */

// module.exports = jsonp;

/**
 * Callback index.
 */

let count = 0;

/**
 * Noop function.
 */

function noop() {}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};

  const prefix = opts.prefix || '__jp';

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  const id = opts.name || prefix + count++;

  const param = opts.param || 'callback';
  const timeout = opts.timeout != null ? opts.timeout : 60000;
  const enc = encodeURIComponent;
  const target = document.getElementsByTagName('script')[0] || document.head;
  let script;
  let timer;

  if (timeout) {
    timer = setTimeout(() => {
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script);
    window[id] = noop;
    if (timer) clearTimeout(timer);
  }

  function cancel() {
    if (window[id]) {
      cleanup();
    }
  }

  window[id] = function (data) {
    console.log('jsonp got', data);
    cleanup();
    if (fn) fn(null, data);
  };

  // add qs component
  url += `${(~url.indexOf('?') ? '&' : '?') + param}=${enc(id)}${
    opts.cache ? '&dpc=1' : ''
  }`;
  // url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');

  console.log('jsonp req "%s"', url);

  // create script
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);

  return cancel;
}
export default jsonp;
