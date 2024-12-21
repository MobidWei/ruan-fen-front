<template>
  <div class="header">
      <div class="header_content">
          <router-link to="/" class="header-tag">
            <img src="../assets/logo-无背景.png" alt="" id="tag">
          </router-link>
          <div class="home-page">
            <router-link to="/" class="title">首页</router-link>
          </div>
          <div class="index">
            <div class="index-block">
              <router-link to="" class="index-block-content">检索</router-link>
            </div>
            <div class="index-block">
              <router-link to="" class="index-block-content">我的消息</router-link>
            </div>
          </div>
          <div class="right">
            <div class="person">
              <div class="help-block">
                <div class="help-content iconfont"
                @mouseenter="hovered = true"
                @mouseleave="hovered = false"
                :class="{ 'icon-bangzhu1': hovered, 'icon-icon--help': !hovered }"></div>
              </div>
              <div class="login">
                <button class="login-button">个人登录</button>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script lang="ts">
import {ref} from 'vue'
const hovered = ref(false);
export default{
  name: 'headerView',
}
</script>


<style scoped>
.header {
  width: 100%;
  display: block;

  border-top: 5px solid #004fd9;
  box-shadow: 0px 1px 1px rgba(128,128,128,0.3);
  /* background-color: gray; */
}

.header_content {
  width: 96%;
  position: relative;
  margin: 0 auto;
}

.header-tag {
  display: inline-block;
  margin-top: 10px;
  width: 124px;
}

#tag{
  width: 100%;
  object-fit: fill;
}

.home-page {
  position: relative;
  display: inline-block;
  
  margin-left: 17px;
  padding-left: 17px;
  padding-right: 37px;

  vertical-align: top;
  font-size: 0;
  color: #000;
}

.home-page::before, .index-block::before{
  content: '';
  position: absolute;
  right: -1px;
  top: 18px;
  width: 1px;
  height: 25px;
  background: #c9ddff;
}

.home-page .title {
  height: 62px;
  line-height: 62px;
  font-size: 16px;
  font-weight: bold;
  font-family: 'MicrosoftYaHei-Bold';
  color: rgb(80, 102, 151);
}

.home-page .title:hover {
  cursor: pointer;
  color: #CC3333;
}

.index {
  position: absolute;
  top: 0;
  right: 300px;
  display: inline-block;
}

.index-block {
  position: relative;
  display: inline-block;
}

.index-block-content {
  width: 120px;
  height: 62px;
  line-height: 62px;

  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  color: #004fd9;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
}

.right{
  position: absolute;
  right: 0;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
}

.person {
  display: inline-block;
  margin-left: 90px;
  line-height: 62px;
  vertical-align: top;
}

.help-block {
  height: 62px;
  line-height: 62px;
  cursor: default;

  position: relative;
  display: inline-block;
  padding-left: 8px;
  padding-right: 8px;
  color: #5a5a5a;
  font-size: 12px;
  cursor: pointer;
  z-index: 1;
  vertical-align: top;
}

.help-content {
  display: inline-block;
  /* margin-top: 21px; */
  width: 20px;
  height: 22px;
  
}

.iconfont .icon-icon--help, .iconfont .icon-bangzhu1 {
  font-size: 24px;
  color: black;
}

.login{
  display: inline-block;
  height: 62px;
  line-height: 62px;
}

.login-button{
  width: 70px;
  height: 30px;
  margin-top: 15px;

  border: 1px solid #004fd9;
  border-radius: 8px;
  background: #D6EAF8;

  font-family: "微软雅黑";
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: #004fd9;
}

.login-button:hover{
  cursor: pointer;
  background: #004fd9;
  color: white;
}

</style>