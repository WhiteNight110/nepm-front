<template>
  <div class="wrapper">
    <!-- 手机端登录界面 -->
    <el-col :span="24" style="text-align: center">
      <img src="../assets/bg.png" alt="bg" class="img-bg" />
    </el-col>
    <img src="../assets/logo.png" class="img-logo" />
    <div>
      <el-row>
        <el-col :span="24" style="text-align: center; margin-top: 10vh;" >
          <h1 class="title">东软环保公众监督平台</h1>
          <div class="subtitle">
            <span class="line"></span>
            <span class="little-text">公众监督员端</span>
            <span class="line"></span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="login-body">
      <el-tabs :stretch="true" class="custom-tabs">
          <el-tab-pane label="账号密码登录" class="login-panel">
            <!-- 账号密码登录表单 -->
            <el-form
              :model="loginForm"
              :rules="rules"
              ref="formData"
            >
              <el-form-item prop="telId" class="input-div">
                <el-input
                  v-model="loginForm.telId"
                  placeholder="请输入手机号"
                  size="large"
                  :prefix-icon="User"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" class="input-div">
                <el-input
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  size="large"
                  :prefix-icon="Lock"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm(formData)"
                  style="width: 100%"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短信验证登录" class="login-panel">
            <!-- 手机验证登录表单 -->
            <el-form
              ref="phoneformData"
              :model="phoneLoginForm"
              :rules="phoneRules"
            >
              <el-form-item prop="phone" class="input-div">
                <el-input
                  placeholder="请输入手机号"
                  size="large"
                  :prefix-icon="Iphone"
                  v-model="phoneLoginForm.phone"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="phoneCode">
                <el-input
                  placeholder="请输入验证码"
                  size="large"
                  :prefix-icon="Key"
                  v-model="phoneLoginForm.phoneCode"
                >
                  <template #append>
                    <div v-if="phoneMessageCodeVis" class="second-text">
                      {{ phoneCountdown }}秒后重新获取
                    </div>
                    <el-button v-else type="primary" link @click="sendPhoneCode"
                      >获取验证码</el-button
                    >
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="phoneCodeLogin(phoneformData)"
                  style="width: 100%"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div  class="input-div">
          <el-button type="primary" @click="register" style="width: 90vw;margin-left:5vw;" > 注册 </el-button>
        </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { User, Lock, Key, Iphone }  from '@element-plus/icons-vue'
import { login,phoneLogin,sendPhoneFormCode } from "@/api/login";
import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token";
import { useGlobalStore } from "@/stores/globalStore";
import router from "@/router";
const tokenStore = useTokenStore();
const globalStore = useGlobalStore();
const loginForm = reactive({
  telId: "",
  password: "",
});
const phoneLoginForm = reactive({
  phone: "",
  phoneCode: "",
});

const rules = {
  telId: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const phoneRules = {
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  phoneCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const formData = ref(null);
const phoneformData = ref(null);

const submitForm = () => {
  console.log(loginForm);
  formData.value.validate(async(valid) => {
      if(!valid) return;
      login(loginForm).then(response => {
      console.log("response:",response);
      const { data } = response;
      if(data.code === 200) {
          //登陆成功则记录token并跳转到主页
          tokenStore.setToken(data.data);
          globalStore.setTelId(loginForm.telId);
          router.push('/supervisor');
      }else{
          //登陆失败则提示错误信息
          ElMessage({message: data.data,type: 'error',})
      }
      }).catch(error => {
      console.log(error);
      });
  });
};
//手机验证码登录
const phoneCodeLogin = () => {
  console.log('手机验证码登录',phoneLoginForm);
  phoneformData.value.validate(async(valid) => {
      if(!valid) return;
      phoneLogin(phoneLoginForm).then(response => {
      console.log("response:",response);
      const { data } = response;
      if(data.code === 200) {
          //登陆成功则记录token并跳转到主页
          tokenStore.setToken(data.data);
          globalStore.setTelId(phoneLoginForm.phone);
          router.push('/supervisor');
      }else{
          //登陆失败则提示错误信息
          ElMessage({message: data.data,type: 'error',})
      }
      }).catch(error => {
      console.log(error);
      });
  });
};

// 验证码实现+倒计时
const phoneMessageCodeVis = ref(false);
const phoneCountdown = ref(0);

const sendPhoneCode = async () => {
  try {
    phoneCountdown.value = 60;
    phoneMessageCodeVis.value = true;
    startPhoneCountdown();
    console.log(phoneLoginForm.phone);
    // 这里需要实现发送验证码的逻辑,可以调用后端接口发送验证码
    await sendPhoneFormCode(phoneLoginForm.phone);
  } catch (error) {
    console.error("检查手机号错误:", error);
    ElMessage.error("检查手机号时出错,请稍后重试");
  }
};

// 倒计时函数
const startPhoneCountdown = () => {
  const intervalId = setInterval(() => {
    if (phoneCountdown.value > 0) {
      phoneCountdown.value--;
    } else {
      clearInterval(intervalId);
      phoneMessageCodeVis.value = false;
    }
  }, 1000);
};

const register = () => {
  router.push('/register');
};
</script>
<style scoped>
.wrapper {
  background-color: #c5e9ea;
  width: 100%;
  height: 100%;
  display: relative;
}
.img-bg{
  width: 100vw;
  border-radius: 0 0 50% 50% / 0 0 20% 20%;;
}
.img-logo{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 33vh;
  width:20vw;
}
.login-body {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 55vh;
}
.login-panel{
  
  width:90vw;
  margin: 0 auto;
}


.input{
  height: 5vh;
}
.title{
  color: #04e35a;

}
.subtitle{
  margin: 2vh 0;
}
.line{
    border:1px solid #04a0e3;
    vertical-align: middle;
    display:inline-block;
    width:70px;
}
.little-text{
  font-size: 18px;
  color: #04a0e3;
  margin:0 1vw;
}
</style>