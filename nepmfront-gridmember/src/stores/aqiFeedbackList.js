import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAqiFeedbackListStore = defineStore('aqiFeedbackList', () =>{
    const baseUrl = ref('http://118.202.10.193:8080/');
    // const baseUrl = ref('http://localhost:8080/nepm/');
    const gmId = ref("");
    const setGmId = (id) => {
        gmId.value = id;
    };
    return {baseUrl,gmId,setGmId}
}, {
    persist: true,
})