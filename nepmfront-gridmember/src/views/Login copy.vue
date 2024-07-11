<template>
  <div class="wrapper">
    <!--Content before waves-->
    <div class="inner-header">
      <el-row>
        <el-col :span="24" style="text-align: center">
          <h1 class="title">东软环保公众监督平台</h1>
          <div class="subtitle">
            <span class="line"></span>
            <span class="little-text">网格员端</span>
            <span class="line"></span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="login-body">
      <el-form :model="loginForm" :rules="rules" ref="formData">
        <el-card class="box-card">
          <el-form-item prop="gmCode" class="input-div">
            <el-input class="input" v-model="loginForm.gmCode" placeholder="请输入登录编码" size="large"
              :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input" v-model="loginForm.password" placeholder="请输入密码" size="large" :prefix-icon="Lock"
              show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formData)" style="width: 100%;"> 登录 </el-button>
          </el-form-item>
        </el-card>
      </el-form>
    </div>
    <div class="waves-container">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import { login } from "@/api/login";
import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token";
import { useAqiFeedbackListStore } from "@/stores/aqiFeedbackList";
import router from "@/router";

const tokenStore = useTokenStore();
const aqiFeedbackListStore = useAqiFeedbackListStore();
const loginForm = reactive({
  gmCode: "",
  password: "", 
});

const rules = {
  gmCode: [{ required: true, message: "请输入登录编码", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const formData = ref(null);

const submitForm = () => {
  console.log(loginForm);
  formData.value.validate(async (valid) => {
    if (!valid) return;
    login(loginForm).then(response => {
      console.log("response:", response);
      const { data } = response;
      if (data.code === 200) {
        //登陆成功则记录token并跳转到主页
        tokenStore.setToken(data.message);
        aqiFeedbackListStore.setGmId(data.data);
        router.push('/feedbackList');
      } else {
        //登陆失败则提示错误信息
        ElMessage({ message: data.data, type: 'error', })
      }
    }).catch(error => {
      console.log(error);
    });
  });
};

</script>
<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%);
  color: white;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.inner-header {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: xx-large;
}

.title {
  color: #04e35a;
}

.subtitle {
  margin: 2vh 0;
}

.line {
  border: 1px solid #04a0e3;
  vertical-align: middle;
  display: inline-block;
  width: 70px;
}

.little-text {
  color: #04a0e3;
  margin: 0 1vw;
}

.el-form {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-card {
  display:block;
  width: 60vw;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
}

.el-input {
  height: 5vh;
  font-size: xx-large;
}

.el-button {
  height: 5vh;
  font-size: xx-large;
}

.waves-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25vh;
}

.waves {
  width: 300%; 
  height: 100%;
  bottom: 0;
  margin-bottom: -7px;
}

/* Animation */
.parallax>use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}
</style>