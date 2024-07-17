<template>
  <div>
    <div>
      <t-navbar
        title="导航"
        :fixed="false"
        left-arrow
        @left-click="handleClick"
      />
      <div id="container" ref="amap"></div>
      <div id="panel"></div>
    </div>
  </div>
</template>
   
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { useGuidanceStore } from "@/stores/guidance";
import router from "@/router"; // Import the router object

const guidanceStore = useGuidanceStore();

export default {
  data() {
    return {
      map: null,
      lnglat: [], // [long,lat]
      driving: null,
      mapModule: null, // AMap
    };
  },
  mounted() {
    window._AMapSecurityConfig = {
      securityJsCode: "5739ee692867937abbf2b661e0ce2140", // 申请key对应的秘钥
    };
    this.initAMap();
  },
  destroyed() {
    this.map.destroy();
  },
  methods: {
    initAMap() {
      const _this = this;
      AMapLoader.load({
        key: "25883326b222fe17f89f6739f92ae251", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [],
      })
        .then((AMap) => {
          _this.mapModule = AMap;
          const map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 默认2d地图模式
            zoom: 15, // 初始化地图级别
            zooms: [5, 30],
            // 可以设置初始化当前位置
            center: [116.397428, 39.90923], // 北京
            resizeEnable: true,
          });
          // 添加控件
          AMap.plugin(
            [
              "AMap.ElasticMarker",
              "AMap.Scale",
              "AMap.ToolBar",
              "AMap.HawkEye",
              "AMap.MapType",
              "AMap.Geolocation",
              "AMap.Driving",
              "AMap.AutoComplete",
              "AMap.PlaceSearch",
              "AMap.MarkerClusterer",
            ],
            () => {
              map.addControl(new AMap.ElasticMarker());
              map.addControl(new AMap.Scale());
              map.addControl(new AMap.ToolBar());
              map.addControl(new AMap.HawkEye());
              map.addControl(new AMap.MapType());
              map.addControl(new AMap.Geolocation());
            }
          );
          _this.map = map;
          // 驾驶路线
          _this.toDriving();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toDriving() {
      const _this = this;
      const driving = new _this.mapModule.Driving({
        map: this.map,
        panel: "panel",
      });
      this.driving = driving;
      this.driving.search(
        new _this.mapModule.LngLat(
          guidanceStore.startLongitude,
          guidanceStore.startLatitude
        ),
        new _this.mapModule.LngLat(
          guidanceStore.endLongitude,
          guidanceStore.endLatitude
        ),
        function (status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            console.log("绘制驾车路线完成", result);
          } else {
            console.log("获取驾车数据失败：" + result);
          }
        }
      );
    },
    handleClick() {
      router.push("/feedbackInfo"); 
    },
  },
};
</script>
  
<style scoped>
.t-navbar{
  height: 5vh;
}
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 95vh;
}

#panel {
  position: fixed;
  background-color: white;
  max-height: 30%;
  overflow-y: auto;
  top: 10vh;
  left: 5vw;
  width: 50vw;
}
</style>