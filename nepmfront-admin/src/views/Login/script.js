import { reactive, ref } from "vue"
export default {
    setup() {
        const loginForm = reactive({
            userId: '',
            password: ''
          });
          
          const login = () => {
            alert('userId: ' + loginForm.userId + ', password: ' + loginForm.password)
          }

          // 定义一个提交表单的方法
          const submitForm = () => {
            // 在这里处理表单提交逻辑
            console.log('Form submitted:', loginForm);
          };
      
          return {
            loginForm,
            submitForm
          };
    },
}