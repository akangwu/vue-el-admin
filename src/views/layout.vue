<template>
  <div>
    <el-container style="position: absolute; top:0;right:0;bottom:0;left:0;overflow:hidden">
      <!--头部导航栏，这里和复制的有眼色差别，给一个背景色相同的就可以了-->
      <el-header class="d-flex align-items-center" style="background:#545c64">
        <!--顶部导航栏，直接复制的-->
        <a class="h5 text-light mb-0 mr-auto">{{$conf.logo}}</a>
        <!--激活时的线-->
        <div class="line"></div>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item :index="index|numToString" v-for="(item,index) in navBar.list" :key="index">
            {{item.name}}
          </el-menu-item>

          <el-submenu index="100">
            <template slot="title">
              <el-avatar size="small" style="padding-right: 10px;margin-right: 10px;"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              豆沙小饼干
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%;padding-bottom: 60px">
        <!--侧边布局-->
        <el-aside width="200px">
          <el-menu
            :default-active="slideMenusActive"
            @select="slideSelect">
            <el-menu-item :index="index|numToString" v-for="(item,index) in slideMenus" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <!--主布局-->
        <el-main>
          <li v-for="i in 100" :key="i">{{i}}</li>
        </el-main>
      </el-container>
    </el-container>

    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  import common from '../common/mixins/common.js'

  export default {
    mixins: [common],
    name: 'layout',
    data () {
      return {
        navBar: [] //这个navBar还是需要保留的。不然会报错。我们只需要在created中赋值一下就可以了
      }
    },
    created(){
      //初始化导航栏。这里将navBar放到了common/config/config.js中了。所以需要咋created中配置一下
      this.navBar = this.$conf.navBar;
    },
    computed: {
      slideMenusActive(){
        return this.navBar.list[this.navBar.active].subActive
      },
      // slideMenusActive: {
      //   get() {
      //     return this.navBar.list[this.navBar.active].subActive
      //   },
      //   set(val) {
      //     this.navBar.list[this.navBar.active].subActive = val;
      //   }
      // },
      slideMenus () {
        /*
        * 1.这个计算方法的作用是点击顶部导航栏的数据，侧边栏展示不同的数据。首先需要获取到选择的是哪个数据。使用this.navBar.active来获取。从而获取相应的submenu
        * 2.这个数据获取到了，我们就循环便利slideMenus就可以了。因为返回值是相应的submenu子菜单
        * */
        return this.navBar.list[this.navBar.active].submenu
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
        this.navBar.active = key
      },
      slideSelect (key, keyPath) {
        console.log(key, keyPath)
        this.navBar.list[this.navBar.active].subActive = key;
        // this.slideMenusActive = key
      }
    }

  }
</script>

<style scoped>

</style>