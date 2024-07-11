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
        <t-upload
          v-model="files"
          :multiple="false"
          :max="1"
          :size-limit="{ size: 3000000, unit: 'B' }"
          accept="image/png"
          action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          @validate="onValidate"
          @success="onUploadSuccess"
        >
        </t-upload>
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
      <!-- <t-dialog
        v-model:visible="isShowDialogBirthday"
        close-on-overlay-click
        title="修改生日"
        :cancel-btn="cancelBtn"
        :confirm-btn="confirmBtn"
        @confirm="onBirthdayConfirm"
        @cancel="onBirthdayCancel">
      </t-dialog> -->
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
  import { reactive, ref, h } from 'vue';
  import { ChevronRightIcon, LockOnIcon } from 'tdesign-icons-vue-next';
  import { updateInfo } from '@/api/info';

  const avatarUrl = ref('https://avatars.githubusercontent.com/u/37282000?v=4');
  const chevronRightIcon = () => h(ChevronRightIcon);
  const name = ref('张三');
  const sex = ref('男');
  const birthday = ref('1999-01-01');
  const isShowDialogAvatar = ref(false);
  const isShowDialogName = ref(false);
  const isShowDialogSex = ref(false);
  const isShowDialogBirthday = ref(false);
  const files = ref([]);
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
  const nameInput = ref('');
  const sexInput = ref(sex.value);
  const birthdayPicker = ref(birthday.value);
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
      birthday: birthday.value})
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