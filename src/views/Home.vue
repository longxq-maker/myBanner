<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="title">
          <i class="fa fa-quora" aria-hidden="true" style="color: #caff70"></i>
          企业办公系统
        </div>
        <!--- 用户信息 --->
        <el-dropdown class="userStyle" @command="handleCommand">
          <span class="el-dropdown-link">
            <img :src="user.userFace" />
          </span>
          <el-dropdown-menu slot="dropdown" class="logoMenu">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="Setting">设置</el-dropdown-item>
            <el-dropdown-item command="Logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in this.routes"
              :key="index"
              v-if="!item.hidden"
            >
              <template slot="title"
                ><i
                  :class="item.iconCls"
                  style="color: #00c5cd; margin-right: 5px"
                ></i
                ><span>{{ item.name }}</span></template
              >
              <el-menu-item
                :index="children.path"
                v-for="(children, index) in item.children"
                :key="index"
                >{{ children.name }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/" v-if="this.$route.path !== '/home'">
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              ><a href="/emp/basic">基本资料</a></el-breadcrumb-item
            >
          </el-breadcrumb>
          <div class="bgStyle" v-if="this.$route.path === '/home'">
            <img
              src="../assets/img/welcome.gif"
              class="welcomePic"
              alt="welcome"
            />
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data () {
    return {
      // iconColor: ['#00C5CD', '#7FFFD4', '#54FF9F', '#00FF00', '#CAFF70'],
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      const res = JSON.parse(window.sessionStorage.getItem('user'))
      console.log(res.userFace)
      console.log('---$router---')
      console.log(this.$router)
    },
    handleCommand (command) {
      if (command === 'Logout') {
        console.log('退出登录')
        this.postRequest('/logout')
        window.sessionStorage.removeItem('tokenStr')
        window.sessionStorage.removeItem('user')
        this.$router.replace('/')
      } else if (command === 'Setting') {
        console.log('设置')
      } else if (command === 'userInfo') {
        console.log('用户信息设置')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #00bfff;
  text-align: left;
  line-height: 60px;
}
.title {
  color: #333;
  font-family: '楷体', 'Arial Narrow', Arial, sans-serif;
  font-size: 30px;
}
.userStyle {
  position: absolute;
  right: 20px;
  height: 50px;
  top: 4px;
  cursor: pointer;
  .el-dropdown-link img {
    background: #00ffff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
  }
}
.logoMenu {
  position: absolute;
  top: 0;
}
// 欢迎页面图片
.bgStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff4b9;
}
.welcomePic {
  width: 40%;
  display: block;
  margin-top: 30px;
}
.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-container {
  background: #fff;
  color: #ccc;
  text-align: center;
  line-height: 100%;
}
.el-main {
  padding: 0;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
