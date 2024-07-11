<template>
  <div class="wrapper">
    <div class="title">
      <div>欢迎使用，</div>
      <div class="date">{{ currentDate }}</div>
    </div>
    <div class="task-count" v-if="listPull.length > 0">
      任务数：{{ listPull.length }}
    </div>
    <div class="list">
      <el-carousel height="45vh" arrow="always" :autoplay="false">
        <el-carousel-item v-for="(item, index) in listPull" :key="index">
          <div class="img">
            <!-- Insert your image here -->
            <img src="../assets/9383a9868aee1538eac9381f0fa08844.jpg" />
          </div>
          <div class="content">
            <el-row>
              <el-col>
                <div class="address">
                  {{ item.address }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="grid">
                  <el-icon><Location /></el-icon>
                  {{ codeToText[item.provinceId] }}
                  {{ codeToText[item.cityId] }}
                </div>
              </el-col>
              <el-col :span="8" :offset="6">
                <div class="estimatedGrade">
                  <span>预估等级：</span>
                  <div
                    class="estimatedGrade-block"
                    :class="getestimatedGradeColor(item.estimatedGrade)"
                  >
                    {{ convertToChineseNumber(item.estimatedGrade) }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="date">
                  {{ item.afDate }}
                </div>
              </el-col>
              <el-col :span="8" :offset="6">
                <el-button
                  type="primary"
                  :icon="Pointer"
                  @click="gotoTest(item)"
                >
                  去检测
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { guardReactiveProps, ref, onMounted } from "vue";
import { Location, Pointer } from "@element-plus/icons-vue";
import { aqiFeedbackList } from "@/api/aqiFeedbackList";
import { useAqiFeedbackListStore } from "@/stores/aqiFeedbackList";
import { useAqiFeedbackStore } from "@/stores/aqiFeedback";
// 联表后可删除
import { codeToText } from "element-china-area-data";
import router from "@/router";

const MAX_DATA_LEN = 60;
const aqiFeedbackListStore = useAqiFeedbackListStore();
const aqiFeedbackStore = useAqiFeedbackStore();

const currentDate = new Date().toLocaleDateString();

const gotoTest = (row) => {
  console.log(row);
  aqiFeedbackStore.setAfId(row.afId);
  router.push("/feedbackInfo");
};

const getestimatedGradeColor = (estimatedGrade) => {
  // 根据 estimatedGrade 返回对应的背景色类名
  // 这里可以根据具体需求设定不同的逻辑
  if (estimatedGrade == "1") {
    return "estimatedGrade-green";
  } else if (estimatedGrade == "2") {
    return "estimatedGrade-yellow";
  } else if (estimatedGrade == "3") {
    return "estimatedGrade-orange";
  } else if (estimatedGrade == "4") {
    return "estimatedGrade-red";
  } else if (estimatedGrade == "5") {
    return "estimatedGrade-purple";
  } else if (estimatedGrade == "6") {
    return "estimatedGrade-maroon";
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

const fetchData = async (data, isRefresh) => {
  const ONCE_LOAD_NUM = 20; // 每次加载的数据量
  try {
    const gmId = aqiFeedbackListStore.gmId;
    const response = await aqiFeedbackList(gmId);
    console.log(response);
    const fetchedData = response.data.data;
    console.log(fetchedData);
    if (isRefresh) {
      data.value = fetchedData; // 刷新时替换数据
    } else {
      data.value.push(...fetchedData); // 否则追加数据
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const listPull = ref([]); // 列表数据
const loading = ref(""); // 加载状态
const refreshing = ref(false); // 刷新状态
// 加载数据函数
const onLoadPull = (isRefresh = false) => {
  if ((listPull.value.length >= MAX_DATA_LEN && !isRefresh) || loading.value) {
    return; // 达到最大数据长度或正在加载时不执行
  }
  loading.value = "loading";
  fetchData(listPull, isRefresh).then(() => {
    loading.value = "";
    refreshing.value = false;
  });
};

// 刷新事件处理函数
const onRefresh = () => {
  refreshing.value = true;
  onLoadPull(true);
};

onMounted(() => {
  onLoadPull();
});
</script>

<style>
.wrapper {
  position: fixed;
  background-image: url("/src/assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.title {
  display: flex;
  flex-direction: column;
  font-size: 5rem;
  color: white;
  margin-top: 10%;
  margin-left: 10%;
}

.task-count {
  display: flex;
  font-size: 5rem;
  color: white;
  margin-top: 25%;
  margin-left: 10%;
}

.el-carousel {
  width: 90vw;
  border-radius: 25px;
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-carousel__item {
  border-radius: 50px;
  background-color: #bbbbbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.img {
  width: 800px;
  height: 400px;
  margin-top: 50px;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
}

.content {
  width: 800px;
}

.el-row {
  display: flex;
  align-items: center;
  margin: 30px;
}

.address {
  font-size: 60px;
}

.grid {
  display: flex;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
}

.date {
  font-size: 30px;
  color: #ffffff;
}

.estimatedGrade {
  display: flex;
  align-items: center;
  font-size: 30px;
}

.el-button {
  height: 75px;
  font-size: xx-large;
}

.estimatedGrade-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  font-weight: bold;
  color: white;
}

.estimatedGrade-green {
  background-color: rgb(0, 228, 0);
}

.estimatedGrade-yellow {
  background-color: rgb(255, 255, 0);
}

.estimatedGrade-orange {
  background-color: rgb(255, 126, 0);
}

.estimatedGrade-red {
  background-color: rgb(255, 0, 0);
}

.estimatedGrade-purple {
  background-color: rgb(153, 0, 76);
}

.estimatedGrade-maroon {
  background-color: rgb(126, 0, 35);
}
</style>