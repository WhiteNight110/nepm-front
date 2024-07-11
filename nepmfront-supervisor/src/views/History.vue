<template>
    <div class="wrapper">
      <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
        <t-navbar title="历史反馈" :fixed="false"></t-navbar>
        <el-table
          :data="listPull"
          style="width: 100%; font-size: large;"
          max-height="85vh"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="estimatedGrade" width="40px" style="font-size: 20px;">
            <template v-slot:default="scope">
              <div :class="['grade-block', getGradeColor(scope.row.estimatedGrade)]">{{ scope.row.estimatedGrade }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="afDate" width="120px" />
          <el-table-column prop="afTime" width="70px" >
            <template v-slot:default="scope">
              <span>{{ scope.row.afTime.substr(0,5) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="provinceId">
            <template v-slot:default="scope">
              <span>{{ codeToText[scope.row.provinceId] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cityId">
            <template v-slot:default="scope">
              <span>{{ codeToText[scope.row.cityId] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </t-pull-down-refresh>
      
    </div>
  </template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { aqiFeedbackList } from '@/api/aqi';
  import { useGlobalStore } from '@/stores/globalStore';
  import { codeToText } from 'element-china-area-data';

  const MAX_DATA_LEN = 60;
  const globalStore = useGlobalStore();
  const getGradeColor = (grade) => {
    // 根据 estimatedGrade 返回对应的背景色类名
    // 这里可以根据具体需求设定不同的逻辑
    if (grade == '1') {
      return 'grade-green';
    } else if (grade == '2') {
      return 'grade-blue';
    } else if (grade == '3') {
      return 'grade-yellow';
    } else if (grade == '4') {
      return 'grade-orange';
    } else if (grade == '5') {
      return 'grade-red';
    } else {
      return 'grade-purple';
    }
  };
  const fetchData = async (data, isRefresh) => {
    const ONCE_LOAD_NUM = 20; // 每次加载的数据量
    try {
      const telId = globalStore.telId;
      const response = await aqiFeedbackList(telId);
      console.log(response);
      const fetchedData = response.data.data; 

      if (isRefresh) {
        data.value = fetchedData; // 刷新时替换数据
      } else {
        data.value.push(...fetchedData); // 否则追加数据
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const listPull = ref([]);// 列表数据
  const loading = ref('');// 加载状态
  const refreshing = ref(false);// 刷新状态
  // 加载数据函数
  const onLoadPull = (isRefresh = false) => {
    if ((listPull.value.length >= MAX_DATA_LEN && !isRefresh) || loading.value) {
      return;// 达到最大数据长度或正在加载时不执行
    }
    loading.value = 'loading';
    fetchData(listPull, isRefresh).then(() => {
      loading.value = '';
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
<style scoped>
.wrapper {
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  display: relative;
  overflow-y: auto;
}
:deep(.el-table__row) {
  height: 6vh;
}
:deep(.cell){
  padding: 1vh;

}
.grade-block {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 2px;
  color: white; /* 字体颜色设为白色 */
}

.grade-green {
  background-color: lightgreen;
}

.grade-blue {
  background-color: lightblue;
}

.grade-yellow {
  background-color: lightyellow;
}

.grade-orange {
  background-color: orange;
}

.grade-red {
  background-color: red;
}

.grade-purple {
  background-color: purple;
}
</style>