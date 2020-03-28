<template>
  <div>
  <!--数据统计-->
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item,index) in counts" :key="index">
        <el-card shadow="hover">
          <div class="d-flex align-items-center">
            <div>
              <i class="h4 mb-0 text-white mr-3"
                 :class="[item.icon,item.color]"
                 style="width: 40px;height: 40px; text-align: center; line-height: 40px;"></i>
            </div>
            <div>
              <h4 class="mb-1">{{item.num}}</h4>
              <small class="text-muted">{{item.desc}}</small>
            </div>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        counts: [
          {icon: 'el-icon-user-solid ',num: '30',desc: '关注人数(个)',color: 'bg-primary'},
          {icon: 'el-icon-s-finance ',num: '120',desc: '订单总数(笔)',color: 'bg-success'},
          {icon: 'el-icon-s-order ',num: '4183.80',desc: '今日订单总金额(元)',color: 'bg-danger'},
          {icon: 'el-icon-s-data ',num: '100',desc: '本月销量(笔)',color: 'bg-warning'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>