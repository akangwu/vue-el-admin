<template>
  <div>
    <!--数据统计-->
    <el-row :gutter="20">
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

    <!--店铺、订单提示 ｜ 统计图-->
    <el-row :gutter="20" class="mt-3">
      <!--店铺、订单提示-->
      <el-col :span="12" class="d-flex flex-column" style="height: 370px;justify-content: space-between">
        <!--店铺-->
        <el-card v-for="(tip,ti) in tips" :key="ti" class="box-card" shadow="never">
          <div slot="header">
            <span>{{tip.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{tip.desc}}</el-button>
          </div>
          <div class="row">
            <div :class="tip.list.length | getCol" v-for="(tlist,listi) in tip.list" :key="listi">
              <!--<div class="col-3" v-for="(tlist,listi) in tip.list" :key="listi">-->
              <button class="btn btn-light w-100">
                <h4>{{tlist.value}}</h4>
                <small class="text-muted">{{tlist.name}}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <!--统计图-->
      <el-col :span="12">
        <el-card class="box-card" style="height:370px" shadow="never">
          <div slot="header">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div ref="myChart" style="width: 100%;height:270px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!--销售情况统计 ｜ 单品销售排名-->
    <el-row :gutter="20" class="my-3">
      <!--销售情况统计-->
      <el-col :span="12">
        <el-card class="box-card" style="height: 352px" shadow="never">
          <div slot="header">
            <span>销售统计情况</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>

          <div class="media align-items-center border mt-3"  style="height: 100px">
            <span class=" py-4 px-3 bg-light" style="height: 100%;display: inline-block;line-height: 50px;">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-2"><span class="mr-3">订单量(件)</span>12</div>
              <div class="pl-3 pt-2"><span class="mr-3 pt-1">订单金额(元)</span>12</div>
            </div>

          </div>


          <div class="media align-items-center border mt-3"  style="height: 100px">
            <span class=" py-4 px-3 bg-light" style="height: 100%;display: inline-block;line-height: 50px;">本月销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-2"><span class="mr-3">订单量(件)</span>12</div>
              <div class="pl-3 pt-2"><span class="mr-3">订单金额(元)</span>12</div>
            </div>

          </div>
        </el-card>
      </el-col>


      <!--单品销售排名-->
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>


          <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="#"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品信息">
            </el-table-column>
            <el-table-column
              prop="num"
              label="销量"
              width="80">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'index',
    data () {
      return {
        tableData: [
          {name: '小天鹅滚筒洗衣机',num: '9'},
          {name: '小天鹅滚筒洗衣机',num: '9'},
          {name: '小天鹅滚筒洗衣机',num: '9'},
          {name: '小天鹅滚筒洗衣机',num: '9'},
          {name: '小天鹅滚筒洗衣机',num: '9'},
          {name: '小天鹅滚筒洗衣机',num: '9'},
        ],
        counts: [
          {icon: 'el-icon-user-solid ', num: '30', desc: '关注人数(个)', color: 'bg-primary'},
          {icon: 'el-icon-s-finance ', num: '120', desc: '订单总数(笔)', color: 'bg-success'},
          {icon: 'el-icon-s-order ', num: '4183.80', desc: '今日订单总金额(元)', color: 'bg-danger'},
          {icon: 'el-icon-s-data ', num: '100', desc: '本月销量(笔)', color: 'bg-warning'}
        ],
        tips: [
          {
            title: '店铺及商品提示',
            desc: '需要关注的店铺信息及待处理事项',
            list: [
              {name: '出售中', value: '64'},
              {name: '待回复', value: '10'},
              {name: '库存预警', value: '0'},
              {name: '仓库中', value: '3'}
            ]
          },
          {
            title: '交易提示',
            desc: '您需要立即处理的交易订单',
            list: [
              {name: '待付款', value: '0'},
              {name: '待发货', value: '10'},
              {name: '已发货', value: '0'},
              {name: '已收货', value: '3'},
              {name: '退款中', value: '3'},
              {name: '待售后', value: '3'}
            ]
          }
        ],

      }
    },
    mounted () {
      //  画统计图
      this.drawLine()
    },
    filters: {
      getCol (total) {
        return `col-${12 / total}`
      }
    },
    methods: {
      drawLine () {
        //可以通过$refs来获取DOM元素
        console.log(this.$refs.myChart)
        //初始图表信息
        let myChart = echarts.init(this.$refs.myChart)
        //设置图表数据
        myChart.setOption({
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {},
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>