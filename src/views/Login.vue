<!--login-->
<template>
  <div id="login">
    <el-form ref="form" :model="form" class="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
#login {
  /**
   background: var(--bgcolorDay);
   */
  background: green;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 300px;
  height: 400px;
  background: greenyellow;
}
</style>
