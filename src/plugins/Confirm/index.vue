<template>
    <div class="toast">
      {{tips}}
    </div>
</template>
<script>
export default {
  mounted() {
  },
  data() {
    return {
      tips: '',
    }
  }
}
</script>
<style scoped lang="less">
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 4px;
  max-width:80vw;
}

</style>