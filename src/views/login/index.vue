<template>
  <div>
    <div class="container">
      <div class="row">
        <!--12-->
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
          <div class="card mt-5">
            <!--bootstrap4的头部-->
            <div class="card-header bg-white">
              <h3 class="text-center mb-0">UNI-ADMIN</h3>
            </div>
            <!--这里使用bootstrap4的card-body-->
            <div class="card-body">
              <!--自定义验证规则，el官方就是在el-form里面绑定的rules，所以我们也这样做-->
              <el-form ref="ruleForm" :model="form" :rules="rules">
                <!--用户名输入框-->
                <!--el使用prop来验证，这里是message中的内容-->
                <el-form-item prop="username">
                  <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!--密码输入框-->
                <el-form-item prop="password">
                  <el-input v-model="form.password" size="medium" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <!--按钮-->
                <el-form-item>
                  <el-button type="primary" size="medium" class="w-100" @click="submitForm">立即登陆</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        //form表单数据
        form: {
          username: '',
          password: '',
          name: ''
        },
        //表单验证规则,el官方就叫rules，所以我们照葫芦画瓢即可
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }

      }
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate((e)=> {
          //el-form使用ref，然后点击事件里面通过refs来获取validate方法。e这些是默认的参数，写其他的什么都行，只是为了简单这里写的是e。e如果是true，表示成功，需要跳转到首页，否则不跳转
          // console.log(e);

          if(e) {
            this.$router.push({name: 'index'}); //这里是直接跳转到首页
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>