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
          v-model="role.nameZh"
        ></el-input>
        <el-button
          type="primary"
          @click="addRoles"
          @keypress.enter.down="addRoles"
          >添加角色</el-button
        >
      </div>
    </header>
    <body>
      <el-collapse v-model="activeName" accordion @change="changeInfo">
        <el-collapse-item
          v-for="(item, index) in roles"
          :key="index"
          :title="item.nameZh"
          :name="item.id"
        >
          <el-card class="box-card" activeName>
            <div slot="header" class="clearfix">
              <span>资源名称</span>
              <el-button
                style="color: red; float: right; padding: 3px 0"
                type="text"
                @click="deleteRoles(item.id)"
                ><i class="el-icon-delete"></i>删除角色</el-button
              >
            </div>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              ref="tree"
              show-checkbox
              @node-click="selectedRoles"
              :default-checked-keys="currrentRole"
              node-key="id"
            ></el-tree>
            <div class="btn">
              <el-button
                size="mini"
                type="warning"
                @click="confirmEdit(item.id, index)"
                >确认修改</el-button
              >
              <el-button size="mini" type="danger" @click="cancleEdit"
                >放弃修改</el-button
              >
            </div>
          </el-card>
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
        nameZh: ''
      },
      activeName: -1,
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
  },
  methods: {
    // 点击标签获取对应的id内容
    // todo 此处有bug
    changeInfo (id) {
      if (id) {
        this.getTree()
        this.selectedRoles(id)
      }
    },
    // 删除角色
    deleteRoles (id) {
      this.deleteRequest('/system/basic/permiss/role/' + id).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.initRoles()
        }
      })
    },
    // 初始化角色
    initRoles () {
      this.getRequest('/system/basic/permiss/').then((res) => {
        this.roles = res
      })
    },
    // 获取树形控件
    getTree () {
      this.getRequest('/system/basic/permiss/menus').then((res) => {
        this.treeData = res
      })
    },
    selectedRoles (id) {
      this.getRequest('/system/basic/permiss/mid/' + id).then((res) => {
        if (res) {
          this.currrentRole = res
        }
      })
    },
    // 确认修改事件
    confirmEdit (id, index) {
      console.log('确认修改')
      const trs = this.$refs.tree[index]
      const selectedArr = trs.getCheckedKeys(true)
      let url = '/system/basic/permiss/?rid=' + id
      selectedArr.forEach((item) => {
        url += '&mids=' + item
      })
      this.putRequest(url).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.activeName = -1
          this.getTree()
        }
      })
      // console.log(info)
    },
    // 放弃修改
    cancleEdit () {
      console.log('放弃修改')
    },
    // 添加角色
    addRoles () {
      if (this.role.name && this.role.nameZh) {
        this.postRequest('/system/basic/permiss/role', this.role).then(
          (res) => {
            if (res.code === 200) {
              this.role.name = ''
              this.role.nameZh = ''
              // 初始化角色列表
              this.initRoles()
            }
          }
        )
      } else {
        this.$message.error({ message: '角色不能为空，请重新输入人' })
      }
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

.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
