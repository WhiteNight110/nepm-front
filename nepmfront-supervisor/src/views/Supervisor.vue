<template>
    <div class="wrapper">
      <div class="common-layout">
        <el-container class="el-container">
            <el-main class="main">
              <router-view />
            </el-main>
            <el-footer class="footer">
              <t-tab-bar v-model="value" theme="tag" :split="false">
                <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
                  {{ item.label }}
                  <template #icon>
                     <span :class="item.icon"></span>
                  </template>
                </t-tab-bar-item>
              </t-tab-bar>
            </el-footer>
        </el-container>
      </div>
      
    </div>
  </template>
  <script setup>
    import { reactive, ref, watch } from 'vue';
    import router from '@/router';

    const value = ref('Feedback');
    const titleList = reactive({
      Feedback: '反馈',
      History: '历史反馈',
      Mine: '个人信息',
    });
    const title = ref('反馈')
    const list = ref([
      { value: 'Feedback', label: '反馈', icon: 'iconfont icon-zhihangfankui', index: 'Feedback' },
      { value: 'History', label: '历史', icon: 'iconfont icon-lishi', index: 'history' },
      { value: 'Mine', label: '我的', icon: 'iconfont icon-geren', index: 'mine' },
    ]);
    watch(() => value.value, (val) => {
      title.value = titleList[val];
      router.push({ name: val });
    });
  </script>
  <style scoped>
  .wrapper {
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    display: relative;
  }
  .header{
    padding: 0px;
  }
  .main{
    padding: 0px;
  }
  .common-layout{
    width: 100%;
    height: 100%;
  }
  .el-container{
    width: 100%;
    height: 100%;
  }
  </style>