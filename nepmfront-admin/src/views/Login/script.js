import { reactive, ref } from "vue"
import { login, checkCaptcha, getCaptcha } from "@/api/login";
import router from "@/router";
import { ElMessage } from "element-plus";
import { useGlobalStore } from "@/stores/globalStore";


export default {
    setup() {
        
        const globalStore = useGlobalStore();

        const loginForm = reactive({
            username: '',
            password: '',
            checkCode: '',
            checked: false
        });
        const formDataRef = ref(null);

        const submitForm = () => {
          console.log("loginForm:",loginForm);
          formDataRef.value.validate(async(valid) => {
            if(!valid) return;
            //验证验证码
            let isChecked = false;
            checkCaptcha(loginForm).then(response => {
              console.log("response:",response);
              const { data,status } = response;
              if(status === 200) {
                isChecked = data;
              }else{
                ElMessage({message: data.data,type: 'error',})
                return;
              }
            })

            //验证码通过则发送登录请求
            if(isChecked){
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
            }else{
              ElMessage({message: '验证码错误',type: 'error',})
              // changeCheckCode();
            }
          });
        };

        const checkCodeUrl = ref(globalStore.baseUrl + "admins/getCaptcha")

        const changeCheckCode = (event) => {
          checkCodeUrl.value = globalStore.baseUrl + "admins/getCaptcha?t="+new Date().getTime();
        }

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
          checkCodeUrl,
          changeCheckCode,
          submitForm,
          rules,
          loginForm,
          register,
          formDataRef
        };
    },
}