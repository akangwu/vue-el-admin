<template>
  <div>
    <el-container style="position: absolute; top:0;right:0;bottom:0;left:0;overflow:hidden">
<!--      头部导航栏，这里和复制的有眼色差别，给一个背景色相同的就可以了-->
      <el-header class="d-flex align-items-center" style="background:#545c64">
<!--        顶部导航栏，直接复制的-->
        <a class="h5 text-light mb-0 mr-auto">UNI-ADMIN</a>
        <div class="line"></div>
        <el-menu
          :default-active="navBarIndex"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">商品</el-menu-item>
          <el-menu-item index="3">订单</el-menu-item>
          <el-menu-item index="4">会员</el-menu-item>
          <el-menu-item index="5">设置</el-menu-item>

          <el-submenu index="100">
            <template slot="title">
              <el-avatar size="small" style="padding-right: 10px;margin-right: 10px;"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>豆沙小饼干
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%;padding-bottom: 60px">
<!--        侧边布局-->
        <el-aside width="200px">
          <li v-for="i in 100" :key="i">{{i}}</li>
        </el-aside>
<!--        主布局-->
        <el-main>
          <li v-for="i in 100" :key="i">{{i}}</li>
        </el-main>
      </el-container>
    </el-container>

<!--    <router-view></router-view>-->
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data() {
      return {
        navBarIndex: '1',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }

  }
</script>

<style scoped>

</style>