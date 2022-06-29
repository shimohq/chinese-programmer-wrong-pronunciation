import { addClass, removeClass } from "./utils.js";

let prettyBox = (box) => {
  // 参考 https://blog.csdn.net/weixin_41910848/article/details/82218243

  let dragging = false;
  let diffX = null;
  let diffY = null;
  box.onmousedown = function (event) {
    dragging = true;

    let left = box.offsetLeft;
    let top = box.offsetTop;

    removeClass(
      box,
      "chinese-programmer-wrong-pronunciation-custom-iframe-box"
    );

    box.style.left = left + "px";
    box.style.top = top + "px";

    diffX = event.clientX - left;
    diffY = event.clientY - top;
  };
  document.onmousemove = function (event) {
    if (dragging) {
      // console.log(event.clientX, event.clientY)
      //console.log(diffX, diffY)

      let moveX = event.clientX - diffX;
      let moveY = event.clientY - diffY;

      if (moveX < 0) {
        moveX = 0;
      } else if (moveX > window.innerWidth - box.offsetWidth) {
        moveX = window.innerWidth - box.offsetWidth;
      }
      if (moveY < 0) {
        moveY = 0;
      } else if (moveY > window.innerHeight - box.offsetHeight) {
        moveY = window.innerHeight - box.offsetHeight;
      }

      box.style.left = moveX + "px";
      box.style.top = moveY + "px";

      event.stopPropagation();
      event.preventDefault();
    }
  };
  document.onmouseup = function (event) {
    dragging = false;
  };

  box.onmouseup = (event) => {
    dragging = false;
  };

  box.ondragstart = function (event) {
    console.log(box.offsetLeft, box.offsetTop);
    console.log("开始拖拽");
  };
  box.ondrag = function () {
    console.log(box.offsetLeft, box.offsetTop);
    console.log("拖拽中");
  };
  box.ondragend = function () {
    console.log(box.offsetLeft, box.offsetTop);
    console.log("拖拽结束");
  };
};

export { prettyBox };
