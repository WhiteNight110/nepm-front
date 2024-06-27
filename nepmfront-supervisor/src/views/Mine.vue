<template>
  <div class="wrapper">
    mine
    
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue';
  import { register } from '@/api/login';
  import { ElMessage } from 'element-plus';
  import { Icon as TIcon } from 'tdesign-icons-vue-next';
  import router from '@/router';

  
</script>
<style scoped>
.wrapper {
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  display: relative;
}
</style>