<!--
 * @Description:基本资料
 * @Author: longxq
 * @Date: 2022-02-26 22:24:03
 * @LastEditTime: 2022-03-07 00:11:43
 * @LastEditors: longxq
 * @Reference:
-->
<template>
  <div class="basic">
    <header style="display: flex; justify-content: space-between">
      <div style="display: flex; width: 40%">
        <el-input
          prefix-icon="el-icon-search"
          style="margin-right: 10px; min-width: 100px"
          v-model="userName"
          clearable
          @clear="initData"
          placeholder="请输入员工名进行搜索..."
          @keypress.enter.native="initData"
        ></el-input>
        <el-button type="primary" @click="initData">搜索</el-button>
        <el-button type="primary"
          ><i class="fa fa-angle-double-down"></i> 高级搜索</el-button
        >
      </div>
      <div
        style="margin-right: 20px; display: flex; flex-justify: space-around"
      >
        <el-button type="success" @click="exportData"
          ><i class="fa fa-level-up"></i>导出数据</el-button
        >
        <el-upload
          class="upload-demo"
          action="/employee/basic/import"
          :headers="header"
          :show-file-list="false"
          :before-upload="beforUpload"
          :on-success="importDataSuccess"
          :on-error="importDataFalse"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :disabled="enabled"
        >
          <el-button
            type="success"
            style="margin: 0 10px"
            @click="importData"
            :disabled="enabled"
            ><i :class="importDataIcon"></i>{{ importDataText }}</el-button
          >
        </el-upload>
        <el-button type="primary" @click="addUser"
          ><i class="el-icon-plus"></i>添加员工</el-button
        >
      </div>
    </header>
    <body class="body">
      <el-table
        border
        ref="form"
        :data="tableData.data"
        stripe
        style="width: 100%"
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="35"
        ></el-table-column>
        <el-table-column
          fixed
          type="index"
          align="center"
          label="序号"
          width="40"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          align="center"
          label="姓名"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="workID"
          label="工号"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="wedlock"
          label="婚姻状况"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nation.name"
          label="民族"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="nativePlace"
          label="籍贯"
          width="65"
        ></el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          cell-dblclick="cellDB"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="politicsStatus.name"
          label="政治面貌"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="电子邮件"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="联系地址"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="department.name"
          label="部门"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="position.name"
          label="职位"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="engageForm"
          label="雇佣方式"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="tiptopDegree"
          label="学历"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="school"
          label="毕业院校"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="contractTerm"
          label="合同期限"
          width="60"
        ></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
            <!-- <el-button size="mini" style="margin: 10px 0" type="warning"
              >高级资料</el-button
            > -->
            <el-button size="mini" type="danger" @click="deleteUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </body>
    <footer class="footer">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        :current-page="currentPage"
        layout="prev, pager, next, jumper,total"
        :total="total"
        hide-on-single-page
      >
      </el-pagination>
    </footer>
    <!--添加员工弹出框-->
    <el-dialog :title="title" :visible.sync="showTableVisible" width="80%">
      <el-form ref="userInfo" :model="userInfo" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名:" prop="name">
              <el-input
                style="width: 100%"
                size="mini"
                v-model="userInfo.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别:" prop="gender">
              <el-radio-group v-model="userInfo.gender" size="mini">
                <el-radio label="女">女</el-radio>
                <el-radio label="男">男</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生日期:">
              <el-date-picker
                v-model="userInfo.birthday"
                type="date"
                size="mini"
                value-format="yyyy-mm-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="政治面貌:" prop="policIc">
              <el-select
                v-model="userInfo.politicsStatus.name"
                clearable
                size="mini"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in politicArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="民族:" prop="nationId">
              <el-select v-model="userInfo.nationId" size="mini">
                <el-option
                  v-for="item in nations"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="籍贯:" prop="nativePlace">
              <el-input
                v-model="userInfo.nativePlace"
                placeholder="请输入籍贯"
                size="mini"
                style="width: 170px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱地址:" prop="email">
              <el-input
                v-model="userInfo.email"
                placeholder="请输入邮箱地址"
                size="mini"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系地址:" prop="address">
              <el-input
                v-model="userInfo.address"
                placeholder="请输入联系地址"
                size="mini"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="职位:" prop="position">
              <el-select v-model="userInfo.position.name" size="mini">
                <el-option
                  v-for="item in positions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职称:" prop="joblevel">
              <el-select v-model="userInfo.joblevel.name" size="mini">
                <el-option
                  v-for="item in jobLevel"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属部门:" prop="department">
              <el-select v-model="userInfo.department" size="mini">
                <el-option
                  v-for="item in deps"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话号码:" prop="phone">
              <el-input
                v-model="userInfo.phone"
                placeholder="请输入电话号码"
                size="mini"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="工号:" prop="workID">
              <el-input
                disabled
                v-model="userInfo.workID"
                placeholder="请输入工号"
                size="mini"
                style="width: 170px; user-select: none"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学历:" prop="tiptopDegree">
              <el-select v-model="userInfo.tiptopDegree" size="mini">
                <el-option
                  v-for="item in tiptopDegree"
                  :key="item.index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="毕业院校:" prop="school">
              <el-input
                v-model="userInfo.school"
                placeholder="请输入毕业院校"
                size="mini"
                style="width: 170px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="专业名称:" prop="specialty">
              <el-input
                v-model="userInfo.specialty"
                placeholder="请输入专业名称"
                size="mini"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item
              label-width="100px"
              label="入职日期:"
              prop="beginDate"
            >
              <el-date-picker
                v-model="userInfo.beginContract"
                type="date"
                size="mini"
                value-format="yyyy-mm-dd"
                style="width: 170px"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              style="width: 170px"
              label="转正日期:"
              prop="beginContract"
            >
              <el-date-picker
                v-model="userInfo.endContract"
                type="date"
                size="mini"
                value-format="yyyy-mm-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label-width="100px"
              label="合同起始日期:"
              prop="startContract"
            >
              <el-date-picker
                v-model="userInfo.startContract"
                type="date"
                size="mini"
                style="width: 170px"
                value-format="yyyy-mm-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="合同截止日期:"
              label-width="100px"
              prop="endContract"
            >
              <el-date-picker
                v-model="userInfo.endContract"
                type="date"
                size="mini"
                style="width: 170px"
                value-format="yyyy-mm-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label-width="100px" label="身份证号码:" prop="idCard">
              <el-input
                style="width: 200px"
                size="mini"
                v-model="userInfo.idCard"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="聘用形式:" prop="engageForm">
              <el-radio-group v-model="userInfo.engageForm" size="mini">
                <el-radio label="劳动合同">劳动合同</el-radio>
                <el-radio label="劳务合同">劳务合同</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="婚姻状况:" prop="wedlock">
              <el-radio-group v-model="userInfo.wedlock" size="mini">
                <el-radio label="已婚">已婚</el-radio>
                <el-radio label="未婚">未婚</el-radio>
                <el-radio label="离异">离异</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex; justify-content: flex-end">
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">{{
              summitInfo
            }}</el-button>
            <el-button @click="cancelSub">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      header: {
        Authorization: window.sessionStorage.getItem('tokenStr')
      },
      enabled: false,
      importDataIcon: 'fa fa-level-down',
      importDataText: '导入文件',
      tableData: [],
      total: 0,
      currentPage: 1,
      size: 10,
      userName: '',
      showTableVisible: false,
      addUserData: [],
      birthday: '',
      userInfo: {
        address: '',
        beginContract: '',
        beginDate: '',
        birthday: '',
        contractTerm: null,
        conversionTime: '',
        department: '',
        departmentId: null,
        email: '',
        endContract: '',
        engageForm: '',
        gender: '',
        id: '',
        idCard: '',
        jobLevelId: null,
        joblevel: { id: '', name: '' },
        name: '',
        nation: '',
        nationId: null,
        nativePlace: '',
        notWorkDate: null,
        phone: '',
        politicId: null,
        politicsStatus: { id: '', name: '' },
        posId: null,
        position: '',
        salary: '',
        salaryId: null,
        school: '',
        specialty: '',
        tiptopDegree: '',
        wedlock: '',
        workAge: null,
        workID: '',
        workState: '在职'
      },
      politicArr: [], // 政治面貌选择框内容
      nations: [], // 民族
      positions: [], // 职位
      jobLevel: [], // 职称
      deps: [], // 所属部门
      workId: '', // 工号
      title: '', // 提交或修改表头名
      tiptopDegree: ['小学', '初中', '高中', '大学', '硕士', '博士', '博士后'], // 学历
      summitInfo: '添加员工'
    }
  },
  created () {
    this.initData()
    this.getBase()
  },
  methods: {
    getBase () {
      this.getRequest('/employee/basic/politicsstatus').then((res) => {
        if (res) {
          this.politicArr = res
        }
      })
      this.getRequest('/employee/basic/nations').then((res) => {
        if (res) {
          this.nations = res
        }
      })
      this.getRequest('/employee/basic/positions').then((res) => {
        this.positions = res
      })
      this.getRequest('/employee/basic/joblevels').then((res) => {
        this.jobLevel = res
      })
      this.getRequest('/employee/basic/deps').then((res) => {
        console.log('---res---')
        console.log(res)
        const self = this
        function toArr (arr) {
          if (Array.isArray(arr)) {
            arr.forEach((ele) => {
              if (typeof ele === 'object' && ele !== null) {
                self.deps.push(ele.name)
                if (ele.hasOwnProperty('children')) {
                  toArr(ele.children)
                }
              }
            })
          } else {
            return arr
          }
        }
        toArr(res)
      })
      // 获取工号
      this.getRequest('/employee/basic/maxWorkID').then((res) => {
        this.userInfo.workID = res.obj
      })
    },
    /**
     * @name:初始化table数据
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    initData () {
      this.getRequest(
        '/employee/basic/?currentPage=' +
          this.currentPage +
          '&size=' +
          this.size +
          '&name=' +
          this.userName
      ).then((res) => {
        if (res) {
          this.tableData = res
          this.total = res.total
          console.log('--res--')
          console.log(res)
        }
      })
    },
    /**
     * @name:跳转页数
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    handleCurrentChange (currentPage) {
      console.log('修改当前页')
      console.log('currentPage')
      console.log(currentPage)
      this.currentPage = currentPage
      this.initData()
    },
    /**
     * @name:输入跳转页码
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    handleSizeChange (pageSize) {
      console.log(pageSize)
      this.page = pageSize
    },
    /**
     * @name:添加员工
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    addUser () {
      this.title = '添加员工'
      this.summitInfo = '立即添加'
      this.showTableVisible = true
      this.userInfo = {
        address: '',
        beginContract: '',
        beginDate: '',
        birthday: '',
        contractTerm: null,
        conversionTime: '',
        department: '',
        departmentId: null,
        email: '',
        endContract: '',
        engageForm: '',
        gender: '',
        id: '',
        idCard: '',
        jobLevelId: null,
        joblevel: '',
        name: '',
        nation: '',
        nationId: null,
        nativePlace: '',
        notWorkDate: null,
        phone: '',
        politicId: null,
        politicsStatus: { id: '', name: '' },
        posId: null,
        position: '',
        salary: '',
        salaryId: null,
        school: '',
        specialty: '',
        tiptopDegree: '',
        wedlock: '',
        workAge: null,
        workID: '',
        workState: '在职'
      }
    },
    /**
     * @name:取消提交
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    cancelSub () {
      this.showTableVisible = false
    },
    /**
     * @name:提交表单
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    onSubmit () {
      // 判断是否有Id,没有Id则进行添加操作
      if (this.userInfo.Id) {
        this.putRequest('/employee/basic/', this.userInfo).then((res) => {
          console.log('---修改员工---')
          console.log(res)
          this.showTableVisible = false
        })
      } else {
        this.postRequest('/employee/basic/', this.userInfo).then((res) => {
          console.log(res)
          this.showTableVisible = false
        })
      }
    },
    /**
     * @name:删除用户
     * @test:
     * @msg:
     * @param {*} data
     * @return {*}
     */
    deleteUser (data) {
      this.$confirm(`此操作将永久删除--> ${data.name} <--, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteRequest(`/employee/basic/${data.id}`).then((res) => {
            if (res.code === 200) {
              this.initData()
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
    /**
     * @name:编辑用户
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    editUser (data) {
      this.title = '编辑员工'
      console.log('---编辑员工---')
      console.log(data)
      this.summitInfo = '提交修改'
      this.getBase()
      this.userInfo = data
      this.showTableVisible = true
    },
    /**
     * @name:导出数据
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    exportData () {
      this.downloadRequest('/employee/basic/export')
    },
    /**
     * @name: 导入数据
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    importData () {},
    beforUpload () {
      this.importDataIcon = 'el-icon-loading'
      this.importDataText = '正在导入..'
      this.enabled = true
    },
    // 导入成功
    importDataSuccess () {
      this.importDataIcon = 'fa fa-level-down'
      this.importDataText = '导入数据'
      this.initData()
      this.enabled = false
    },
    // 导入失败
    importDataFalse () {
      this.importDataIcon = 'fa fa-level-down'
      this.importDataText = '导入数据'
      this.enabled = false
    }
  }
}
</script>
<style lang="less" scoped>
.basic {
  margin-left: 20px;
}
.body {
  margin-top: 20px;
}
.footer {
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
