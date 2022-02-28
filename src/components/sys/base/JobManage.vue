<!--职位管理-->
<template>
  <div>
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
        lazy
        border
        :data="options"
        stripe
        style="width: 100%; margin: 20px 20px"
        ><el-table-column
          prop="id"
          align="center"
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>
        <el-table-column prop="id" align="center" label="编号" width="50">
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
      options: []
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
          }
        })
      } else {
        this.$message.error('不能为空')
      }
    },
    // 编辑等级
    handleEdit () {},
    // 删除
    handleDelete () {}
  }
}
</script>
<style lang="less" scoped></style>
