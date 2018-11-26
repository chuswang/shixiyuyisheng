<template>
  <div class="hello">
    <base-input-overall label="用户名" :type="type" placeholder="请输入用户名">
      <div style="width:30px;height:30px;background-color: #f00;" @click="showPassword"></div>
    </base-input-overall>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {

  },
  data() {
    return {

      type: 'text'
    }
  },
  methods: {
    showPassword() {
      this.type = this.type === 'text' ? 'password' : 'text';
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
h3 {
  color: @base-color2;
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>