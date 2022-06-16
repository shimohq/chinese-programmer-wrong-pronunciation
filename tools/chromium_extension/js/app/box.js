import * as until from "./until.js";
import * as components from "./components.js";
import * as searchEngine from "./search-engine.js";

let goToSearchPronounce = (word) => {
  let search_engine_name = "gotToGoogleSearch";
  // search_engine_name='gotToYouDaoSearch'
  // search_engine_name = "goToBingDictSearch";
  // search_engine_name = "goToBingSearch";
  search_engine_name = "gotToYouDaoSearch";
  // search_engine_name = "goToBaiduFanYiSearch";
  let tab = "current_tab";

  let opener = components.getSearchEngineOpener();
  if (opener && opener.expired_date) {
    if (opener.expired_date > new Date().getTime()) {
      if (opener.search_engine_name) {
        search_engine_name = opener.search_engine_name;
      }
      if (opener.tab) {
        tab = opener.tab;
      }
    }
  }
  if (search_engine_name && searchEngine[search_engine_name]) {
    console.log(word);
    let url = searchEngine[search_engine_name](word);
    console.log(url);
    if (tab === "new_tab") {
      window.open(url, "_blank");
    } else {
      let iframe = components.getIframe();
      iframe.setAttribute("src", url);
    }
  } else {
    console.log("search engine no found !");
  }
};

let box = { ...until, ...components, ...searchEngine, goToSearchPronounce };
export default box;
