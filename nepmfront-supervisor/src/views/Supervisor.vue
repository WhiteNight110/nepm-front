<template>
    <div class="wrapper">
      <div class="common-layout">
        <el-container class="el-container">
            <el-header class="header">
              <t-navbar :title='title' :fixed="false"/>
            </el-header>
            <el-main class="main">
              <router-view />
            </el-main>
            <el-footer class="footer">
              <t-tab-bar v-model="value" theme="tag" :split="false">
                <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
                  {{ item.label }}
                  <template #icon>
                    <t-icon :name="item.icon" />
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
    import { register } from '@/api/login';
    import { ElMessage } from 'element-plus';
    import { Icon as TIcon } from 'tdesign-icons-vue-next';
    import router from '@/router';

    const value = ref('Home');
    const titleList = reactive({
      Home: '首页',
      History: '历史反馈',
      Mine: '个人信息',
    });
    const title = ref('首页')
    const list = ref([
      { value: 'Home', label: '首页', icon: 'home', index: 'home' },
      { value: 'History', label: '历史', icon: 'history', index: 'history' },
      { value: 'Mine', label: '我的', icon: 'user', index: 'mine' },
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