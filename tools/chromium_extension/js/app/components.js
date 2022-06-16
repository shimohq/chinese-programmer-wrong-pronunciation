import { prettyBox } from "./pretty-box.js";

let styleConfig = () => {
  let css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("type", "text/css");
  css.setAttribute("href", chrome.runtime.getURL("css/app.css"));
  document.head.appendChild(css);
};

let customElement = () => {
  let link = document.createElement("link");
  link.setAttribute(
    "href",
    chrome.runtime.getURL("web-components/x-custom-box.html")
  );
  document.head.appendChild(link);
};

let getIframe = () => {
  let box = document.querySelector(
    "#chinese-programmer-wrong-pronunciation-custom-iframe-box"
  );
  let iframe = null;
  if (!box) {
    let custom_box = document.createElement(
      "x-chinese-programmer-wrong-pronunciation-custom-box"
    );

    let aside = document.createElement("aside");
    aside.setAttribute(
      "id",
      "chinese-programmer-wrong-pronunciation-custom-iframe-box"
    );
    aside.setAttribute(
      "class",
      "chinese-programmer-wrong-pronunciation-custom-iframe-box"
    );
    aside.setAttribute("draggable", "true");

    iframe = document.createElement("iframe");
    iframe.setAttribute(
      "id",
      "chinese-programmer-wrong-pronunciation-custom-iframe"
    );
    iframe.setAttribute("security", "restricted");
    //iframe.setAttribute('sandbox',"")
    aside.appendChild(iframe);
    custom_box.appendChild(aside);
    document.body.appendChild(custom_box);

    //设置 box 可 拖拽
    prettyBox(aside);
    //显示重置按键
    //showResetCurrentSearchEngineTab()
  } else {
    iframe = box.querySelector(
      "#chinese-programmer-wrong-pronunciation-custom-iframe"
    );
  }
  return iframe;
};

let opener_key = "how-to-pronounce-from-search-engine-open-tab-opener";
let getSearchEngineOpener = () => {
  return JSON.parse(sessionStorage.getItem(opener_key));
};

let showResetCurrentSearchEngineTab = () => {
  let div = document.createElement("div");
  div.setAttribute(
    "id",
    "#chinese-programmer-wrong-pronunciation-custom-tools-bar"
  );
  div.innerHTML = `
        <span>关闭搜索页面</span>🥳🥳🥳🥳🥳🥳<span>更换搜索引擎</span>
    `;

  document
    .querySelector("#chinese-programmer-wrong-pronunciation-custom-iframe-box")
    .appendChild(div);
};
let setSearchEngineOpener = (search_engine_name, tab) => {
  let opener = getSearchEngineOpener();
  if (!opener || opener.expired_date < new Date().getTime()) {
    search_engine_name = "gotToGoogleSearch";
    /*
        if (window.confirm('默认有道词典搜索,选择 “取消” 将设置为谷歌搜索,有效期一天')) {  //当前页面展示搜索结果
            search_engine_name = "gotToYouDaoSearch"
        } else {
            //新开标签页展示搜索结果
           search_engine_name = "gotToGoogleSearch"
        }
        */

    //页面展示方式，默认有效期一天
    let expired_date = new Date().getTime() + 24 * 60 * 60 * 1000;
    // expired_date = (new Date()).getTime() + 10000  # test expired

    tab = "current_tab";
    /*
        if (window.confirm('允许当前页面展示搜索结果')) {  //当前页面展示搜索结果
            tab = "current_tab"
        } else {
            //新开标签页展示搜索结果
            tab = "new_tab"
        }
         */

    sessionStorage.setItem(
      opener_key,
      JSON.stringify({
        tab: tab,
        expired_date: expired_date,
        search_engine_name: search_engine_name,
      })
    );
  }
};

let cleanOpener = () => {
  sessionStorage.removeItem(opener_key);
};

export {
  styleConfig,
  customElement,
  getIframe,
  getSearchEngineOpener,
  setSearchEngineOpener,
};
