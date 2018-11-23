<!-- Confirm插件 -->
<template>
  <div class="app_confirm" v-show="show">
    <div class="app_confirm_mask"></div>
    <v-card class="app_confirm_card">
      <v-card-title class="headline" v-text="title"></v-card-title>
      <v-card-text  v-text="content"></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-1" flat @click="cancelEvent"  v-text="cancelText"></v-btn>
        <v-btn color="green darken-1" flat="flat" @click="confirmEvent" v-text="confirmText"></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    confirm: {
      type: Function
    },
    cancel: {
      type: Function
    }
  },
  data() {
    return {
      show: false,
      title: '',
      content: '',
      cancelText: '',
      confirmText: ''
    };
  },
  computed: {},
  methods: {
    onOpen() {
      this.show = true;
    },
    onCancel() {
      this.show = false;
    },
    confirmEvent() {
      this.onCancel();
      if (this.confirm) {
        this.confirm();
      }
    },
    cancelEvent() {
      this.onCancel();
      if (this.cancel) {
        this.cancel();
      }
    }
  }
};
</script>

<style lang="less">
@import "../../Less/base";

.app_confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: hidden;
  z-index: @player_loading;
  display: flex;
  align-items: center;
  justify-content: center;
  .app_confirm_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .app_confirm_card {
    position: relative;
    z-index: 1;
    width: 320px;
  }
}
</style>
