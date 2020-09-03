提交 PR 请尽量遵循以下条目:

1. 尽量是常见的单词和中国程序员容易读错的单词。
1. 音标目前为[海词](http://dict.cn/)英式发音, 使用 [DJ 音标写法](https://zh.wikipedia.org/wiki/DJ%E9%9F%B3%E6%A8%99)。
1. 音频地址 英音：http://dict.youdao.com/dictvoice?audio=${word}&type=1，美音：http://dict.youdao.com/dictvoice?audio=${word}&type=2  如果没有或者发音不准确再使用其他音频。
1. 音标到这个有道网页找 http://dict.youdao.com/w/eng/{word}
1. 音标使用斜线（`/.../`）而不是方括号（`[...]`）
1. tools目录下有个python程序可以从有道网站创建单词信息，加到主文件
   - Usage: `tools/addword.py <word>`
