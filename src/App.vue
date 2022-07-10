<template>
  <div class="px-2 py-8 text-center text-gray-700 dark:text-gray-200">
    <div class="flex">
      <h1 class="title mb-2 text-left m-auto font-thin" v-html="title" />
    </div>
    <Header />

    <div>
      <div class="flex">
        <table class="m-auto text-left">
          <thead>
            <tr>
              <th />
              <th class="text-center">
                UK
              </th>
              <th class="text-center">
                US
              </th>
              <th class="text-center hidden lg:block">
                Wrong
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="word in words" :class="calcWordClassname(word.name)" :key="word.name">
              <td class="px-2 py-1.5 rounded text-right pr-4 hover:bg-gray-400 hover:bg-opacity-10 cursor-pointer"
                @click="google(word)">
                {{ word.name }}
              </td>
              <td class="px-2 py-1.5 text-sm rounded text-center opacity-75 hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer"
                @click="play(word, 1)">
                /{{ word.phonetic_uk }}/
              </td>
              <td class="px-2 py-1.5 text-sm rounded text-center opacity-75 hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer"
                @click="play(word, 2)">
                /{{ word.phonetic_us }}/
              </td>
              <td
                class="px-2 py-1.5 text-sm rounded text-center text-red-600 dark:text-red-400 opacity-50 hidden lg:block">
                {{ word.phonetic_wrong ? `/${word.phonetic_wrong}/` : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Footer />

    <div
      class="modal fixed flex top-0 bottom-0 right-0 left-0 bg-white pointer-events-none transition-opacity duration-200 ease-in"
      :class="isModalOpen ? 'opacity-100' : 'opacity-0'">
      <div class="m-auto">
        <div class="text-5xl mb-1">
          {{ wordDisplay }}
        </div>
        <div class="text-normal opacity-50">
          {{ region.toUpperCase() }} [{{ phonetic }}]
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import raw from '../scripts/data.json'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

/* Variables define */

const words = ref(raw)
const wordDisplay = ref('')
const phonetic = ref('')
const region = ref('us')
const isModalOpen = ref(false)

const title = Array.from('Chinese Programmer Wrong Pronunciation').map(i => i === ' ' ? '<br>' : `<span>${i}</span>`).join('')

/* Events define */

const play = (word, type) => {
  const audio = new Audio(makeURL(word.name, type))
  const typeName = { 1: 'uk', 2: 'us' }[type]
  audio.addEventListener('playing', () => {
    wordDisplay.value = word.name
    region.value = typeName
    phonetic.value = word[`phonetic_${typeName}`]
    isModalOpen.value = true
    setTimeout(() => {
      isModalOpen.value = false
    }, 1000)
  })
  audio.play()
}

const google = word => {
  window.open(`https://www.google.com/search?q=how+to+pronounce+${word.name.replace(/\s/g, '+')}`, '_blank')
}

function makeURL (word, type) {
  const voiceHost = "https://dict.youdao.com/dictvoice"
  return `${voiceHost}?audio=${word}&type=${type}`
}

function calcWordClassname (word) {
  return 'word-' + word.toLowerCase().replace(/\s+/g, '-')
}

/* Query Listener */

onMounted(() => {
  setTimeout(() => {
    if (window.location.search) {
      /** 
       * window.location.href
       * @example "http://localhost:3333/?audio=access&type=1"
       */
      const search = window.location.search.split('?')
      const queryStr = search ? search[1] : ''
      const queries = queryStr.split('&')
      const query = queries.reduce((h, c) => {
          const [k, v] = c.split('=')
          h[k] = decodeURIComponent(v)
          return h
      }, {})
    
      const cname  = '.' + calcWordClassname(query.audio).toLowerCase().replace(/\s+/g, '-') + ` > td:nth-child(${+query.type + 1})`
      const $word = document.querySelector(cname)
      if ($word) {
        $word.scrollIntoViewIfNeeded()
        setTimeout(() => {
          $word.classList.add('animate-blink')
        }, 500)
      }
    }
  }, 500)
})
</script>

<style>
.title span {
  opacity: 0.4;
  cursor: default;
  transition: 0.4s opacity ease;
}
.title span:hover {
  opacity: 1;
}
.animate-blink {
  animation: 1.5s ease-in 0s 1 alternate blink;
}
@keyframes blink {
  from {
    background-color: rgba(122,122,122,1);
  }
  to {
    background-color: rgba(0,0,0,0);
  }
}
</style>
