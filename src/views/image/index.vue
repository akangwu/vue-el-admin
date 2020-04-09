<template>
  <div>
    <el-container style="position: absolute; top: 55px;right: 0;bottom: 0; left: 0;">
      <!--头部,先看看有没有flex布局-->
      <el-header class="d-flex align-items-center">
        <div class="d-flex mr-auto">
          <el-select
            v-model="searchForm.order"
            clearable
            placeholder="请选择图片排序方式"
            style="width: 150px"
            class="mr-2"
            size="mini"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input
            v-model="searchForm.keyword"
            style="width:150px"
            class="mr-2"
            size="mini"
            placeholder="输入相册名称"
          ></el-input>
          <el-button type="primary" size="mini">搜索</el-button>
        </div>
        <div>
          <!--<el-button v-if="chooseList.length" type="danger" size="mini" @click="imageDelAll">删除图片</el-button>-->
          <el-button v-if="chooseList.length" type="danger" size="mini" @click="imageDel({all:true})">删除图片</el-button>
          <el-button type="success" size="mini" @click="openAlbumsModel(false)">创建相册</el-button>
          <el-button type="warning" size="mini" @click="uploadModel= true">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
        <!--侧边-->
        <el-aside
          width="200px"
          style="position: absolute;top: 60px;left: 0;bottom: 60px;"
          class="bg-white border-right"
        >
          <ul class="list-group list-group-flush">
            <album-item
              v-for="(item,index) in albums"
              :key="index"
              :item="item"
              :index="index"
              :active="albumsIndex === index"
              @albumsChange="albumsChange"
              @openAlbumsModel="openAlbumsModel"
              @albumsDel="albumsDel"
            ></album-item>
          </ul>
        </el-aside>
        <el-container>
          <!--内容-->
          <el-main style="position: absolute;top: 60px;right: 0;left: 200px;bottom: 60px;">
            <div>
              <el-row :gutter="10">
                <el-col
                  :span="24"
                  :lg="4"
                  :md="6"
                  :sm="8"
                  v-for="(item,index) in imageList"
                  :key="index"
                >
                  <el-card
                    class="box-card mb-3"
                    :body-style="{'padding' : '0'}"
                    shadow="hover"
                    style="position:relative;cursor:pointer;"
                  >
                    <div class="border"
                         :class="{'border-danger': item.isCheck}">
                      <span v-if="item.isCheck" class="badge badge-danger" style="position: absolute;
                      top: 0;right: 0;">{{item.checkOrder}}
                      </span>
                      <img :src="item.url" class="w-100" style="height:100px;" alt @click="choose(item)"/>
                      <div
                        class="w-100 text-white text-center"
                        style="background: rgba(0,0,0,0.3);position:absolute; margin-top: -25px;"
                      >
                        <span class="small">{{item.name}}</span>
                      </div>
                      <div class="p-2 text-center">
                        <el-button-group>
                          <el-button icon="el-icon-view" size="mini" @click="previewImage(item)"></el-button>
                          <el-button icon="el-icon-edit" size="mini" @click="imageEdit(item,index)"></el-button>
                          <el-button icon="el-icon-delete" size="mini" @click="imageDel(index)"></el-button>
                        </el-button-group>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>

    <!--修改｜创建相册 模态框-->
    <el-dialog :title="albumsModelTitle" :visible.sync="albumsModel">
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

    <!--上传图片模态框-->
    <div class="text-center">
      <el-dialog title="上传图片" :visible.sync="uploadModel">
        <!--upload上传-->
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
    </div>

    <!--预览图片模态框-->
    <el-dialog :visible.sync="previewModel" width="60vh">
      <div style="margin: -60px -20px -30px -20px;">
        <img :src="previewUrl" style="width:100%;" alt/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import albumItem from '../../components/image/albums-item'

  export default {
    name: 'index',
    components: {
      albumItem
    },
    data () {
      return {
        searchForm: {
          order: '',
          keyword: ''
        },
        albumsIndex: '',
        albums: [],
        albumsModel: false,
        uploadModel: false,
        albumsForm: {
          name: '',
          order: 0
        },
        albumsEditIndex: -1,
        previewModel: false,
        previewUrl: '',
        imageList: [],
        chooseList: [], //选中的数组
      }
    },
    created () {
      //  初始化数据
      this.__init()
    },
    computed: {
      albumsModelTitle () {
        return this.albumsEditIndex > -1 ? '修改相册' : '创建相册'
      }
    },
    methods: {
      //删除全部相册,这里和删除单个相册做了同样的事情,都有确认窗,所以合并到了一起做了优化
      // imageDelAll() {
      //   let list = this.imageList.filter((img)=>{
      //     return !this.chooseList.some(c=>{
      //       return c.id === img.id
      //     })
      //   })
      //   console.log(list)
      //   this.imageList = list;
      //   this.chooseList = [];
      // },
      //选择图片
      choose (item) {
        // 选中
        if (!item.isCheck) {
          this.chooseList.push({id: item.id, url: item.url})
          console.log(this.chooseList.length)
          //  计算选中的数量
          item.checkOrder = this.chooseList.length
          item.isCheck = !item.isCheck
          return
        }
        //  取消选中
        //  找到在chooseList中的索引,删除
        let i = this.chooseList.findIndex(v => v.id === item.id)
        if (i === -1) {
          return
        } else {
          let length = this.chooseList.length
          //取消选中中间的
          if (i + 1 < length) {
            for (let j = i; j < length; j++) {
              let no = this.imageList.findIndex(v => v.id === this.chooseList[j].id)
              if (no > -1) {
                this.imageList[no].checkOrder--
              }
            }
          }
          this.chooseList.splice(i, 1)
        }
        //  修改状态
        item.isCheck = false
        //  重置序号
        item.checkOrder = 0
      },
      __init () {
        for (let i = 0; i < 20; i++) {
          this.albums.push({
            name: '相册' + i,
            num: Math.floor(Math.random() * 100),
            order: 0
          })
        }
        for (let i = 0; i < 30; i++) {
          this.imageList.push({
            id: i,
            url:
              'https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1587023858&t=20e0c7e7ab6feb70cb3be1b1dca03989',
            name: '图片' + i,
            isCheck: false,
            checkOrder: 0
          })
        }
      },
      // 点击不同相册激活时的状态
      albumsChange (index) {
        this.albumsIndex = index
      },
      //相册删除事件
      albumsDel (index) {
        console.log('aa')
        this.$confirm('是否删除该相册', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.albums.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      },

      // 打开相册修改/创建框
      openAlbumsModel (obj) {
        console.log(obj)
        if (obj) {
          let {item, index} = obj //es6结构赋值
          this.albumsForm.name = item.name
          this.albumsForm.order = item.order
          this.albumsEditIndex = index
          //  打开模态框
          return (this.albumsModel = true)
        }
          // this.albumsModel = true;

        // //  创建相册
        else {
          this.albumsForm = {
            name: '',
            order: 0
          }
          this.albumsEditIndex = -1
        }
        this.albumsModel = true
      },
      //点击确定，修改或者创建相册。如何判断是修改还是创建相册呢？我们这里新增了一个字段，albumsEditIndex=-1，表示修改相册，如果=0，表示创建相册
      confirmAlbumsModel () {
        //>-1表示是修改相册
        if (this.albumsEditIndex > -1) {
          this.albumsEdit()
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
        this.albumsModel = false
      },
      //修改相册
      albumsEdit () {
        this.albums[this.albumsEditIndex].name = this.albumsForm.name
        this.albums[this.albumsEditIndex].order = this.albumsForm.order
      },
      //图片预览
      previewImage (item) {
        this.previewUrl = item.url
        this.previewModel = !this.previewModel
      },
      // 修改图片名称
      imageEdit (item, index) {
        this.$prompt('请输入新名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.name,
          inputValidator (val) {
            if (val === '') {
              return '图片名称不能为空'
            }
          }
        }).then(({value}) => {
          (item.name = value),
            this.$message({
              message: '修改成功',
              type: 'success'
            })
        })
      },
      // 删除当前图片
      imageDel (obj) {
        this.$confirm(obj.all ? '是否删除选中图片' : '是否删除该图片', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (obj.all) {
              let list = this.imageList.filter((img) => {
                return !this.chooseList.some(c => {
                  return c.id === img.id
                })
              })
              this.imageList = list
              this.chooseList = []
            }
            this.imageList.splice(obj.index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(() => {
            this.$message({
              message: '取消删除',
              type: 'fail'
            })
            return
          })
      }
    }
  }
</script>

<style scoped>
</style>