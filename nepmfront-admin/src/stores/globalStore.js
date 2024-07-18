import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useGlobalStore = defineStore('global', () =>{
    const baseUrl = ref('http://118.202.10.207:8000/')

    return {baseUrl}
}, {
    persist: true,
})