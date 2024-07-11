<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="title">东软环保公众监督平台</h1>
      <div class="subtitle">网格员端</div>
    </div>
    <div class="login-body">
      <el-form :model="loginForm" :rules="rules" ref="formData">
        <el-card class="box-card">
          <el-form-item prop="gmCode" class="input-div">
            <el-input
              v-model="loginForm.gmCode"
              placeholder="请输入登录编码"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
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
        </el-card>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
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
    login(loginForm)
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
  height: 100vh;
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
  width: 50vw;
  height: 23vh;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.el-card .el-form-item:not(:last-child) {
  margin-bottom: 40px; /* 增加元素之间的间距 */
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
</style>