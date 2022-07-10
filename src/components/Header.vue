<template>
  <div class="text-xl mb-12">
    <div class="icon-btn mx-2 disabled" disabled title="PR welcome!">
      <Icon icon='ri:sun-line' class="inline-block" />
    </div>

    <a class="icon-btn mx-2" :href="wordsList" target="_blank">
      <Icon icon="ri:play-list-add-fill" class="inline-block" />
    </a>

    <a class="icon-btn mx-2" :href="homepage" target="_blank">
      <Icon icon="ri:github-fill" class="inline-block" />
    </a>
  </div>
</template>

<script setup>
import pkgJSON from '../../package.json'
import Icon from './Icon.vue'

const homepage = pkgJSON.homepage
const wordsList = homepage + '#单词表'
</script>
