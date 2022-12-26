import box from "./box.js";

let init = () => {
  let URLObj = new URL(location.href);
  console.log(URLObj);
  if (document.querySelector("#readme table tbody")) {
    //载入自定义组件样式
    box.styleConfig();
    //载入自定义组件
    box.customElement();

    let audio_player = new Audio();
    audio_player.setAttribute("autoplay", "true");
    document
      .querySelector("#readme table tbody")
      .addEventListener("click", (event) => {
        //console.log(event.target)
        // console.log(event.target.nodeType)
        // console.log(event.target.nodeName);
        let parentElement = event.target.parentElement;
        if (parentElement && parentElement.nodeName === "TR") {
          if (parentElement.firstElementChild === event.target) {
            //使用搜索引擎查询发音
            box.goToSearchPronounce(event.target.innerText);
          }
        }
        event.preventDefault();
        event.stopPropagation();
        let audio_url = null;
        if (event.target.nodeName === "TD") {
          let aTag = event.target.querySelector("a");
          if (aTag) {
            audio_url = aTag.getAttribute("href");
          }
        }
        if (event.target.nodeName === "IMG") {
          let aTag = event.target.parentNode.parentNode;
          audio_url = aTag.getAttribute("href");
        }
        if (event.target.nodeName === "G-EMOJI") {
          let aTag = event.target.parentNode;
          audio_url = aTag.getAttribute("href");
        }
        if (audio_url) {
          let desURL = new URL(audio_url);
          //console.log(desURL.protocol);
          if (desURL.protocol === "http:") {
            //skip http
            location.href = audio_url;
          } else {
            // console.log("audio_url:", audio_url);
            audio_player.setAttribute("src", audio_url);
          }
        }
      });
    document
      .querySelector("#readme table tbody")
      .addEventListener("mouseover", (event) => {
        let parentElement = event.target.parentElement;
        if (parentElement && parentElement.nodeName === "TR") {
          if (parentElement.firstElementChild === event.target) {
            event.target.setAttribute("title", "点击我打开搜索引擎检索");
            event.target.style.cursor = "pointer";
          }
        }
      });

    let table = document.querySelector("#readme table");
    let parent = table.parentNode;
    let note = document.createElement("span");
    note.innerText = `⚪恢复扩展默认配置⚪`;
    note.setAttribute(
      "class",
      "chinese-programmer-wrong-pronunciation-custom-note-reset"
    );

    note.addEventListener("click", (event) => {
      //重置配置
      event.preventDefault();
      event.stopPropagation();
      box.cleanOpener();
    });
    parent.insertBefore(note, table);
  } else {
    console.log("no found README.md table");
  }
};

export { init };
