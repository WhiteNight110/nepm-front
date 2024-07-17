<template>
  <t-navbar
    title="反馈任务列表"
    :fixed="false"
    left-arrow
    @left-click="handleClick"
  />
  <div class="list">
    <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
      <el-table
        :data="listPull"
        style="width: 100%"
        max-height="85vh"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="estimatedGrade" width="60px">
          <template v-slot:default="scope">
            <div
              class="estimatedGrade-block"
              :class="getestimatedGradeColor(scope.row.estimatedGrade)"
            >
              {{ convertToChineseNumber(scope.row.estimatedGrade) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="200px">
          <template v-slot:default="scope">
            <div>
              {{ codeToText[scope.row.provinceId] }}
              {{ codeToText[scope.row.cityId] }} {{ scope.row.afDate }}
            </div>
            <div>{{ scope.row.address }}</div>
          </template>
        </el-table-column>
        <el-table-column width="150px">
          <template #default="scope">
            <el-button type="primary" :icon="Pointer" @click="gotoTest(listPull[scope.$index])">
              去检测
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </t-pull-down-refresh>
  </div>
</template>

<script setup>
import { guardReactiveProps, ref, onMounted } from "vue";
import { Pointer } from "@element-plus/icons-vue";
import { aqiFeedbackList } from "@/api/aqiFeedbackList";
import { useAqiFeedbackListStore } from "@/stores/aqiFeedbackList";
import { useAqiFeedbackStore } from "@/stores/aqiFeedback";
import { codeToText } from "element-china-area-data";
import router from "@/router";

const MAX_DATA_LEN = 60;
const aqiFeedbackListStore = useAqiFeedbackListStore();
const aqiFeedbackStore = useAqiFeedbackStore();

const handleClick = (value) => {
  router.push("/login");
};

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
  onLoadPull(true);
});
</script>

<style scoped>
.estimatedGrade-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
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