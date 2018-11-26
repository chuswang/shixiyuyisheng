<template>
  <div class="wrap">
    <mt-header fixed :title="title">
      <div class="left" slot="left">
        <base-icon name="fanhui" @click.native="goBack"></base-icon>
      </div>
      <div class="right" slot="right">
        <base-icon name="fanhui"></base-icon>
      </div>
    </mt-header>
    <div class="containter px-2">
    	<slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'base-grid',
  props:{
  	title:{
  		default:''
  	}
  },
  methods: {
  	goBack() {
  		this.$router.go(-1);
  	}
  }
}
</script>
<style scoped lang="less">
.wrap {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  /deep/ .mint-header-title {
  	font-size: @font-size-lg;
  }
  // overflow-y: hidden;
  .containter {
    height: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    overflow-y: auto;
  }

  .extend-icon {
    .extend-click();
  }

  .left,
  .right {
    // width: 40px;
  }
}
</style>