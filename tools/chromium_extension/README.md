# 无页面跳转收听正确读音 的 chromium 扩展

## 使用说明

1. 点击第一列，调用的是搜索框页面
1. 点击第二列和第三列，调用的播放音频功能

## [获得最新版扩展](https://github.com/jingjingxyk/chinese-programmer-wrong-pronunciation-chromium-extension.git)

## 手动安装扩展

> 1. 下载 [chinese-programmer-wrong-pronunciation](https://github.com/shimohq/chinese-programmer-wrong-pronunciation/archive/refs/heads/master.zip) 然后解压，找到 `tools/chromium_extension` 子目录
> 2. 打开 Chrome，输入: `chrome://extensions/`
> 3. 勾选 Developer Mode
> 4. 选择 Load unpacked extension... 然后定位到刚才解压的文件夹里面的 `tools/chromium_extension` 目录，确定
> 5. 这就安装好了，去掉 Developer Mode 勾选。
> 6. 打开[`https://github.com/shimohq/chinese-programmer-wrong-pronunciation.git`](https://github.com/shimohq/chinese-programmer-wrong-pronunciation.git)点击单词，即可听正确的单词读音

## 扩展开发参考

1. [content_scripts](https:////developer.chrome.com/docs/extensions/mv3/content_scripts/)
1. [Declare permissions](https:////developer.chrome.com/docs/extensions/mv3/declare_permissions/)
1. [ReplaceGoogleCDN](https://github.com/justjavac/ReplaceGoogleCDN.git)

## note

```text
https://dict.youdao.com/dictvoice?audio=parameter&type=1

```
