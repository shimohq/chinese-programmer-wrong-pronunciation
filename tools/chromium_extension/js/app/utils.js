function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    let reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

function getCookie(name) {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
  //await cookieStore.get({name:name})
}

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

function setCookie(name, value, second, domain) {
  var exp = new Date();
  exp.setTime(exp.getTime() + second * 1000);
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    ";expires=" +
    exp.toGMTString() +
    ";path=" +
    path +
    ";domain=" +
    domain +
    ";SameSite=None;Secure";
}
async function getCookies(domain) {
  let cookies = await cookieStore.getAll({ domain: domain });
  return cookies;
}

function encodeBase64(str) {
  return btoa(encodeURIComponent(str));
}

function decodeBase64(encoded) {
  return decodeURIComponent(atob(encoded));
}

function getParameterValue(name) {
  let reg = new RegExp("[^?&]?" + encodeURI(name) + "=[^&]+");
  let arr = location.search.match(reg);
  if (arr != null) {
    return decodeURI(arr[0].substring(arr[0].search("=") + 1));
  }
  return "";
}

function createJSONFile(content, filename) {
  let blob = new Blob([JSON.stringify(content)], { type: "application/json" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(function () {
    window.URL.revokeObjectURL(url);
  }, 3000);
}

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function getMediaDevices() {
  return await navigator.mediaDevices.enumerateDevices();
}

// new URLSearchParams
// new URL
// (new Date()).toISOString()
export {
  addClass,
  removeClass,
  hasClass,
  setCookie,
  getCookie,
  encodeBase64,
  decodeBase64,
  getParameterValue,
  sleep,
  getMediaDevices,
  createJSONFile,
};
