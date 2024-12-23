<template>
    <div class="gradient-background">
    <!--  <loginLogo />-->
      <div class="signUp">
        <div class="signUp-head">
          <span>用户注册</span>
        </div>
        <el-form :model="registerForm" ref="registerForm" label-width="80px" class="demo-ruleForm" :rules="rules">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="昵称">
            <el-input v-model="registerForm.name" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="密码"
              :show-password="true"
            ></el-input>
            <i @click="togglePasswordVisibility"></i>
          </el-form-item>
          <el-form-item prop="duplicatePassword" label="重复密码">
            <el-input type="password" v-model="duplicatePassword" placeholder="重复密码"></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button @click="goback(-1)">取消</el-button>
            <el-button type="primary" @click="SignUp">确定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name : 'sign-up',
    mixins : [mixin],
    components: {
      loginLogo
    },
    data(){
      return  {
        isDisable: false,
        codeLoading: false,
        registerForm: {
          username: '',     //用户名
          name: '',         // 昵称
          password: '',     // 密码
          sex: '',          // 性别
          email: '',        // 邮箱
          introduction: '',    //签名
          location: ''      // 地区
        },
        duplicatePassword : '', // 重复密码
        cities: [],     // 所有的地区 -- 省
        rules: {},   // 表单提交的规则
        passwordVisible: false
      }
    },
    created() {
      this.rules = rules;
      this.cities = cities;
    },
    methods: {
      SignUp(){
        if(this.registerForm.password !== this.duplicatePassword){
          this.notify('两次输入密码不一致','error');
          return;
        }
        let _this = this;
        let d = this.registerForm.birth
        let datetime
        if (d) {
          datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        }
        let params = new URLSearchParams();
        params.append('username',this.registerForm.username);
        params.append('name',this.registerForm.name);
        params.append('password',this.registerForm.password);
        params.append('email',this.registerForm.email);
        params.append('introduction',this.registerForm.introduction);
        params.append('location',this.registerForm.location);
        params.append('profilePicture','/img/Pic/default_avatar.jpg');
        SignUp(params)
          .then(res => {
            if(res.code === 1){
              _this.notify('注册成功', 'success');
              setTimeout(function (){
                _this.changeIndex('登录');
                _this.$router.push({path : `/login-in`});
              }, 2000);
            }
            else{
              _this.notify(`注册失败:${res.msg}`, 'error');
            }
          })
          .catch(err => {
            _this.notify('注册失败', 'error');
          })
      },
    }
  }
  </script>
  
  <style lang="scss" scoped>
 .Login {
  position: absolute;
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  background: linear-gradient(-45deg, #e3f6ec, #a3d8f4, #e3f6ec, #a3d8f4);
  background-size: 400% 400%;
  border-radius: 10px;
  width: 450px;
  opacity: 1.0;
  margin: 0; /* 清除原有的外边距 */
  padding: 30px 30px;
  transform: translate(-50%, -50%); /* 使用CSS的transform属性来调整位置 */
  animation: Animation 10s ease infinite;

  .Login-head {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    color: black; /* 设置文字颜色为黑色 */
  }
  .login-btn {
    @include layout(space-between);
    button {
      display: block;
      width: 50%;
    }
  }
  .code-input-group {
    position: relative;
  }

  .input-with-button {
    position: absolute;
    /* 具体位置视情况而定 */
    top: 2px;
    right: 0;
  }

}
@keyframes Animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.gradient-background {
  /* 设置元素的背景为冷色调的径向渐变 */
  background: linear-gradient(-45deg, rgb(242, 225, 218),rgb(71, 198, 192), #a3d8f4, #23d5ab);
  background-size: 400% 400%;
  opacity: 0.8;
  animation: gradientAnimation 15s ease infinite;
  /* 确保渐变背景覆盖整个元素 */
  min-height: 100vh; /* 使用视口高度的100% */
  /* 使元素中的文本可读 */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* 其他样式 */
  color: white; /* 文本颜色为白色，以确保在冷色调背景上可读 */
  padding: 20px;
}
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
    opacity: 0.8;
  }
  50% {
    background-position: 100% 50%;
    opacity: 0.8;
  }
  100% {
    background-position: 0% 50%;
    opacity: 0.8;
  }
}
  </style>
  