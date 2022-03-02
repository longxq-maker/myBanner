<!--部门管理-->
<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <div class="left">
      <el-tree
        class="filter-tree"
        :data="deps"
        :props="defaultProps"
        :filter-node-method="filterNode"
        ref="tree"
        :expand-on-click-node="false"
      >
        <span class="depBtn" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="btn">
            <el-button
              type="success"
              class="btnItem"
              size="mini"
              @click="() => showDep(data)"
            >
              添加子部门
            </el-button>
            <el-button
              type="danger"
              class="btnItem"
              size="mini"
              @click="() => deleteDeps(data)"
            >
              删除部门
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog title="添加部门" :visible.sync="dialogVisible" width="40%">
      <span>
        <table>
          <tr>
            <td><el-tag>上级部门</el-tag></td>
            <td>{{ pname }}</td>
          </tr>
          <tr>
            <td>
              <el-tag>部门名称</el-tag>
            </td>
            <td>
              <el-input
                size="small"
                autofocus
                v-model="addDepsInfo.name"
                placeholder="请输入部门名称..."
              ></el-input>
            </td>
          </tr>
        </table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddDep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DepManage',
  data () {
    return {
      deps: [],
      pname: '',
      filterText: '',
      // 展示节点
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      addDepsInfo: {
        parentId: -1,
        name: ''
      },
      dialogVisible: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  created () {
    this.initDeps()
  },
  methods: {
    // 筛选节点
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 初始化数据
    initDeps () {
      this.getRequest('/system/basic/department/').then((res) => {
        if (res) {
          this.deps = res
        }
      })
    },
    // 添加/删除部门
    showDep (data) {
      this.pname = data.name
      this.addDepsInfo.parentId = data.id
      this.dialogVisible = true
    },
    // 添加后清空弹出框内容
    initDep () {
      this.addDepsInfo = {
        name: '',
        parentId: -1
      }
      this.pname = ''
    },
    // 执行添加操作
    doAddDep () {
      this.postRequest('/system/basic/department/', this.addDepsInfo).then(
        (res) => {
          console.log(res)
          // 将添加内容添加到deps中
          this.initDep()
          const result = this.addDep2Deps(this.deps, res.obj)
          if (!result) {
            this.dialogVisible = false
          }
        }
      )
    },
    // 将dep加到deps中
    addDep2Deps (deps, dep) {
      for (let i = 0; i < deps.length; i++) {
        const d = deps[i]
        if (d.id === dep.parentId) {
          d.children = d.children.concat(dep)
          if (d.children.length > 0) {
            d.isParent = true
          }
          return false
        } else {
          this.addDep2Deps(d.children, dep)
        }
      }
    },
    // 手动删除dep
    deleteDep (p, deps, dep) {
      console.log('---deps---')
      console.log(deps)
      console.log('---dep---')
      console.log(dep)
      for (let i = 0; i < deps.length; i++) {
        const d = deps[i]
        if (d.id === dep.id) {
          deps.splice(i, 1)
          if (deps.length === 0) {
            p.isParent = false
          }
        } else {
          this.deleteDep(d, d.children, dep)
        }
      }
    },
    // 删除部门
    deleteDeps (data) {
      if (!data.isParent) {
        this.$confirm(
          '此操作将永久删除该部门[' + data.name + '], 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            this.deleteRequest('/system/basic/department/' + data.id).then(
              (res) => {
                if (res.code === 200) {
                  this.deleteDep(null, this.deps, data)
                }
              }
            )
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$message.error('父部门,需先清空子部门！')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.left {
  margin-top: 10px;
  border-radius: 10px;
}
.el-tree {
  width: 400px;
  height: 500px;
  background: var(--color1);
  border-radius: 10px;
  padding: 4px;
  overflow: hidden;
}
.depBtn {
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn {
  margin-right: 10px;
}
.btnItem {
  padding: 2px;
  color: white;
  margin-right: 5px;
}
tr > td {
  margin: 20px;
}
</style>
