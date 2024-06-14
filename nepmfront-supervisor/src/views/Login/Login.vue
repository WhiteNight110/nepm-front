<template>
  <div class="login-container">
    <div class="login-header">
      <img src="../../assets/bg.png" alt="logo" sizes="auto"/>
    </div>
    <div class="login-content">
      <div class="login-title">
        <h3>欢迎使用</h3>
      </div>
      <div class="login-form">
        <div class="login-form-item">
          <!-- <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="4" width="26" height="40" rx="3" fill="none" stroke="#333" stroke-width="4" />
            <path d="M22 10L26 10" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20 38H28" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg> -->
          <input v-model="form.username" type="text" name="phone" autocomplete="off" placeholder="请输入手机号" />
        </div>
        <div class="login-form-item">
          <!-- <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
            <rect x="6" y="22" width="36" height="22" rx="2" fill="none" stroke="#333" stroke-width="4"
              stroke-linejoin="round" />
            <path d="M14 22V14C14 8.47715 18.4772 4 24 4C29.5228 4 34 8.47715 34 14V22" stroke="#333" stroke-width="4"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 30V36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg> -->
          <input v-model="form.password" type="password" name="password" autocomplete="off" placeholder="请输入密码" />
        </div>
      </div>
      <div class="login-forget">
        <span>忘记密码？</span>
      </div>
      <Button block type="primary" @click="onLogin">登录</Button>
      <div class="login-other">
        <Divider>其他登陆方式</Divider>
        <ul>
          <li>
            <Button size="small" @click="Dialog({ message: '点击微信' })">微信</Button>
          </li>
          <li>
            <Button size="small" @click="Dialog({ message: '点击淘宝' })">淘宝</Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup name="Login">
  import { ref } from 'vue'
  const form = ref({
    username: '',
    password: ''
  })
</script>

<style>
.login-header img {
  width: 75%; /* 设置图片宽度 */
  height: auto; /* 设置图片高度，保持宽高比 */
}
</style>