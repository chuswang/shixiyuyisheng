<template>
  <div class="top-root">
    <div class="label" v-if="label">{{label}}</div>
    <div class="wrap">
      <base-input :type="type" :placeholder="placeholder"></base-input>
      <div class="extend-btn">
      	<slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'base-input-overall',
  props: {
    label: String,
    type:String,
    placeholder:String
  }
}
</script>
<style scoped lang="less">
.top-root {
  // .mix-1px (1,0,0,0,'#000');
  padding-bottom:4px;
  margin-bottom:10px;
  border-bottom: @border-width-1 solid #ccc;
  // .mix-1px-clear();
}

.label {
  text-align: left;
  height: @height-sm;
  line-height: @height-sm;
  font-size: @font-size-sm;
}

.wrap {
  display: flex;
  align-items: center;
  &>div:first-child {
    flex-grow: 1;
  }
  .extend-btn {
    margin-right:10px;
  }
}
</style>