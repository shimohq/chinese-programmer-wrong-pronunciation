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

export { addClass, removeClass };
