<template>
  <div>
    <el-container style="position: absolute; top: 55px;right: 0;bottom: 0; left: 0;">
      <!--头部,先看看有没有flex布局-->
      <el-header class="d-flex align-items-center">
        <div class="d-flex mr-auto">
          <el-select v-model="value" clearable placeholder="请选择" style="width: 150px" class="mr-2">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="北京"></el-option>
          </el-select>
          <el-input style="width:250px" class="mr-2"></el-input>
          <el-button type="primary" size="small">搜索</el-button>
        </div>
        <div>
          <el-button type="success" size="medium">创建相册</el-button>
          <el-button type="warning" size="medium">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
        <!--侧边-->
        <el-aside width="200px" style="position: absolute;top: 60px;left: 0;bottom: 60px;">
          <div style="height:1000px"></div>
        </el-aside>
        <el-container>
          <!--内容-->
          <el-main  style="position: absolute;top: 60px;right: 0;left: 200px;bottom: 60px;">
            <div style="height:1000px"></div>

          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped>

</style>