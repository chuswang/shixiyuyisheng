<template>
  <base-grid>
    <div>
      <mt-navbar v-model="active" class="nav-bar">
        <mt-tab-item id="tab-container1">密码登录</mt-tab-item>
        <mt-tab-item id="tab-container2">验证码登录</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active" class="tab-wrap">
        <mt-tab-container-item id="tab-container1">
          <base-input-overall label="手机号" placeholder="请输入手机号"></base-input-overall>
          <base-input-overall :type="type" label="密码" placeholder="请输入密码" @click.native="showPassword">
              <base-icon name='yincang'></base-icon>
          </base-input-overall>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <base-input-overall label="手机号" placeholder="请输入手机号">
            <mt-button size="small" type="primary">获取验证码</mt-button>
          </base-input-overall>
          <base-input-overall label="验证码" placeholder="请输入验证码"></base-input-overall>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </base-grid>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      active: 'tab-container1',
      type: 'password'
    }
  },
  methods: {
    showPassword() {
      this.type = this.type === 'text' ? 'password' : 'text';
    }
  }
}
</script>
<style scoped lang="less">
.nav-bar {
  margin-bottom: 20px;
}

</style>