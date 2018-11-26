<template>
  <div class="wrap">
    <input :type="type" v-model="value" :placeholder="placeholder"/>
    <span class="clear" v-show="value" @click="clear">
    	<base-icon name="close"></base-icon>
    </span>

  </div>
</template>
<script>
export default {
  name: 'base-input',
  props: {
    label: String,
    type:{
    	default:'text'
    },
    placeholder:String
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    clear() {
      this.value = '';
    }
  }
}
</script>
<style scoped lang="less">
.wrap {
  position: relative;


  input {
    width: 100%;
    padding: 0 4px;
    height: @height-md;
    line-height: @height-md;
    font-size: @font-size-md;
  }

  span.clear {
    position: absolute;
    height: @height-md;
    line-height: @height-md;
    right: 10px;
    top: 0;
    cursor: default;
    .extend-click();
  }

}
</style>