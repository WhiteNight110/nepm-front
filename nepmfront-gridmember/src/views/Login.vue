<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="title">东软环保公众监督平台</h1>
      <div class="subtitle">网格员端</div>
    </div>
    <div class="login-body">
      <el-card class="box-card">
        <el-tabs :stretch="true" class="custom-tabs">
          <el-tab-pane label="账号密码登录">
            <!-- 账号密码登录表单 -->
            <el-form
              :model="passwordLoginForm"
              :rules="passwordLoginFormrules"
              ref="passwordLoginFormRef"
            >
              <el-form-item prop="gmCode" class="input-div">
                <el-input
                  v-model="passwordLoginForm.gmCode"
                  placeholder="请输入登录编码"
                  :prefix-icon="User"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="passwordLoginForm.password"
                  placeholder="请输入密码"
                  :prefix-icon="Lock"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="passwordLogin(passwordLoginFormRef)"
                  style="width: 100%"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短信验证登录">
            <!-- 手机验证登录表单 -->
            <el-form
              ref="phoneLoginFormRef"
              :model="phoneLoginForm"
              :rules="phoneLoginFormRules"
            >
              <el-form-item prop="phone">
                <el-input
                  placeholder="请输入手机号"
                  prefix-icon="Iphone"
                  v-model="phoneLoginForm.phone"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="phoneCode">
                <el-input
                  placeholder="请输入验证码"
                  prefix-icon="Key"
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
                  @click="phoneLogin(phoneLoginFormRef)"
                  style="width: 100%"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { User, Lock, Message, Iphone, Key } from "@element-plus/icons-vue";
import {
  passwordFormlogin,
  phoneFormlogin,
  sendPhoneFormCode,
} from "@/api/login";
import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token";
import { useAqiFeedbackListStore } from "@/stores/aqiFeedbackList";
import router from "@/router";

const tokenStore = useTokenStore();
const aqiFeedbackListStore = useAqiFeedbackListStore();

const passwordLoginForm = reactive({
  gmCode: "",
  password: "",
});
const phoneLoginForm = reactive({
  phone: "",
  phoneCode: "",
});

const passwordLoginFormrules = {
  gmCode: [{ required: true, message: "请输入登录编码", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const phoneLoginFormRules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入有效的手机号",
      trigger: "blur",
    },
  ],
  phoneCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const passwordLoginFormRef = ref(null);
const phoneLoginFormRef = ref(null);

// 验证码实现+倒计时
const phoneMessageCodeVis = ref(false);
let phoneCountdown = ref(0);

const sendPhoneCode = async () => {
  const reg = /^1[3456789]\d{9}$/;
  if (!reg.test(phoneLoginForm.phone)) {
    ElMessage.error("请输入有效的手机号");
    return;
  }
  if (!phoneLoginForm.phone) {
    ElMessage.error("请输入手机号");
    return;
  }
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

const passwordLogin = () => {
  passwordLoginFormRef.value.validate(async (valid) => {
    if (!valid) return;
    passwordFormlogin(passwordLoginForm)
      .then((response) => {
        console.log("response:", response);
        const { data } = response;
        if (data.code === 200) {
          //登陆成功则记录token并跳转到主页
          tokenStore.setToken(data.message);
          aqiFeedbackListStore.setGmId(data.data);
          router.push("/feedbackList");
        } else {
          //登陆失败则提示错误信息
          ElMessage({ message: data.data, type: "error" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
const phoneLogin = () => {
  console.log(phoneLoginForm);
  phoneLoginFormRef.value.validate(async (valid) => {
    if (!valid) return;
    phoneFormlogin(phoneLoginForm)
      .then((response) => {
        console.log("response:", response);
        const { data } = response;
        if (data.code === 200) {
          //登陆成功则记录token并跳转到主页
          tokenStore.setToken(data.message);
          aqiFeedbackListStore.setGmId(data.data);
          console.log(data)
          router.push("/feedbackList");
        } else {
          //登陆失败则提示错误信息
          ElMessage({ message: data.data, type: "error" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  background-image: url("/src/assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-size: 1rem;
  height: 100vh;
}

.login-body {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 80%;
  top: 75%;
  left: 50%;
}
</style>