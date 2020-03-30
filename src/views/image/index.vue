<template>
  <div>
    <el-container style="position: absolute; top: 55px;right: 0;bottom: 0; left: 0;">
      <!--头部,先看看有没有flex布局-->
      <el-header class="d-flex align-items-center">
        <div class="d-flex mr-auto">
          <el-select v-model="searchForm.order" clearable placeholder="请选择图片排序方式" style="width: 150px" class="mr-2"
                     size="mini">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input v-model="searchForm.keyword" style="width:150px" class="mr-2" size="mini"
                    placeholder="输入相册名称"></el-input>
          <el-button type="primary" size="mini">搜索</el-button>
        </div>
        <div>
          <el-button type="success" size="mini" @click="openAlbumsModel(false)">创建相册</el-button>
          <el-button type="warning" size="mini">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
        <!--侧边-->
        <el-aside width="200px" style="position: absolute;top: 60px;left: 0;bottom: 60px;"
                  class="bg-white border-right">
          <ul class="list-group list-group-flush">
            <li v-for="(item,index) in albums" :key="index"
                :class="{'sum-active': albumsIndex === index}"
                class="list-group-item list-group-item-action d-flex align-items-center"
                style="cursor: pointer"
                @click.stop="albumsChange(index)">
              <span class="mr-auto">{{item.name}}</span>
              <el-dropdown>
                <span class="btn btn-light btn-sm border">
                  {{item.num}} <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.stop.native="openAlbumsModel({item,index})">修改</el-dropdown-item>
                  <el-dropdown-item @click.stop.native="albumsDel(index)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>
        <el-container>
          <!--内容-->
          <el-main style="position: absolute;top: 60px;right: 0;left: 200px;bottom: 60px;">
            <div style="height:1000px"></div>

          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>

    </el-container>

  <!--修改｜创建相册-->
    <el-dialog title="修改相册" :visible.sync="albumsModel">
      <el-form :model="albumsForm">
        <el-form-item label="相册名称">
          <el-input v-model="albumsForm.name" size="medium" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumsForm.order" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumsModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumsModel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        searchForm: {
          order: '',
          keyword: ''
        },
        albumsIndex: '',
        albums: [],
        albumsModel: false,
        albumsForm: {
          name: '',
          order: 0
        },
        albumsEditIndex: -1
      }
    },
    created () {
      //  初始化数据
      this.__init()
    },
    methods: {
      __init () {
        for (let i = 0; i < 20; i++) {
          this.albums.push({
            name: '相册' + i,
            num: Math.floor(Math.random() * 100),
            order: 0
          })
        }
      },
      // 点击不同相册激活时的状态
      albumsChange (index) {
        this.albumsIndex = index
      },
      //相册删除事件
      albumsDel(index) {
        console.log('aa')
        this.$confirm('是否删除该相册', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.albums.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

    // 打开相册修改/创建框
      openAlbumsModel(obj) {
        console.log(obj)
        if(obj) {
          let {item,index} = obj; //es6结构赋值
          this.albumsForm.name=item.name;
          this.albumsForm.order=item.order;
          this.albumsEditIndex = index;
        //  打开模态框
          return this.albumsModel = true;
        }
        // this.albumsModel = true;

        // //  创建相册
        else {
          this.albumsForm = {
            name: '',
            order: 0
          }
          this.albumsEditIndex = -1;
        }
        this.albumsModel = true;
      },
      //点击确定，修改或者创建相册。如何判断是修改还是创建相册呢？我们这里新增了一个字段，albumsEditIndex=-1，表示修改相册，如果=0，表示创建相册
      confirmAlbumsModel() {
        //>-1表示是修改相册
        if(this.albumsEditIndex > -1) {
          this.albumsEdit();
          // return this.albumsModel = false;
        }
        // this.albumsModel = false;
      //  增加新的相册，就需要追加albums
        else {
          this.albums.unshift({
            name: this.albumsForm.name,
            order: this.albumsForm.order,
            num: 0
          })
        }
        this.albumsModel = false;
      },
      //修改相册
      albumsEdit() {
        this.albums[this.albumsEditIndex].name=this.albumsForm.name;
        this.albums[this.albumsEditIndex].order=this.albumsForm.order;
      }
    }
  }
</script>

<style scoped>
  .sum-active {
    color: #67C23A !important;
    background-color: #F0F9eb!important;
    border-color: #C2E7B0!important;
  }
</style>