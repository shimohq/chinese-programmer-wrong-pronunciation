const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

const pkgJSON = require('../package.json')
const issueURL = pkgJSON.bugs.url

const words = require('./data.json')
const wordsPath = path.posix.join(__dirname, './data.json')
const readmePath = path.posix.join(__dirname, '../README.md')

async function policeCase () {
  try {
    execSync('npx case-police README.md scripts/data.json', { stdio: 'inherit' })
  } catch (err) {
    console.error('[Build Failed]', '请使用 npm run case-police 命令检查单词大小写并重新提交\n')
    process.exit(-1)
  }
}

function sortWords (words) {
  return words.sort((a, b) => {
    const aname = a.name.toLowerCase()
    const bname = b.name.toLowerCase()
    if (aname < bname) {
      return -1
    } else {
      return 1
    }
  })
}

function genWordURL (word, type) {
  const safeWord = encodeURIComponent(word)
  const safeType = encodeURIComponent(type)
  const gitPagesURL= 'https://shimohq.github.io/chinese-programmer-wrong-pronunciation/'
  return `${gitPagesURL}?audio=${safeWord}&type=${safeType}`
}

async function genReadme (words) {
  let tableContent = `| 单词 | 正确发音（英音）| 正确发音（美音）| 错误发音 |\n| --- | ----------- | ----------- | ---------- |`
  words.map(word => {
    tableContent += `\n| ${word.name} | [🔊](${genWordURL(word.name, 1)})  /${word.phonetic_uk}/ | [🔊](${genWordURL(word.name, 2)})  /${word.phonetic_us}/ | ${word.phonetic_wrong ? `❌ /${word.phonetic_us}/` : '-' } |`
  })
  const readmeContent = fs.readFileSync(readmePath, 'utf-8')
  const writeFlagStart = `<!-- Table Generate Start -->`
  const writeFlagEnd = `<!-- Table Generate End -->`
  const writeContent = readmeContent.replace(new RegExp(`(${writeFlagStart})[^<]*(${writeFlagEnd})`), `$1\n${tableContent}\n$2`)
  fs.writeFileSync(readmePath, writeContent)
}

async function genHTML () {
  execSync('vite build', { stdio: 'inherit' })

  const indexPath = path.join(__dirname, '../docs/index.html')
  const indexContent = fs.readFileSync(indexPath, 'utf-8')
  const writeContent = indexContent
    .replace(/src="([^"]*)"/g, "src='.$1'")
    .replace(/href="([^"]*)"/g, "href='.$1'")
  fs.writeFileSync(indexPath, writeContent)

  execSync('git add .', { stdio: 'inherit' })
  execSync('git commit -am "chore: build"', { stdio: 'inherit' })
}

async function main () {
  try {
    await policeCase()
    const sortedWords = sortWords(words)
    await genReadme(sortedWords)
    await fs.writeFileSync(wordsPath, JSON.stringify(sortedWords, null, 2))
    await genHTML()
  } catch (uncatchError) {
    console.log(uncatchError)
    console.log('[Build Failed]', 'issue welcome on', issueURL, '\n')
    process.exit(-1)
  }

  console.log('[Build Done]')
}

main()
