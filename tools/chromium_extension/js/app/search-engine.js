let gotToGoogleSearch = (word) => {
  word = word.replace(/\s/, "+");
  return `https://www.google.com/search?q=how+to+pronounce+${word}`;
};

let gotToYouDaoSearch = (word) => {
  word = word.replace(/\s/, "+");
  return `https://www.youdao.com/result?word=${word}&lang=en`;
};

let goToBingDictSearch = (word) => {
  return `https://cn.bing.com/dict/${word}`;
};
let goToBingSearch = (word) => {
  return `https://cn.bing.com/search?q=how%20to%20pronounce%20${word}`;
};
let goToBaiduDictSearch = (word) => {
  return `https://dict.baidu.com/s?wd=${word}`;
};

let goToBaiduFanYiSearch = (word) => {
  return `https://fanyi.baidu.com/#en/zh/${word}`;
};

let goToBaiDuHanYu = () => {
  // 一点飞上天，黄河两头弯；八字大张口，言字中间走；左一扭，右一扭，你一长，我一长，中间加个马大王；心字底，月字旁，一个小勾挂麻糖，坐个车子逛咸阳。
  // 56个笔画的字 邉
  // U+30EDE （简化版本 U+30EDD）
  {
    "汉".charCodeAt(0).toString(16);
    String.fromCharCode("0x6c49");
  }
  //https://hanyu.baidu.com/s?wd=%E9%82%89
};

export {
  goToBaiDuHanYu,
  gotToYouDaoSearch,
  gotToGoogleSearch,
  goToBingDictSearch,
  goToBingSearch,
  goToBaiduDictSearch,
  goToBaiduFanYiSearch,
};
