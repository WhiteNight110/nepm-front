import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
    const userCode = ref("");
    const setuserCode = (newuserCode) => {
        userCode.value = newuserCode;
    };
    const removeuserCode = () => {
        userCode.value = "";
    };
    return { userCode, setuserCode, removeuserCode };
}, {
    persist: true,
})