import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useGlobalStore = defineStore('global', () =>{
    const baseUrl = ref('http://10.1.232.186:8080/nepm/')

    return {baseUrl}
})