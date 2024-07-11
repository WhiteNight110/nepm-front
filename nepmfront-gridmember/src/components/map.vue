<template>
    <div id="container"></div>
  </template>
    
  <script setup>
  import { onMounted, reactive, ref, nextTick } from "vue";
  import AMapLoader from "@amap/amap-jsapi-loader";
  import { aqiFeedback } from "@/api/aqiFeedback";
  import { useAqiFeedbackStore } from "@/stores/aqiFeedback";
  import { useGuidanceStore } from "@/stores/guidance";
  
  const aqiFeedbackStore = useAqiFeedbackStore();
  const guidanceStore = useGuidanceStore();
  
  let listPull = ref();
  const mapData = reactive({
    address: "",
    endLongitude: 0,
    endLatitude: 0,
  });
  
  const fetchData = async () => {
    try {
      const afId = aqiFeedbackStore.afId;
      const response = await aqiFeedback(afId);
      listPull.value = response.data.data;
      console.log(listPull.value);
      updateAddress();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  window._AMapSecurityConfig = {
    securityJsCode: "5739ee692867937abbf2b661e0ce2140",
  };
  
  const updateAddress = () => {
    if (
      listPull.value &&
      listPull.value.gridProvince &&
      listPull.value.gridCity
    ) {
      const address = `${listPull.value.gridProvince.provinceName} ${listPull.value.gridCity.cityName} ${listPull.value.address}`;
      mapData.address = address;
    } else {
      console.error("数据不完整，无法设置地址");
    }
  };
  
  const loadMap = (latitude, longitude) => {
    AMapLoader.load({
      key: "25883326b222fe17f89f6739f92ae251",
      version: "2.0",
      plugins: ["AMap.Scale", "AMap.Geocoder", "AMap.Driving"],
    })
      .then((AMap) => {
        const map = new AMap.Map("container", {
          center: [longitude, latitude], // Center the map on the ending location's coordinates
          zoom: 15,
          resizeEnable: true,
        });
  
        const endMarker = new AMap.Marker({
          position: new AMap.LngLat(longitude, latitude),
          title: "终点位置",
        });
        map.add(endMarker);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const initializeMap = async () => {
    await fetchData();
  
    AMapLoader.load({
      key: "25883326b222fe17f89f6739f92ae251",
      version: "2.0",
      plugins: ["AMap.Geocoder"],
    })
      .then(async (AMap) => {
        const geocoder = new AMap.Geocoder();
        geocoder.getLocation(mapData.address, async (status, result) => {
          if (status === "complete" && result.info === "OK") {
            const { lng, lat } = result.geocodes[0].location;
            mapData.endLongitude = lng;
            mapData.endLatitude = lat;
            console.log("地址" + mapData.address);
            console.log(
              "结束纬度：" + mapData.endLatitude + ", 结束经度：" + mapData.endLongitude
            );
            guidanceStore.setEndLatitude(mapData.endLatitude);
            guidanceStore.setEndLongitude(mapData.endLongitude);
  
            // 确保 DOM 更新完毕
            await nextTick();
  
            // 直接用结束位置的经纬度初始化地图
            loadMap(mapData.endLatitude, mapData.endLongitude);
          } else {
            console.error("获取结束位置的经纬度失败");
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  
    let startlatitude = 0;
    let startlongitude = 0;
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          startlatitude = position.coords.latitude;
          startlongitude = position.coords.longitude;
          console.log(
            "起始纬度：" + startlatitude + ", 起始经度：" + startlongitude
          );
          guidanceStore.setStartLatitude(startlatitude);
          guidanceStore.setStartLongitude(startlongitude);
        },
        function (error) {
          console.error("获取位置失败：", error.message);
        }
      );
    } else {
      console.error("浏览器不支持Geolocation");
    }
  };
  
  onMounted(() => {
    initializeMap();
  });
  </script>
    
  <style scoped>
  #container {
    width: 300px;
    height: 300px;
  }
  </style>