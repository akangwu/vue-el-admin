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
      <el-container style="height: 100%;">
        <!--侧边布局-->
        <el-aside width="200px">
          <el-menu
            :default-active="slideMenusActive"
            style="height: 100%;"
            @select="slideSelect">
            <el-menu-item :index="index|numToString" v-for="(item,index) in slideMenus" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <!--主布局-->
        <el-main>
          <!--面包屑导航-->
          <div v-if="bran.length>0 " class="border-bottom" style="padding: 20px; margin:-20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item,index) in bran"
                :key="index"
                :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
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
        navBar: [], //这个navBar还是需要保留的。不然会报错。我们只需要在created中赋值一下就可以了
        bran: [] //用来存放面包屑导航的
      }
    },
    created(){
      //初始化导航栏。这里将navBar放到了common/config/config.js中了。所以需要咋created中配置一下
      this.navBar = this.$conf.navBar;
      this.getRouterBran();
    },
    watch: {
      $route(to,from) {
        console.log(to);
        console.log(from);
        this.getRouterBran();
      }
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
      //获取面包屑导航
      getRouterBran() {
        console.log(this.$route.matched);
        // 记住！！每个路由都有一个$route属性。其中matched存放的是path等信息。
        // 过滤一下数据，返回有name值的路由
        let b = this.$route.matched.filter((v)=>{
          return v.name
        })
        console.log(b,'b')
        let arr =[];
        //定义变量arr，将name和path增加到arr中。
        b.forEach((v,k)=> {
          //过滤掉b中的name是index和layout中的值。因为这两个都是不显示的。
          if (v.name === 'index' || v.name ==='layout') return
          //arr.push可以增加一个对象
          arr.push({
            name: v.name,
            path: v.path,
            title: v.meta.title
          })
        })
        console.log(arr);
      //
        if(arr.length> 0) {
          arr.unshift({name: 'index',path: 'index',title: '后台首页'})
        }
        this.bran= arr;
        console.log(this.bran);
      },
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