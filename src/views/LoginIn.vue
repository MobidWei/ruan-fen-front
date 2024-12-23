<template>
  <div class="gradient-background">
<!--    <loginLogo />-->
    <div class="Login">
      <div class="Login-head">
        <span>用户登录</span>
      </div>
      <el-form :model="loginForm" ref="loginForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            :show-password="true"
          ></el-input>
          <i @click="togglePasswordVisibility"></i>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goSignUp">注册</el-button>
          <el-button type="primary" @click="handleLoginIn">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // userId : '',
      loginForm: {
        username: '',     //用户名
        password: ''     // 密码
      },
      rules: {
        username : [
          {required : false , trigger : 'blur' , message: '请输入用户名'}
        ],
        password : [
          {required : false , trigger : 'blur' , message: '请输入密码'}
        ]
      },
      passwordVisible: false
    }
  },
  mounted() {
    this.changeIndex('登录');
  },
  methods: {
    handleLoginIn() {
      //let _this = this;
      let params = new URLSearchParams();
      params.append('username', this.loginForm.username);
      params.append('password', this.loginForm.password);
      LoginIn(params)//需要在js文件中实现post
        .then(res => {
          if (res.code === 1) {
            _this.notify('登录成功', 'success');
            _this.$store.commit('setLoginIn' , true);
            _this.$store.commit('setUserId' , res.userId);
            _this.$store.commit('setUsername', res.username);
            _this.$store.commit('setAvatar', res.avatar);
            setTimeout(function () {
              _this.changeIndex('首页');
              _this.$router.push({path: `/`});
            }, 1000);
          } else {
            _this.notify('用户名或密码错误', 'error');
          }
        })
        .catch(err => {
          _this.notify(err, 'error');
        })
    },
    goSignUp() {
      this.changeIndex('注册');
      this.$router.push({path : '/sign-up'});
    },
    changeIndex(value){
      this.$store.commit('setActiveName' , value);
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
};
</script>

<style scoped>
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