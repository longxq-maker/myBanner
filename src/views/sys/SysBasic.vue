<!--基础信息设置-->
<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="depManage">部门管理</el-tab-pane>
      <el-tab-pane label="职位管理" name="PosManage">
        <pos-manage></pos-manage>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="JobManage">职称管理</el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcManage">奖惩规则</el-tab-pane>
      <el-tab-pane label="权限组" name="PermissManage">权限组</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import depManage from '../../components/sys/base/DepManage.vue'
import EcManage from '../../components/sys/base/EcManage.vue'
import JobManage from '../../components/sys/base/JobManage.vue'
import PermissManage from '../../components/sys/base/PermissManage.vue'
import PosManage from '../../components/sys/base/PosManage.vue'
export default {
  data () {
    return {
      activeName: 'depManage'
    }
  },
  methods: {},
  components: {
    depManage,
    EcManage,
    JobManage,
    PermissManage,
    PosManage
  }
}
</script>
<style lang="less" scoped>
.el-tabs__nav {
  background: var(--color1);
}
</style>
