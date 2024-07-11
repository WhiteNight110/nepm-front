<template>
  <div class="wrapper">
    <div class="app-bar">
      <span class="icon-wrapper" @click="handleIconClick">
        <el-icon><ArrowLeft /></el-icon>
      </span>
    </div>
    <el-card class="show-data" v-if="listPull" :data="listPull">
      <div class="part1">
        <div class="left">
          <div class="estimatedGrade">
            预估等级：
            <div
              :class="[
                'measuredGrade-block',
                getmeasuredGradeColor(listPull.estimatedGrade),
              ]"
            >
              {{ convertToChineseNumber(listPull.estimatedGrade) }}
            </div>
          </div>
          <div class="address">
            {{ listPull.address }}
          </div>
          <div class="grid">
            <el-icon><Location /></el-icon>
            {{ codeToText[listPull.provinceId] }}
            {{ codeToText[listPull.cityId] }}
          </div>
        </div>
        <div class="right">
          <div class="map">
            <MyMap />
          </div>
          <el-button type="primary" @click="gotoGuidance" style="width: 50%">
            导航
          </el-button>
        </div>
      </div>
      <div class="part2">
        <div class="supervisor">
          <el-icon><User /></el-icon>
          <div class="detail">
            <div>{{ listPull.supervisor.realName }}</div>
            <div>{{ listPull.supervisor.telId }}</div>
          </div>
        </div>
        <div class="information">
          <el-icon><Document /></el-icon>
          <div>{{ listPull.information }}</div>
        </div>
      </div>
    </el-card>
    <!-- 实测浓度 -->
    <el-card class="measured-data">
      <el-form :model="formData" :rules="rules" ref="form">
        <el-form-item class="flex-row" prop="so2Value">
          <span>SO2浓度</span>
          <el-input
            v-model="formData.so2Value"
            placeholder="请输入浓度"
            @input="getso2Level"
          ></el-input>
          <span>ug/m3</span>
          <div class="custom-cell">
            <div
              :class="[
                'measuredGrade-block',
                getmeasuredGradeColor(formData.so2Level),
              ]"
            >
              {{ convertToChineseNumber(formData.so2Level) }}
            </div>
          </div>
        </el-form-item>
        <el-form-item class="flex-row" prop="coValue">
          <span>CO浓度</span>
          <el-input
            v-model="formData.coValue"
            placeholder="请输入浓度"
            @input="getcoLevel"
          ></el-input>
          <span>ug/m3</span>
          <div class="custom-cell">
            <div
              :class="[
                'measuredGrade-block',
                getmeasuredGradeColor(formData.coLevel),
              ]"
            >
              {{ convertToChineseNumber(formData.coLevel) }}
            </div>
          </div>
        </el-form-item>
        <el-form-item class="flex-row" prop="spmValue">
          <span>PM2.5浓度</span>
          <el-input
            v-model="formData.spmValue"
            placeholder="请输入浓度"
            @input="getspmLevel"
          ></el-input>
          <span>ug/m3</span>
          <div class="custom-cell">
            <div
              :class="[
                'measuredGrade-block',
                getmeasuredGradeColor(formData.spmLevel),
              ]"
            >
              {{ convertToChineseNumber(formData.spmLevel) }}
            </div>
          </div>
        </el-form-item>
        <el-form-item
          class="AQIlabel"
          :class="[
            getmeasuredGradeColor(formData.aqiLevel),
            { 'form-complete': isFormComplete },
          ]"
        >
          <!-- 实测AQI等级 -->
          <span>
            实测AQI等级：{{ formData.aqiLevel }}
            {{ getAQIGradeDescription(formData.aqiLevel) }}
          </span>
        </el-form-item>
        <el-form-item>
          <!-- 提交按钮 -->
          <el-button
            type="primary"
            @click="submitForm(form)"
            style="width: 50%"
          >
            提交实测数据
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ArrowLeft, User, Document, Location } from "@element-plus/icons-vue";
import { reactive, ref, onMounted, computed, watch } from "vue";
import { aqiFeedback, saveStatistics } from "@/api/aqiFeedback";
import { useAqiFeedbackStore } from "@/stores/aqiFeedback";
import { codeToText } from "element-china-area-data";
import { ElMessage } from "element-plus";
import router from "@/router";
import MyMap from "@/components/map.vue";

const aqiFeedbackStore = useAqiFeedbackStore();

components: {
  MyMap;
}

const formData = reactive({
  gmId: "",
  provinceId: "",
  cityId: "",
  address: "",
  so2Value: "",
  so2Level: "",
  coValue: "",
  coLevel: "",
  spmValue: "",
  spmLevel: "",
  aqiLevel: "",
  fdId: "",
  information: "",
  confirmDate: "",
  confirmTime: "",
});

const rules = {
  so2Value: [{ required: true, message: "请输入SO2浓度", trigger: "blur" }],
  coValue: [{ required: true, message: "请输入CO浓度", trigger: "blur" }],
  spmValue: [{ required: true, message: "请输入PM2.5浓度", trigger: "blur" }],
};

const handleIconClick = () => {
  router.push("/feedbackList");
};

const gotoGuidance = () => {
  router.push("/guidance");
};

// 根据输入的数据判断IAQI(该污染物的空气质量分指数)
const getso2Level = (so2Value) => {
  if (so2Value <= 50) {
    formData.so2Level = 1;
  } else if (so2Value <= 150) {
    formData.so2Level = 2;
  } else if (so2Value <= 475) {
    formData.so2Level = 3;
  } else if (so2Value <= 800) {
    formData.so2Level = 4;
  } else if (so2Value <= 1600) {
    formData.so2Level = 5;
  } else {
    formData.so2Level = 6;
  }
};

const getcoLevel = (coValue) => {
  if (coValue <= 2) {
    formData.coLevel = 1;
  } else if (coValue <= 4) {
    formData.coLevel = 2;
  } else if (coValue <= 14) {
    formData.coLevel = 3;
  } else if (coValue <= 24) {
    formData.coLevel = 4;
  } else if (coValue <= 36) {
    formData.coLevel = 5;
  } else {
    formData.coLevel = 6;
  }
};

const getspmLevel = (spmValue) => {
  if (spmValue <= 35) {
    formData.spmLevel = 1;
  } else if (spmValue <= 75) {
    formData.spmLevel = 2;
  } else if (spmValue <= 115) {
    formData.spmLevel = 3;
  } else if (spmValue <= 150) {
    formData.spmLevel = 4;
  } else if (spmValue <= 250) {
    formData.spmLevel = 5;
  } else {
    formData.spmLevel = 6;
  }
};

const isFormComplete = computed(() => {
  return (
    formData.so2Value !== "" &&
    formData.coValue !== "" &&
    formData.spmValue !== ""
  );
});

// 根据所有IAQI返回AQI的level
const getAQILevel = () => {
  if (isFormComplete.value) {
    const aqiLevel = Math.max(
      formData.so2Level,
      formData.coLevel,
      formData.spmLevel
    );
    formData.aqiLevel = aqiLevel;
  }
};

watch(
  () => [formData.so2Level, formData.coLevel, formData.spmLevel],
  () => {
    getAQILevel();
  }
);

const getmeasuredGradeColor = (measuredGrade) => {
  // 根据 estimatedGrade 返回对应的背景色类名
  // 这里可以根据具体需求设定不同的逻辑
  if (measuredGrade == "1") {
    return "measuredGrade-green";
  } else if (measuredGrade == "2") {
    return "measuredGrade-yellow";
  } else if (measuredGrade == "3") {
    return "measuredGrade-orange";
  } else if (measuredGrade == "4") {
    return "measuredGrade-red";
  } else if (measuredGrade == "5") {
    return "measuredGrade-purple";
  } else if (measuredGrade == "6") {
    return "measuredGrade-maroon";
  }
};

function convertToChineseNumber(num) {
  const chineseNumbers = ["", "一", "二", "三", "四", "五", "六"];

  if (num >= 1 && num <= 6) {
    return chineseNumbers[num];
  } else {
    return num.toString();
  }
}

const getAQIGradeDescription = (aqiLevel) => {
  if (aqiLevel == "1") {
    return "优";
  } else if (aqiLevel == "2") {
    return "良";
  } else if (aqiLevel == "3") {
    return "轻度污染";
  } else if (aqiLevel == "4") {
    return "中度污染";
  } else if (aqiLevel == "5") {
    return "重度污染";
  } else if (aqiLevel == "6") {
    return "严重污染";
  }
};

let listPull = ref();

const submitForm = () => {
  if (isFormComplete.value) {
    // Form is valid, submit the data
    if (
      formData.so2Value != null &&
      formData.coValue != null &&
      formData.spmValue != null
    ) {
      // 提交表单
      if (listPull.value) {
        formData.gmId = listPull.value.gmId;
        formData.provinceId = listPull.value.provinceId;
        formData.cityId = listPull.value.cityId;
        formData.address = listPull.value.address;
        formData.fdId = listPull.value.telId;
        formData.information = listPull.value.information;
      }
      formData.confirmDate = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
      formData.confirmTime = new Date().toLocaleTimeString();
      getAQILevel();
      console.log(formData);
    }
  } else {
    ElMessage.error("请填写必填字段");
  }
};

const fetchData = async () => {
  try {
    const afId = aqiFeedbackStore.afId;
    const response = await aqiFeedback(afId);
    listPull.value = response.data.data;
    console.log(listPull.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.wrapper {
  background-color: white;
}

.app-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 8vh;
}

.icon-wrapper {
  cursor: pointer;
  margin-left: 50px;
}

.el-icon {
  font-size: 70px;
}

.show-data {
  display: block;
  width: 80vw;
  height: 35vh;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.part1 {
  display: flex;
  height: 25vh;
}

.left {
  width: 50vw;
  display: flex;
  flex-direction: column;
}

.estimatedGrade {
  height: 8vh;
  display: flex;
  align-items: center;
  font-size: 40px;
}

.address {
  font-size: 60px;
}

.grid {
  font-size: 40px;
}

.right {
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map {
  width: 300px;
  height: 300px;
  overflow: hidden;
}

.part2 {
  display: flex;
  height: 10vh;
}

.supervisor {
  width: 40vw;
  display: flex;
  font-size: 50px;
}

.information {
  width: 40vw;
  display: flex;
  font-size: 50px;
}

.measured-data {
  display: block;
  width: 80vw;
  height: 35vh;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.el-form-item {
  display: flex;
  --font-size: 35px;
  margin-top: 5%;
}

:deep(.el-form-item__error) {
  font-size: xx-large;
}

.el-input {
  box-sizing: border-box;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  flex-grow: 1;
  font-size: xx-large;
  height: var(--el-input-inner-height);
  line-height: var(--el-input-inner-height);
}

:deep(.el-form-item__content) {
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  font-size: var(--font-size);
  line-height: 32px;
  min-width: 0;
  position: relative;
}

.flex-row {
  display: flex;
  align-items: center;
  height: 5rem;
  width: 100%;
  --font-size: 35px;
}

.flex-row span,
.flex-row .el-input,
.flex-row .custom-cell {
  flex: 1;
}

.AQIlabel {
  width: 100%;
  height: 50px;
}

.el-button {
  height: 50px;
  font-size: xx-large;
}

.measuredGrade-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 15px;
  font-size: 40px;
  font-weight: bold;
  color: white;
}

.measuredGrade-green {
  background-color: rgb(0, 228, 0);
}

.measuredGrade-yellow {
  background-color: rgb(255, 255, 0);
}

.measuredGrade-orange {
  background-color: rgb(255, 126, 0);
}

.measuredGrade-red {
  background-color: rgb(255, 0, 0);
}

.measuredGrade-purple {
  background-color: rgb(153, 0, 76);
}

.measuredGrade-maroon {
  background-color: rgb(126, 0, 35);
}
</style>