import { Ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const colorSchema = useStorage('vitesse-schema', 'auto')
