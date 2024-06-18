import { reactive, ref } from "vue"
import router from "@/router";
import { register } from "@/api/login";
import { ElMessage } from "element-plus";


export default {
    setup() {
        const registerForm = reactive({
            username: '',
            password: '',
            passwordCheck: ''
        });
        const formDataRef = ref(null);

        const submitForm = () => {
          if(registerForm.password !== registerForm.passwordCheck) {
            console.log('两次密码不一致');
            return;
          }
          formDataRef.value.validate(async(valid) => {
            if(!valid) return;
            //验证通过则发送登录请求
            register(registerForm).then(response => {
              console.log("response:",response);
              const { data } = response;
              if(data.code === 200) {
                ElMessage({message: data.data,type: 'success',})
                router.push('/login');
              }else{
                ElMessage({message: data.data,type: 'error',})
              }
              
            }).catch(error => {
              console.log(error);
            });
          });
        };
        const rules = {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          passwordCheck: [
            { required: true, message: '请再次输入密码', trigger: 'blur' }
          ]
        };  
    
        return {
          // changeCheckCode,
          submitForm,
          rules,
          registerForm,
          formDataRef
        };
    },
}