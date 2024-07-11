<template>
  <div class="wrapper">
    <t-navbar title="监督反馈" :fixed="false"></t-navbar>
    <t-table
      class="t-table-item"
      row-key="index"
      :data="aqiData"
      :max-height="600"
      :columns="columns"
      stripe= true
      :show-header="showHeader"
      cell-empty-content="-"
    ></t-table>

    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      reset-type="empty"
      show-error-message
      label-align="left"
      scroll-to-first-error="auto"
      @reset="onReset"
      @submit="onSubmit"
      class="t-form">
      <t-form-item labelWidth="0px" class="t-form-item">
        <t-cell class="table-item" title="省市" :note="note" arrow @click="showCascader" />
        <t-cascader
          class="table-item"
          :visible="visible"
          :value="address"
          title="选择地址"
          :options=provinceAndCityData
          @change="onChange"
          @close="visible = false"
          clearable
        />
      </t-form-item>
      <t-form-item labelWidth="0px" class="t-form-item">
        <t-input class="table-item" v-model="formData.address" label="具体地址" placeholder="具体地址" style="padding-right:2vw" align="right"></t-input>
      </t-form-item>
      <t-form-item labelWidth="0px" class="t-form-item">
        <div class="table-item rate-demo-cell rate-demo-cell--space">
          <div class="rate-demo-cell__label">预估AQI</div>
          <t-rate v-model="aqi" show-text :count="6" :icon="icon" :texts="texts" variant="filled" color="red" @change="changeRate" />
        </div>
      </t-form-item>
      <t-form-item labelWidth="0px" class="t-form-item">
        <t-textarea class="textarea table-item" v-model="formData.describtion" label="描述" placeholder="请输入文字" :maxlength="500" indicator />
      </t-form-item>
      <t-form-item labelWidth="0px" class="t-form-item">
        <div class="button-group">
          <t-button class="submitButton table-item" theme="primary" variant="light" type="submit" size="large">提交</t-button>
          <t-button class="submitButton table-item" theme="default" variant="base" type="reset" size="large">重置</t-button>
        </div>
      </t-form-item>

    </t-form>
    
    
    
    
   
    
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue';
  import router from '@/router';
  import { UncomfortableIcon, SmileIcon } from 'tdesign-icons-vue-next';
  import { provinceAndCityData } from 'element-china-area-data';
  import { saveAqiFeedback } from '@/api/aqi'
  import { ElMessage } from 'element-plus';
  const address = ref();
  const visible = ref(false);
  const describtion = ref('');
  const note = ref('请选择地址');
  const total = 6;
  const aqi = ref(0);
  const aqiData = [];
  const icon = ref([UncomfortableIcon, SmileIcon]);
  const texts = ref(['优', '良', '轻度污染','中度污染','重度污染','严重污染']);
  const form = ref(null)
  const formData = reactive({
    province: '',
    city: '',
    address: '',
    aqi: 0,
    describtion: '',
    afDate: '',
    afTime: ''
  });
  for (let i = 0; i < total; i++) {
    aqiData.push({
      index: i + 1,
      aqiGrade: ['一', '二', '三','四','五','六'][i % total],
      aqiValue: ['优', '良', '轻度污染','中度污染','重度污染','严重污染'][i % total],
      aqiDescribtion: ['空气质量令人满意，基本无空气污染',
       '空气质晕可接受，但某些污染物口能对极少数异常敏感人群健康有较弱影响',
       '易感人群症状有轻度加剧，健康人群出现刺激症状',
        '一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响',
        '心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状',
        '健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病'][i % total],
    });
  }
  const columns = [
    { colKey: 'aqiGrade', title: '级别', width: '15vw'},
    { colKey: 'aqiValue', title: 'AQI', width: '18vw' },
    { colKey: 'aqiDescribtion', title: '描述', width: '61vw' },
  ]
  const onChange = (value, options) => {
    console.log(value, options);
    note.value = options?.map((item) => item.label).join('/');
    formData.province = options[0]?.value;
    formData.city = options[1]?.value;
    visible.value = false;
  };
  const showCascader = () => {
    visible.value = true;
  };
  const changeRate = (value) => {
    if(value<3){
      icon.value = [SmileIcon, SmileIcon];
    }else{
      icon.value = [UncomfortableIcon, UncomfortableIcon];
    }
    formData.aqi = value;
  };
  const onSubmit = (e) => {
    formData.afDate = new Date().toLocaleDateString().replace(/\//g, '-');
    formData.afTime = new Date().toLocaleTimeString();
    console.log(formData)
    saveAqiFeedback(formData).then(response => {
      console.log("response:",response);
      const { data } = response;
      if(data.code === 200) {
          //保存成功则提示成功信息
          ElMessage({message: '反馈成功',type: 'success',})
          onReset();
      }else{
          //登陆失败则提示错误信息
          ElMessage({message: data.data,type: 'error',})
      }
      }).catch(error => {
        console.log(error);
      });
  };
  const onReset = () => {
    formData.province = '';
    formData.city = '';
    formData.aqi = '';
    formData.describtion = '';
    formData.address = '';
    address.value = '';
    aqi.value = 0;
    note.value = '请选择地址';
  }
</script>
<style scoped>
.wrapper {
  position: relative;
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.t-table-item {
  margin: 1vh 0;
}
.t-form-item {
  padding: 1vh 3vw;
}
:deep(.t-table th, .t-table td){
  text-align: center;
}
:deep(.t-table-item .t-table__content) {
  padding: 0px;
  width: 100%;
}
:deep(.t-table-item .t-table__body tr) {
  text-align: center;
  height: 60px; /* 调整这个值来设置单元格的高度 */
  white-space: normal; /* 允许内容换行 */
  word-wrap: break-word; /* 单词换行 */
}
:deep(.t-table-item .t-table__body tr td) {
  padding: 4px 8px;
  text-align: center;
}
.rate-demo-cell {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  background-color: #fff;
  margin:0%
}
.t-input--border::after{
  height: 0px;
}
.t-textarea t-textarea--layout-horizontal textarea table-item{
  width: 100%;
}
.textarea{
  height: 10vh;
}
/* .submitButton{
  width: 80vw;
  height: 4vh;
  margin-left: 10vw;
  margin-bottom: 0;
} */
.button-group {
  width: 100%;
  background-color: var(--bg-color-demo, #fff);
  gap: 2vw;
  box-sizing: border-box;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 0.5px solid #e7e7e7;
}
.button-group .t-button {
    height: 32px;
    flex: 1;
}
</style>