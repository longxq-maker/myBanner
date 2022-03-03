<!--
 * @Description:部门管理
 * @Author: longxq
 * @Date: 2022-02-28 21:37:02
 * @LastEditTime: 2022-03-03 11:59:56
 * @LastEditors: longxq
 * @Reference:
-->
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
                v-model="depsInfo.name"
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
      depsInfo: {
        parentId: -1,
        name: ''
      },
      dialogVisible: false,
      children: [],
      // 临时变量
      count: 0
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
    /**
     * @name: 节点筛选
     * @test:
     * @msg:
     * @param {*} value
     * @param {*} data
     * @return {*}
     */
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    /**
     * @name: 初始化数据
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    initDeps () {
      this.getRequest('/system/basic/department/').then((res) => {
        if (res) {
          // console.log('---getRequest的res---')
          // console.log(res)
          this.deps = res
        }
      })
    },
    /**
     * @name:添加/删除部门
     * @test:
     * @msg:
     * @param {*} data
     * @return {*}
     */
    showDep (data) {
      this.pname = data.name
      this.depsInfo.parentId = data.id
      this.dialogVisible = true
      this.children = data.children
    },
    /**
     * @name:添加后清空弹出框内容
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    initDep () {
      this.depsInfo = {
        name: '',
        parentId: -1
      }
      this.pname = ''
    },
    /**
     * @name:  执行添加操作
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    doAddDep () {
      /**
       * @name:实现添加功能
       * @test:
       * @msg:判断是否children是否已经有该部门，有则提示，无则进行添加操作
       * @param {*}
       * @return {*}
       */
      const child = this.children
      const inputInfo = this.depsInfo
      console.log(child)
      if (child !== null && child.length !== 0) {
        for (let i = 0; i < child.length; i++) {
          if (child[i].name === inputInfo.name) {
            this.$message.error('该部门已存在,请重新输入!')
            return
          }
        }
        this.sendRequest()
        // console.log('this.depsInfo')
        // console.log(this.depsInfo)
      } else {
        this.sendRequest()
      }
    },
    /**
     * @name:发送添加请求
     * @test:
     * @msg:发送请求
     * @param {*}
     * @return {*}
     */
    sendRequest () {
      this.postRequest('/system/basic/department/', this.depsInfo)
        .then((res) => {
          // 将添加内容添加到deps中
          this.addDep2Deps(this.deps, res.obj)
          // console.log('res.obj')
          // console.log(res.obj)
          if (this.deps === null) {
            this.deps = []
          } else {
            console.log('this.deps === null ?')
            console.log(this.deps === null)
            this.initDep()
            this.dialogVisible = false
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    /**
     * @name: 将dep加到deps中
     * @test:
     * @msg:
     * @param {*} deps
     * @param {*} dep
     * @return {*}
     */
    addDep2Deps (deps, dep) {
      // console.log('deps.length')
      // console.log(typeof deps)
      // console.log('---deps---')
      // console.log(deps)
      if (deps !== null) {
        for (let i = 0; i < deps.length; i++) {
          const d = deps[i]
          if (d.id === dep.parentId) {
            if (d.children) {
              d.children = d.children.concat(dep)
              if (d.children.length > 0) {
                d.isParent = true
              }
            } else if (d.children === null) {
              d.children = []
              d.children = d.children.concat(dep)
              if (d.children.length > 0) {
                d.isParent = true
              }
              this.initDep()
              this.dialogVisible = false
            }
            return
          } else {
            this.addDep2Deps(d.children, dep)
          }
        }
      } else {
        // 当 deps为空时，将其设置为空数组
        deps = []
      }
    },
    // 手动删除dep
    deleteDep (p, deps, dep) {
      console.log('---deps---')
      console.log(deps)
      if (deps !== null && deps.length) {
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
      } else {
        p.isParent = false
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
