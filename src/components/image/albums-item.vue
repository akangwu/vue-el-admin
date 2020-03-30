<template>
  <div>
    <li
      :class="{'sum-active': active}"
      class="list-group-item list-group-item-action d-flex align-items-center"
      style="cursor: pointer"
      @click.stop="$emit ('albumsChange',index)">
      <span class="mr-auto">{{item.name}}</span>
      <el-dropdown>
                <span class="btn btn-light btn-sm border">
                  {{item.num}} <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.stop.native="$emit('openAlbumsModel',{item,index})">修改</el-dropdown-item>
          <el-dropdown-item @click.stop.native="$emit ('albumsDel',index)">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </div>
</template>

<script>
  export default {
    name: 'albums-item',
    props: {
      active: {
        type: Boolean,
        default: false
      },
      item: Object,
      index: Number
    },
    methods: {
      albumChange (index) {
        this.$emit('change', index)
      }
    }
  }
</script>

<style scoped>
  .sum-active {
    color: #67C23A !important;
    background-color: #F0F9eb !important;
    border-color: #C2E7B0 !important;
  }
</style>