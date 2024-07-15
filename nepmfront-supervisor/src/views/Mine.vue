<template>
  <div class="wrapper">
    <t-navbar title="个人信息" :fixed="false"></t-navbar>
    <t-cell-group class="info-cell-group">
      <t-cell title="头像" @click="isShowDialogAvatar=true">
        <template #rightIcon>
          <div class="right-avatar-content">
            <t-avatar shape="circle" :image="avatarUrl" />
            <chevron-right-icon />
          </div>
        </template>
      </t-cell>
      <t-cell title="姓名" @click="isShowDialogName=true" :note=name arrow hover />
      <t-cell title="性别" @click="isShowDialogSex=true" :note=sex arrow hover />
      <t-cell title="生日" @click="isShowDialogBirthday=true" :note=birthday arrow hover />
      <t-dialog
        v-model:visible="isShowDialogAvatar"
        close-on-overlay-click
        title="对话框标题"
        :cancel-btn="cancelBtn"
        :confirm-btn="confirmBtn"
        @confirm="onAvatarConfirm"
        @cancel="onAvatarCancel">
        <t-avatar shape="circle" :image="previewAvatarUrl" class="dialog-avatar" />
        <el-upload
            class="upload-demo"
            drag
            action="#"
            :on-change="onFileChange"
            :show-file-list="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
      </t-dialog>
      <t-dialog
        v-model:visible="isShowDialogName"
        close-on-overlay-click
        title="修改姓名"
        :cancel-btn="cancelBtn"
        :confirm-btn="confirmBtn"
        @confirm="onNameConfirm"
        @cancel="onNameCancel">
        <t-input :placeholder="name" v-model="nameInput"/>
      </t-dialog>
      <t-dialog
        v-model:visible="isShowDialogSex"
        close-on-overlay-click
        title="修改性别"
        :cancel-btn="cancelBtn"
        :confirm-btn="confirmBtn"
        @confirm="onSexConfirm"
        @cancel="onSexCancel">
        <t-radio-group class="sex-box" v-model="sexInput" borderless @change="sexChange">
          <t-radio :block="false" name="radio" value="男" label="男" />
          <t-radio :block="false" name="radio" value="女" label="女" />
        </t-radio-group>
      </t-dialog>
      <t-popup v-model="isShowDialogBirthday" placement="bottom">
          <t-date-time-picker
            :value="birthdayPicker"
            :mode="['date']"
            title="选择日期"
            start="1900-01-01"
            format="YYYY-MM-DD"
            @confirm="onBirthdayConfirm"
            @cancel="onBirthdayCancel"
          />
      </t-popup>
    </t-cell-group>
    <t-button class="saveButton" size="large" theme="primary" @click="onSave" block>保存</t-button>
  </div>
</template>
<script setup>
  import { reactive, ref, h, onMounted } from 'vue';
  import { ChevronRightIcon, LockOnIcon } from 'tdesign-icons-vue-next';
  import { updateInfo,getInfo } from '@/api/info';
  import { ElMessage } from 'element-plus';

  const avatarUrl = ref('https://avatars.githubusercontent.com/u/37282000?v=4');
  const previewAvatarUrl = ref(avatarUrl.value);
  const chevronRightIcon = () => h(ChevronRightIcon);
  const name = ref('张三');
  const sex = ref('男');
  const birthday = ref('1999-01-01');
  const nameInput = ref('');
  const sexInput = ref(sex.value);
  const birthdayPicker = ref(birthday.value);
  const isShowDialogAvatar = ref(false);
  const isShowDialogName = ref(false);
  const isShowDialogSex = ref(false);
  const isShowDialogBirthday = ref(false);
  const files = ref([]);
  onMounted(async() => {
    await getInfo().then(res => {
      console.log(res);
      name.value = res.data.data.realName;
      sex.value = res.data.data.sex==1?'男':'女';
      birthday.value = res.data.data.birthday.substring(0,10);
    })

  });
  const onFileChange = (file) => {
    if (file.raw) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewAvatarUrl.value = e.target.result;
      };
      reader.readAsDataURL(file.raw);
    }
  };
  const confirmBtn = {
    content: '确认',
    variant: 'text',
    size: 'large',
  };
  const cancelBtn = {
    content: '取消',
    variant: 'text',
    size: 'large',
  };
  const onAvatarConfirm = () => {
    avatarUrl.value = previewAvatarUrl.value;
    isShowDialogAvatar.value = false;
  };

  const onAvatarCancel = () => {
    isShowDialogAvatar.value = false;
  };
  const onNameConfirm = () => {
    name.value = nameInput.value;
    isShowDialogName.value = false;
    nameInput.value = '';
  };
  const onNameCancel = () => {
    isShowDialogName.value = false;
    nameInput.value = '';
  };
  const onSexConfirm = () => {
    sex.value = sexInput.value; // 更新性别值
    isShowDialogSex.value = false;
  };
  const onSexCancel = () => {
    isShowDialogSex.value = false;
  };
  const onBirthdayConfirm = () => {
    console.log(birthdayPicker.value);
    birthday.value = birthdayPicker.value;
    isShowDialogBirthday.value = false;
  };
  const onBirthdayCancel = () => {
    isShowDialogBirthday.value = false;
  };
  const onSave = () => {
    updateInfo({
      realName: name.value,
      sex: sex.value=='男'?1:0,
      birthday: birthday.value}).then(res => {
        if(res.data.code == 200){
          ElMessage.success('保存成功');
        }
      })
  }
</script>
<style scoped>
.info-cell-group {
  margin-top: 2vh;
}
.wrapper {
  background-color: #f6f6f6;
  width: 100%;
  height: 100%;
  display: relative;
}
.dialog-avatar {
  margin: 0 auto;
  margin: 2vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar{
  margin: 0 auto;
  margin-top: 10vh;
  width: 10vh;
  height: 10vh;
}
.right-avatar-content {
  display: flex;
  align-items: center;
}
.right-avatar-content t-avatar {
  margin-right: 8px;
}
:deep(.t-dialog__footer--full){
  padding: 0%;
}
.saveButton {
  position: fixed;
  bottom: 8vh;
}
.sex-box {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-color-demo, #fff);
}
</style>