<!--
 * @Description:操作员管理
 * @Author: longxq
 * @Date: 2022-02-26 22:42:45
 * @LastEditTime: 2022-03-03 23:31:46
 * @LastEditors: longxq
 * @Reference:
-->
<template>
  <div class="main">
    <header style="display: flex; justify-content: center; width: 100%">
      <div class="search">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="通过用户名搜索用户..."
          v-model="keywords"
        ></el-input>
        <el-button type="primary" @click="doSearch"> 搜索</el-button>
      </div>
    </header>
    <body class="body">
      <div class="content">
        <el-card class="box-card" v-for="item in users" :key="item.id">
          <div slot="header" class="clearfix">
            <span>{{ item.name }}</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              ><i
                class="el-icon-delete"
                style="color: red"
                @click="deleteUser(item)"
              ></i
            ></el-button>
          </div>
          <div class="cardBar">
            <div class="logo">
              <img class="logoUser" :src="item.userFace" />
            </div>
            <div class="userInfo">
              <p>用户名: {{ item.name }}</p>
              <p>手机号: {{ item.phone }}</p>
              <p>座机号: {{ item.telephone }}</p>
              <p>地址: {{ item.address }}</p>
              <p>
                用户状态:
                <el-switch
                  v-model="item.enabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeStatus(item)"
                >
                </el-switch>
              </p>
              <p>
                用户角色:
                <span
                  class="tagStyle"
                  v-for="role in item.roles"
                  :key="role.index"
                  >{{ role.nameZh }}</span
                >
              </p>
              <p>备注:{{ item.remark }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </body>
  </div>
</template>
<script>
export default {
  data () {
    return {
      users: [],
      keywords: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * @name:获取所有用户信息
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    getData () {
      this.getRequest('/system/admin/?keywords=' + this.keywords).then(
        (res) => {
          if (res) {
            console.log('获取到的res值')
            console.log(res)
            this.users = res
          }
        }
      )
    },
    /**
     * @name:删除用户
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    deleteUser (data) {
      this.$confirm(
        '是否删除该【' + data.name + '】操作员, 是否继续?',
        '删除操作员',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteRequest('/system/admin/' + data.id).then((res) => {
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
    /**
     * @name:实现搜索功能
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    doSearch () {
      this.getData()
    },
    /**
     * @name:更新操作员是否启用状态
     * @test:
     * @msg:
     * @param {*}
     * @return {*}
     */
    changeStatus (data) {
      this.putRequest('/system/admin/', data).then((res) => {
        if (res.code === 200) {
          return true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  margin: 0 20px;
}
.search {
  display: flex;
  width: 70%;
  .el-input {
    margin: 0 10px 0 0;
  }
}
.body {
  display: flex;
}
.content {
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.el-card {
  min-width: 400px;
  width: 25%;
  margin: 10px;
}
.cardBar {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
.logo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  background: greenyellow;
  display: flex;
  justify-content: center;
  align-items: center;
  .logoUser {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 200px;
  font-size: 12px;
}
.tagStyle {
  margin: 0 5px;
  font-size: 14px;
  background: greenyellow;
}
</style>
