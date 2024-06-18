import { reactive, ref } from "vue"
import { login } from "@/api/login";
import router from "@/router";
import { ElMessage } from "element-plus";


export default {
    setup() {
        const loginForm = reactive({
            username: '',
            password: '',
            checkCode: '',
            checked: false
        });
        const formDataRef = ref(null);

        // const changeCheckCode = () => {
        //   checkCodeUrl.value = "checkCode?" + new Date().getTime()
        // }
        const submitForm = () => {
          console.log("loginForm:",loginForm);
          formDataRef.value.validate(async(valid) => {
            if(!valid) return;
            //验证通过则发送登录请求
            login(loginForm).then(response => {
              console.log("response:",response);
              const { data } = response;
              if(data.code === 200) {
                //登陆成功则记录token并跳转到主页
                localStorage.setItem('token',data.data);
                router.push('/admin');
              }else{
                //登陆失败则提示错误信息
                ElMessage({message: data.data,type: 'error',})
              }
            }).catch(error => {
              console.log(error);
            });
          });
        };

        const register = () => {
            router.push('/register');
        }

        const rules = {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          checkCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        };  
    
        return {
          // changeCheckCode,
          submitForm,
          rules,
          loginForm,
          register,
          formDataRef
        };
    },
}