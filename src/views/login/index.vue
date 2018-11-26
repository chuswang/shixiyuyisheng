<template>
  <div class="grid px-2">
    <div class="top"></div>
    <div class="bottom">
      <mt-button type="primary"  size="large" @click.native="goto('login')">登录</mt-button>
      <mt-button type="default"  size="large" @click.native="goto('register')">注册</mt-button>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
	name:'login-home',
	methods: {
		goto(path) {
			this.$router.push(path);
		}
	}
}
</script>
<style scoped lang="less">
.grid {
  width: 100%;
  height: 100%;
  .top {
  	height:50%;

  }
  .bottom {
	&>button {
		margin-bottom:20px;
	}
  }
}
</style>