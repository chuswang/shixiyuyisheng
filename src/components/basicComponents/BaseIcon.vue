<template>
    <i class="iconfont" :class="'icon-' + name"></i>
</template>

<script>
import '@/assets/font/iconfont.css'
export default{
  name: 'font-icon',
  props: {
    name: {
      type: String
    }
  }
}
</script>

<style>

</style>
