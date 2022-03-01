<!--职位管理-->
<template>
  <div id="jobLevel">
    <div>
      <el-input
        v-model="joblev.name"
        placeholder="职称名..."
        style="width: 300px; margin: 0 20px"
      ></el-input>
      <el-select
        v-model="joblev.titleLevel"
        style="width: 180px; margin: 0 10px; user-select: none"
        placeholder="请选择职称等级..."
      >
        <el-option
          v-for="item in levels"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="addJobLev">添加职称</el-button>
    </div>
    <body>
      <el-table
        fit
        lazy
        border
        :data="options"
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%; margin: 20px 20px"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          resizable
          prop="id"
          align="center"
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>
        <el-table-column
          resizable
          prop="id"
          align="center"
          label="编号"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          resizable
          label="职称名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="titleLevel"
          align="center"
          resizable
          label="职称等级"
          width="150"
          type="button"
          style="user-select: none; cursor: pointer"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          align="center"
          resizable
          label="创建日期"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="enabled"
          align="center"
          resizable
          label="是否启用"
          width="160"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-else type="danger">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          resizable
          label="操作"
          width="170"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              type="success"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </body>
    <footer class="foot">
      <el-button
        type="danger"
        @click="multDelete"
        :disabled="this.multipleSelection.length === 0 ? true : false"
        >批量删除</el-button
      >
    </footer>
    <!--编辑内容弹出框-->
    <el-dialog title="编辑职称" :visible.sync="dialogFormVisible">
      <el-form :model="updataInfo">
        <el-form-item size="small" label="职称等级" style="width: 400px">
          <el-input v-model="updataInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职称等级">
          <el-select
            size="small"
            style="width: 200px"
            v-model="updataInfo.titleLevel"
          >
            <el-option
              v-for="item in levels"
              :key="item.index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" size="small">
          <el-switch
            v-model="updataInfo.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已启用"
            inactive-text="未启用"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toUpdateInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'jobLevel',
  data () {
    return {
      joblev: {
        name: '',
        jobLevel: ''
      },
      levels: ['初级', '中级', '正高级', '副高级'],
      options: [],
      dialogFormVisible: false,
      updataInfo: {
        name: '',
        titleLevel: '',
        enabled: false
      },
      // 批量删除存放序号
      multipleSelection: []
    }
  },
  created () {
    this.getOptions()
  },
  methods: {
    // 获取所有职称
    getOptions () {
      this.getRequest('/system/basic/joblevel/').then((res) => {
        this.options = res
      })
    },
    // 添加职称
    addJobLev () {
      // 判断是否输入框是否为空
      if (this.joblev.name && this.joblev.titleLevel) {
        this.postRequest('/system/basic/joblevel/', this.joblev).then((res) => {
          if (res.code === 200) {
            this.getOptions()
            this.joblev.name = ''
            this.joblev.jobLevel = ''
          }
        })
      } else {
        this.$message.error('不能为空')
      }
    },
    // 编辑等级
    handleEdit (index, data) {
      this.dialogFormVisible = true
      Object.assign(this.updataInfo, data)
      this.updataInfo.createDate = ''
    },
    // 确认提交编辑等级内容
    toUpdateInfo () {
      // 发送请求修改内容
      this.putRequest('/system/basic/joblevel/', this.updataInfo).then(
        (res) => {
          // 更新表格
          this.getOptions()
        }
      )
      this.dialogFormVisible = false
    },
    // 选中则将对应的index放入multipleSelection
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 删除
    handleDelete (index, data) {
      console.log(data)
      this.$confirm(`此操作将永久删除--> ${data.name} <--, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteRequest(`/system/basic/joblevel/${data.id}`).then(
            (res) => {
              if (res.code === 200) {
                this.getOptions()
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
    },
    // 批量删除
    multDelete () {
      this.$confirm(
        '此操作将永久删除' + this.multipleSelection.length + '个职位是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          let str = '?'
          this.multipleSelection.forEach((item) => (str += `ids=${item.id}&`))
          this.deleteRequest('/system/basic/joblevel/' + str).then((res) => {
            if (res.code === 200) {
              this.getOptions()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
.el-form-item {
  display: flex;
}

.foot {
  display: flex;
  margin: 0 0 20px 20px;
}
</style>
