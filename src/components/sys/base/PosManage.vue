<!--奖惩规则-->
<template>
  <div>
    <el-input
      v-model="pos.name"
      placeholder="添加职位..."
      suffix-icon="el-icon-plus"
      class="addInput"
    ></el-input>
    <el-button type="primary" @click="addPos" @keydown.enter.native="addPos"
      >添加</el-button
    >
    <!--添加职位-->
    <el-table
      border
      :data="tableData"
      stripe
      style="width: 100%; margin-top: 20px"
      size="mini"
      lazy
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" align="center" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" prop="id" label="代码" width="100">
      </el-table-column>
      <el-table-column align="center" prop="name" label="职位" width="180">
      </el-table-column>
      <el-table-column align="center" prop="createDate" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="toEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="toDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="danger"
      @click="multDelet"
      class="multDelet"
      :disabled="this.multipleSelection.length === 0"
      >批量删除</el-button
    >
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span class="inputContent">
        <el-tag type="success" size="small">职位名称</el-tag>
        <el-input size="mini" v-model="upData.name"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'posMana',
  data () {
    return {
      pos: {
        name: ''
      },
      tableData: [],
      dialogVisible: false,
      // 修改职位
      upData: {
        name: ''
      },
      // 选中信息
      multipleSelection: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 添加职位信息
    async addPos () {
      if (this.pos.name) {
        const data = await this.postRequest('/system/basic/pos/', this.pos)
        if (data.code === 200) {
          this.getData()
          this.pos.name = ''
        }
      } else {
        this.$message.error('职位名称不为空')
      }
    },
    // 获取职位信息
    async getData () {
      this.tableData = await this.getRequest('/system/basic/pos/')
      if (!this.tableData) {
        return this.$message.error({
          message: '获取职位信息失败'
        })
      }
    },
    // 弹框是否删除
    toDelete (index, data) {
      this.$confirm('此操作将永久删除' + data.name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteRequest(`/system/basic/pos/${data.id}`).then((res) => {
            if (res.code === 200) {
              this.getData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑职位信息
    toEdit (index, data) {
      Object.assign(this.upData, data)
      this.upData.createDate = ''
      this.dialogVisible = true
    },
    // 确认修改职位信息
    confirmEdit () {
      this.putRequest('/system/basic/pos/', this.upData).then((res) => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.getData()
        }
      })
    },
    // 点击其他地方弹出是否关闭对话框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 选中按钮
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除按钮
    async multDelet () {
      console.log('批量删除')
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
          this.deleteRequest('/system/basic/pos/' + str).then((res) => {
            if (res.code === 200) {
              this.getData()
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
.addInput {
  width: 300px;
  left: 0;
  margin: 0 20px;
}
.inputContent {
  display: flex;
  align-items: center;
  .el-tag {
    margin: 0 20px;
    font-size: 14px;
  }
  .el-input {
    width: 60%;
  }
}
.multDelet {
  margin: 20px;
}
</style>
