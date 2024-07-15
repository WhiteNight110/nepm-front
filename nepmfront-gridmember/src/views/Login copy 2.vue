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
              <el-form-item prop="gmCode">
                <el-input
                  placeholder="请输入手机号"
                  prefix-icon="Iphone"
                  v-model="phoneLoginForm.gmCode"
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
          <el-tab-pane label="邮箱验证登录">
            <!-- 邮箱验证登录表单 -->
            <el-form
              ref="emailLoginFormRef"
              :model="emailLoginForm"
              :rules="emailLoginFormRules"
            >
              <el-form-item prop="email">
                <el-input
                  placeholder="请输入邮箱"
                  prefix-icon="Message"
                  v-model="emailLoginForm.email"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="emailCode">
                <el-input
                  placeholder="请输入验证码"
                  prefix-icon="Key"
                  v-model="emailLoginForm.emailCode"
                >
                  <template #append>
                    <div v-if="emailMessageCodeVis" class="second-text">
                      {{ emailCountdown }}秒后重新获取
                    </div>
                    <el-button v-else type="primary" link @click="sendEmailCode"
                      >获取验证码</el-button
                    >
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="emailLogin(emailLoginFormRef)"
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
  emailFormlogin,
  sendPhoneFormCode,
  sendEmailFormCode,
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
  gmCode: "",
  phoneCode: "",
});

const emailLoginForm = reactive({
  email: "",
  emailCode: "",
});

const passwordLoginFormrules = {
  gmCode: [{ required: true, message: "请输入登录编码", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const phoneLoginFormRules = {
  gmCode: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入有效的手机号",
      trigger: "blur",
    },
  ],
  phoneCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const emailLoginFormRules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入有效的邮箱地址",
      trigger: "blur",
    },
  ],
  emailCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const passwordLoginFormRef = ref(null);
const phoneLoginFormRef = ref(null);
const emailLoginFormRef = ref(null);

// 验证码实现+倒计时
const phoneMessageCodeVis = ref(false);
let phoneCountdown = ref(0);
const emailMessageCodeVis = ref(false);
let emailCountdown = ref(0);

const sendPhoneCode = async () => {
  const reg = /^1[3456789]\d{9}$/;
  if (!reg.test(phoneLoginForm.gmCode)) {
    ElMessage.error("请输入有效的手机号");
    return;
  }
  if (!phoneLoginForm.gmCode) {
    ElMessage.error("请输入手机号");
    return;
  }
  try {
    // 这里需要实现发送验证码的逻辑,可以调用后端接口发送验证码
    await sendPhoneFormCode(phoneLoginForm.gmCode);

    phoneCountdown.value = 60;
    phoneMessageCodeVis.value = true;
    startPhoneCountdown();
  } catch (error) {
    console.error("检查手机号错误:", error);
    ElMessage.error("检查手机号时出错,请稍后重试");
  }
};

const sendEmailCode = async () => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!reg.test(emailLoginForm.email)) {
    ElMessage.error("请输入有效的邮箱地址");
    return;
  }
  if (!emailLoginForm.email) {
    ElMessage.error("请输入邮箱");
    return;
  }
  try {
    // 这里需要实现发送验证码的逻辑,可以调用后端接口发送验证码
    await sendEmailFormCode(phoneLoginForm.email);

    emailCountdown.value = 60;
    emailMessageCodeVis.value = true;
    startEmailCountdown();
  } catch (error) {
    console.error("检查邮箱错误:", error);
    ElMessage.error("检查邮箱时出错,请稍后重试");
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

const startEmailCountdown = () => {
  const intervalId = setInterval(() => {
    if (emailCountdown.value > 0) {
      emailCountdown.value--;
    } else {
      clearInterval(intervalId);
      emailMessageCodeVis.value = false;
    }
  }, 1000);
};

const passwordLogin = () => {
  console.log(passwordLoginForm);
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

const emailLogin = () => {
  console.log(emailLoginForm);
  emailLoginFormRef.value.validate(async (valid) => {
    if (!valid) return;
    emailFormlogin(emailLoginForm)
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
</script>
<style scoped>
.wrapper {
  position: fixed;
  background-image: url("/src/assets/background4.png");
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
  font-size: 2.5rem;
  height: 100vh;
}

.login-body {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 25vh;
}

.el-card {
  display: block;
  width: 80vw;
  height: 30vh;
  background-color: rgba(255, 255, 255);
  border-radius: 25px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.el-card .el-form-item:not(:last-child) {
  margin-top: 40px;
  margin-bottom: 40px;
}

.el-input {
  height: 5vh;
  font-size: xx-large;
}

.el-button {
  height: 5vh;
  font-size: xx-large;
}

:deep(.el-form-item__error) {
  font-size: xx-large;
}

:deep(.custom-tabs .el-tabs__header) {
  font-size: 24px;
}

:deep(.el-tabs__item.is-top) {
  font-size: xx-large;
  margin-top: 40px;
}
</style>