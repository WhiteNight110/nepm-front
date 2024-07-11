import { defineStore } from "pinia";
import { ref } from "vue";

export const useGuidanceStore = defineStore(
  "guidance",
  () => {
    // const baseUrl = ref('http://118.202.10.193:8080/nepm/')
    const baseUrl = ref("http://localhost:8080/nepm/");
    const startLatitude = ref("");
    const startLongitude = ref("");
    const endLatitude = ref("");
    const endLongitude = ref("");

    const setStartLatitude = (lat) => {
      startLatitude.value = lat;
    };

    const setStartLongitude = (lng) => {
      startLongitude.value = lng;
    };
    const setEndLatitude = (lat) => {
      endLatitude.value = lat;
    };

    const setEndLongitude = (lng) => {
      endLongitude.value = lng;
    };
    return {
      baseUrl,
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      setStartLatitude,
      setStartLongitude,
      setEndLatitude,
      setEndLongitude,
    };
  },
  {
    persist: true,
  }
);
