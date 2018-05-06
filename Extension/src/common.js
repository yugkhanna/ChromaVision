
function $(id) {
  return document.getElementById(id);
}

function siteFromUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function isDisallowedUrl(url) {
  return url.startsWith('chrome') || url.startsWith('about');
}


/**
 * Whether extension is loaded unpacked or from Chrome Webstore.
 * @const {boolean}
 */
var IS_DEV_MODE = !('update_url' in chrome.runtime.getManifest());


/**
 * Easily turn on/off console logs.
 *
 * @param {*} message The message to potentially pass to {@code console.log}.
 */
function debugPrint(str) {
  if (IS_DEV_MODE)
    console.log(str);
}
