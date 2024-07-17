import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAqiFeedbackStore = defineStore('aqiFeedback', () =>{
    const baseUrl = ref('http://118.202.10.193:8080/');
    // const baseUrl = ref('http://localhost:8080/nepm/');
    const afId = ref("");
    const setAfId = (id) => {
        afId.value = id;
    };
    return {baseUrl,afId,setAfId}
}, {
    persist: true,
})