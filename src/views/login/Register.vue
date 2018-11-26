<template>
  <base-grid title="注册医生">
    <div>
      <span class="title">您的手机号是多少？</span>
      <base-input-overall placeholder="手机号"></base-input-overall>
      <mt-button type="primary" size="large" @click.native="goto('login')">获取短信验证码</mt-button>
    </div>
  </base-grid>
</template>
<script>
export default {
  name: 'register'
}
</script>
<style scoped lang="less">
.title {
  display: inline-block;
  margin: 10px 0;
  font-size: @font-size-lg;
}
</style>
