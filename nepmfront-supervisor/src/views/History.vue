<template>
    <div class="wrapper">
      <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
        <t-navbar title="历史反馈" :fixed="false"></t-navbar>
        <el-table
          :data="listPull"
          style="width: 100%; font-size: large;"
          max-height="85vh"
          :row-class-name="tableRowClassName"
          @row-click="handleRowClick"
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
      <t-dialog
        v-model:visible="isShowDialog"
        :close-on-overlay-click="false"
        confirm-btn="确定"
        @confirm="onDialogConfirm"
      >
        <t-result :theme="dialogTheme" :title="dialogTitle" :description="dialogDescription" class="dialog-result" />
      
      </t-dialog>
    </div>
  </template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { aqiFeedbackList } from '@/api/aqi';
  import { useGlobalStore } from '@/stores/globalStore';
  import { codeToText } from 'element-china-area-data';

  const MAX_DATA_LEN = 60;
  const globalStore = useGlobalStore();
  const listPull = ref([]);// 列表数据
  const loading = ref('');// 加载状态
  const refreshing = ref(false);// 刷新状态
  const isShowDialog = ref(false);
  const dialogTheme = ref('');
  const dialogTitle = ref('');
  const dialogDescription = ref('');
  const resultList = [
    {description: '该反馈尚未被指派', theme: 'error'},
    {description: '该反馈正在核验中', theme: 'default'},
    {description: '该反馈已被检测', theme: 'success'},
  ];
  const texts = ref(['优', '良', '轻度污染','中度污染','重度污染','严重污染']);
  const getGradeColor = (grade) => {
    // 根据 estimatedGrade 返回对应的背景色类名
    // 这里可以根据具体需求设定不同的逻辑
    if (grade == '0') {
      return 'grade-green';
    } else if (grade == '1') {
      return 'grade-blue';
    } else if (grade == '2') {
      return 'grade-orange';
    } else if (grade == '3') {
      return 'grade-brown';
    } else if (grade == '4') {
      return 'grade-red';
    } else if (grade == '5') {
      return 'grade-purple';
    } else {
      return 'grade-black';
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

  const handleRowClick = (row) => {
    console.log('row:', row);
    isShowDialog.value = true;
    if(row.state==0){
      dialogTheme.value = resultList[0].theme;
      dialogTitle.value = resultList[0].description;
    }else if(row.state==1){
      dialogTheme.value = resultList[1].theme;
      dialogTitle.value = resultList[1].description;
    }else{
      dialogTheme.value = resultList[2].theme;
      dialogTitle.value = resultList[2].description;
      dialogDescription.value = '检测结果：'+ texts.value[row.estimatedGrade];
    }
  };
  const onDialogConfirm = () => {
    dialogDescription.value = '';
    isShowDialog.value = false;
  };
  
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

.grade-brown {
  background-color: brown;
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

.grade-black {
  background-color: black;
}
</style>