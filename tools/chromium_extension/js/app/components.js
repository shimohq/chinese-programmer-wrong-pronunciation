import { prettyBox } from "./pretty-box.js";
import { hasClass, addClass, removeClass } from "./utils.js";

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

    let tool_bar = document.createElement("div");
    tool_bar.setAttribute(
      "class",
      "chinese-programmer-wrong-pronunciation-custom-tool-bar"
    );
    tool_bar.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    let window_close_icon = document.createElement("span");
    window_close_icon.innerText = "❌";
    window_close_icon.setAttribute(
      "class",
      "chinese-programmer-wrong-pronunciation-custom-window-close-icon"
    );
    window_close_icon.addEventListener("click", closeSearchWindow);
    tool_bar.appendChild(window_close_icon);

    iframe = document.createElement("iframe");
    iframe.setAttribute(
      "id",
      "chinese-programmer-wrong-pronunciation-custom-iframe"
    );
    iframe.setAttribute("security", "restricted");
    //iframe.setAttribute('sandbox',"")

    aside.appendChild(tool_bar);
    aside.appendChild(iframe);
    custom_box.appendChild(aside);
    document.body.appendChild(custom_box);

    //设置 box 可 拖拽
    prettyBox(aside);
    //显示设置按键
    showSetSearchEngine(tool_bar, window_close_icon);
  } else {
    if (
      hasClass(
        box,
        "chinese-programmer-wrong-pronunciation-custom-iframe-box-hidden"
      )
    ) {
      removeClass(
        box,
        "chinese-programmer-wrong-pronunciation-custom-iframe-box-hidden"
      );
    }
    iframe = box.querySelector(
      "#chinese-programmer-wrong-pronunciation-custom-iframe"
    );
    iframe.setAttribute("src", "about:blank");
    //iframe.contentDocument.close()
    box.removeChild(iframe);

    iframe = document.createElement("iframe");
    iframe.setAttribute(
      "id",
      "chinese-programmer-wrong-pronunciation-custom-iframe"
    );
    iframe.setAttribute("security", "restricted");
    box.appendChild(iframe);
  }
  return iframe;
};

let opener_key = "how-to-pronounce-from-search-engine-open-tab-opener";
let getSearchEngineOpener = () => {
  return JSON.parse(sessionStorage.getItem(opener_key));
};

let showSetSearchEngine = (box, window_close_icon) => {
  let opener = getSearchEngineOpener();

  {
    let search_engin_provider = {
      goToYouDaoSearch: "有道",
      goToGoogleSearch: "谷歌",
      goToBingDictSearch: "必应词典",
      goToBingSearch: "必应",
    };
    let select = document.createElement("select");
    select.setAttribute("name", "search_engin_provider");
    select.setAttribute("class", "search_engin_provider");
    let htmlContent = "";
    for (let i in search_engin_provider) {
      let selected = "";
      if (opener && opener.search_engine_name) {
        selected = i === opener.search_engine_name ? 'selected="selected"' : "";
      }
      htmlContent += `<option value="${i}" ${selected}>${search_engin_provider[i]}</option>`;
    }

    select.innerHTML = htmlContent;

    select.addEventListener("click", setSearchEngine);
    box.insertBefore(select, window_close_icon);
  }
  {
    let search_engin_provider_tab = {
      current_tab: "当前标签展示结果",
      new_tab: "新标签展示结果",
    };
    let select = document.createElement("select");
    select.setAttribute("class", "search_engin_provider_tab");
    select.setAttribute("name", "search_engin_provider_tab");
    let htmlContent = "";
    for (let i in search_engin_provider_tab) {
      let selected = "";
      if (opener && opener.tab) {
        selected = i === opener.tab ? 'selected="selected"' : "";
      }
      htmlContent += `<option value="${i}" ${selected}>${search_engin_provider_tab[i]}</option>`;
    }

    select.innerHTML = htmlContent;

    select.addEventListener("click", setSearchEngineOpener);
    box.insertBefore(select, window_close_icon);
  }

  let div = document.createElement("span");
  div.setAttribute(
    "class",
    "chinese-programmer-wrong-pronunciation-custom-tool-bar-setup"
  );
  div.innerText = `⚙`;
  // box.insertBefore(div,select)
};

//关闭窗口
let closeSearchWindow = () => {
  let box = document.querySelector(
    "#chinese-programmer-wrong-pronunciation-custom-iframe-box"
  );
  console.log(box);
  if (
    box &&
    !hasClass(
      box,
      "chinese-programmer-wrong-pronunciation-custom-iframe-box-hidden"
    )
  ) {
    addClass(
      box,
      "chinese-programmer-wrong-pronunciation-custom-iframe-box-hidden"
    );
  }
  let iframe = box.querySelector(
    "#chinese-programmer-wrong-pronunciation-custom-iframe"
  );
  iframe.setAttribute("src", "about:blank");
};

let setSearchEngine = (event) => {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target.value);
  setupConfig(event.target.value, null);
};
let setSearchEngineOpener = (event) => {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target.value);

  setupConfig(null, event.target.value);
};

let setupConfig = (search_engine_name, tab) => {
  let opener = getSearchEngineOpener();
  //页面展示方式，默认有效期一天
  let expired_date = new Date().getTime() + 24 * 60 * 60 * 1000;
  if (opener) {
    if (search_engine_name) {
      opener.search_engine_name = search_engine_name;
    }
    if (tab) {
      opener.tab = tab;
    }
  } else {
    tab = "current_tab";
    search_engine_name = "goToYouDaoSearch";
    opener = {
      tab: tab,
      expired_date: expired_date,
      search_engine_name: search_engine_name,
    };
  }

  sessionStorage.setItem(opener_key, JSON.stringify(opener));
};

let cleanOpener = () => {
  sessionStorage.removeItem(opener_key);
  console.log("恢复扩展默认配置---ok");
};

export {
  styleConfig,
  customElement,
  getIframe,
  getSearchEngineOpener,
  setSearchEngineOpener,
  cleanOpener,
};
