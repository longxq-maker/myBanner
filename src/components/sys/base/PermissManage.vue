<!--权限组-->
<template>
  <div id="permiss">
    <header>
      <div class="inputRole">
        <el-input placeholder="请输入角色英文名" v-model="role.name">
          <template slot="prepend">Role</template>
        </el-input>
        <el-input
          placeholder="请输入角色中文名"
          v-model="role.cn_name"
        ></el-input>
        <el-button type="primary">添加角色</el-button>
      </div>
    </header>
    <body>
      <el-collapse accordion>
        <el-collapse-item
          v-for="(item, index) in roles"
          :key="index"
          :title="item.nameZh"
          :name="item.id"
        >
          <el-tree
            :data="treeData"
            :props="defaultProps"
            show-checkbox
            @node-click="handleNodeClick"
          ></el-tree>
        </el-collapse-item>
      </el-collapse>
    </body>
  </div>
</template>
<script>
export default {
  name: 'PermissManage',
  data () {
    return {
      role: {
        name: '',
        cn_name: ''
      },
      activeName: '1',
      roles: [],
      // 树形控件
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 根据用户id查询对应角色权限
      currrentRole: []
    }
  },
  created () {
    this.initRoles()
    this.getTree()
  },
  methods: {
    initRoles () {
      this.getRequest('/system/basic/permiss/').then((res) => {
        this.roles = res
      })
    },
    // 获取树形控件
    getTree () {
      this.getRequest('/system/basic/permiss/menus').then((res) => {
        console.log(res)
        this.treeData = res
      })
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
.inputRole {
  display: flex;
  .el-input {
    margin-right: 20px;
  }
}
</style>
