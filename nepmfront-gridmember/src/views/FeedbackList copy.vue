<template>
  <div class="wrapper">
    <div class="title">
      <div>欢迎使用，</div>
      <!-- 该处考虑添加用户名 -->
    </div>
    <div class="list">
      <el-card>
        <el-table
          row-key="afDate"
          :data="listPull"
          style="width: 100%; font-size: x-large"
          max-height="100vh"
        >
          <el-table-column
            prop="estimatedGrade"
            label="预估等级"
            width="120"
            :filters="[
              { text: '一', value: '1' },
              { text: '二', value: '2' },
              { text: '三', value: '3' },
              { text: '四', value: '4' },
              { text: '五', value: '5' },
              { text: '六', value: '6' },
            ]"
            :filter-method="filterGradeHandler"
          >
            <template v-slot:default="scope">
              <div class="custom-cell">
                <div
                  :class="[
                    'estimatedGrade-block',
                    getestimatedGradeColor(scope.row.estimatedGrade),
                  ]"
                >
                  {{ convertToChineseNumber(scope.row.estimatedGrade) }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址">
            <template v-slot:default="scope">
              <span
                >{{ codeToText[scope.row.provinceId] }}
                {{ codeToText[scope.row.cityId] }} {{ scope.row.address }}</span
              >
            </template>
          </el-table-column>
          <!-- 按日期排序出现问题，排序会添加记录，有空再修改 -->
          <el-table-column prop="afDate" label="反馈日期" />
          <el-table-column>
            <template #default="scope">
              <el-button
                type="primary"
                :icon="Pointer"
                @click="gotoTest(listPull[scope.$index])"
              >
                去检测
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { User } from "@element-plus/icons-vue";
import { guardReactiveProps, ref, onMounted } from "vue";
import { Pointer } from "@element-plus/icons-vue";
import { aqiFeedbackList } from "@/api/aqiFeedbackList";
import { useAqiFeedbackListStore } from "@/stores/aqiFeedbackList";
import { useAqiFeedbackStore } from "@/stores/aqiFeedback";
// 联表后可删除
import { codeToText } from "element-china-area-data";
import router from "@/router";

const MAX_DATA_LEN = 60;
const aqiFeedbackListStore = useAqiFeedbackListStore();
const aqiFeedbackStore = useAqiFeedbackStore();

const gotoTest = (row) => {
  console.log(row);
  aqiFeedbackStore.setAfId(row.afId);
  router.push("/feedbackInfo");
};

const filterGradeHandler = (value, row) => {
  return row.estimatedGrade === parseInt(value);
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
  font-size: 5rem;
  color: white;
  /* justify-content: space-between; */
  align-items: center;
  margin-top: 10%;
  margin-left: 10%;
}

.el-card {
  display: block;
  width: 90vw;
  background-color: rgba(255, 255, 255);
  border-radius: 25px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: calc(100vh - 50%);
  max-height: calc(100vh - 50%);
  overflow-y: auto;
}

.el-button{
  font-size: x-large;
}

.custom-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 35px;
  font-weight: bold;
  color: white;
}

.estimatedGrade-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
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