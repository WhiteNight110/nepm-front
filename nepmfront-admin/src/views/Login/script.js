import { getCurrentInstance,reactive, ref } from "vue"

export default {
    setup() {
        const {proxy} = getCurrentInstance();
        const loginForm = reactive({
            username: '',
            password: '',
            checkCode: '',
            checked: false
        });
        const formDataRef = ref(null);
        const api = {
          checkCode : "checkCode",
          login : "login"
        }

        const checkCodeUrl = ref(api.checkCode)
        const changeCheckCode = () => {
          checkCodeUrl.value = api.checkCode + '?' + new Date().getTime()
        }
        const submitForm = () => {
          formDataRef.value.validate(async(valid) => {
            if(!valid) return;
            let result = await proxy.Request({
              url : api.login,
              params : {
                username : loginForm.username,
                password : loginForm.password,
                checkCode : loginForm.checkCode
              },
              errorCallback : () => {
                changeCheckCode();
              }
            })
            console.log(result);
          });
        };
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
          changeCheckCode,
          submitForm,
          rules,
          loginForm,
          formDataRef
        };
    },
}