<script setup lang="ts">
import {ref} from "vue"
import { onMounted } from 'vue'
import * as patents from "../api/works/patent"
import {useRoute} from 'vue-router'
import store from "@/store"
// 侧边栏收起

const route= useRoute()


let data=ref()
let collapsed = ref(false)
let sideBarButton = ref("收起")
let title = ref("")
let inventorsName = ref("")
let applicationNumber = ref("")
let publicationNumber = ref("")
let authorizationNumber = ref("")
let abstract = ref("")
let field = ref("")
let applicationDate = ref("")
let publicationDate = ref("")
let authorizationDate = ref("")
let views = ref(0)
let mainClaim = ref("")
let patentType = ref("")
let applicants = ref("")

class Comment{
  constructor(public content: string, public author: string, public time: Date) {
    this.content = content;
    this.author = author;
    this.time = time;
  }
}
//评论部分
let comments = ref<Comment[]>([])
let commentNum = ref(0)
let curPageComment = ref<Comment[]>([])
let curCommentPageNum = ref(0)

let myCommentContent = ref("")

const changeCommentPage = (page: number) => {
  curPageComment.value = [];
  curCommentPageNum.value = page;
  for(let i=(curCommentPageNum.value -1) * 6; i < ((curCommentPageNum.value - 1) * 6 + 6) && i < commentNum.value; i++){
    curPageComment.value.push(comments.value[i])
  }
}

const modifySideState = () => {
  collapsed.value = !(collapsed.value)
  if (collapsed.value){
    sideBarButton.value = "展开"
  }else {
    sideBarButton.value = "收起"
  }
}
const modifyViews = () => {
  views.value = views.value + 1
}

const getUserName = async(userId: number) => {
  const userResponse = await patents.getUserName(userId)
  return userResponse.data.userName
}

const initializePatentContent = async() => {
  let patentId = Number(route.params.id)
  const patentResponse = await patents.getPatent(patentId)
  const data = patentResponse.data
  title.value = data.patentName
  if(data.abstract != null){
    abstract.value = data.abstract
  }else {
    abstract.value = "未知"
  }
  field.value = data.fieldOfResearch
  if (data.publicationDate != null){
    publicationDate.value = data.publicationDate.split("T")[0]
  }
  else {
    publicationDate.value = "未知"
  }
  views.value = data.views
  // console.log(data.referencedWorks)
  inventorsName.value = data.inventorsName
  commentNum.value = comments.value.length
  if (data.publicationNum != null){
    publicationNumber.value = data.publicationNum
  }
  else {
    publicationNumber.value = "未知"
  }
  if(data.applicationNum != null){
    applicationNumber.value = data.applicationNum
  }else {
    applicationNumber.value = "未知"
  }
  if(data.authorizationNum != null){
    authorizationNumber.value = data.authorizationNum
  }else {
    authorizationNumber.value = "未知"
  }
  if (data.mainClaim != null){
    mainClaim.value = data.mainClaim
  }else {
    mainClaim.value = "未知"
  }
  if(data.applicants != "" && data.applicants != null){
    applicants.value = data.applicants
  }else {
    applicants.value = "未知"
  }
  if (data.applicationDate != null){
    applicationDate.value = data.applicationDate.split("T")[0]
  }else {
    applicationDate.value = "未知"
  }
  if (data.authorizationDate != null){
    authorizationDate.value = data.authorizationDate.split("T")[0]
  }else {
    authorizationDate.value = "未知"
  }
  patentType.value = data.patentType
}

const getComments = async() => {
  const commentsResponse = await patents.getPatentComments(Number(route.params.id))
  const data = commentsResponse.data
  for (let i = 0; i < data.length; i++) {
    let username = await getUserName(data[i].userId)
    comments.value.push(new Comment(data[i].commentContent, username, data[i].commentTime.replace("T", " ")))
  }
}

const handleSubmit = () => {
  patents.postComment(Number(route.params.id), myCommentContent.value, Number(store.state.userId))
}

const handleCancel = () => {
  myCommentContent.value = ""
}

onMounted(() => {
  // initializeRefPageList();
  // comments.value.push(new Comment("评论1", "作者1", new Date()))
  // comments.value.push(new Comment("评论2", "作者2", new Date()))
  getComments().then(() => {
    initializePatentContent().then(() => {
      // refPageNum.value = Math.ceil(references.value.length / 10)
      // console.log(refPageNum.value)
      changeCommentPage(1)
    })
  })
  patents.addView(Number(route.params.id))
})

</script>

<template>
  <div id="outermostContainer">
    <!--    <Navbar3 />-->
    <div id="contentContainer">
      <el-container style="border: 1px solid #4B0082;">
        <!--        <el-aside :class="collapsed ? 'hiddenOuterSideBar' : 'outerSideBar'">-->
        <!--          &lt;!&ndash;    控制收起和展开的按钮      &ndash;&gt;-->
        <!--          <el-button @click="modifySideState" :class="collapsed ? 'hiddenSideBarButton' : 'sideBarButton'">{{sideBarButton}}</el-button>-->
        <!--          <h5 style="margin-top: 60px;margin-left: 15px" :class="collapsed ? 'hiddenSideBar' : ''">文章目录</h5>-->
        <!--          <div :class="collapsed ? 'hiddenSideBar' : 'sideBar'">-->
        <!--            &lt;!&ndash;     侧边栏内容     &ndash;&gt;-->
        <!--            <div style="margin-top:10px; margin-left:15px">-->
        <!--              <div>-->
        <!--                以下为目录-->
        <!--              </div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </el-aside>-->

        <el-container style="flex-direction: column">
          <el-main>
            <!--    文章内容     -->
            <div style="display : flex; flex-direction: column; width: 79%; margin : 0 auto">
              <!--    文章标题和作者     -->
              <div class="patentTop">
                <h1 id="title">{{ title }}</h1>
                <h3 id="author">
                  <span>{{ inventorsName }}</span>
                </h3>
              </div>
              <div class="row">
                <span class="rowTitle">专利类型：</span>
                <span class="rowContent">{{ patentType }}</span>
              </div>
              <div class="row" v-if="applicationNumber!='未知'">
                <span class="rowTitle">申请号：</span>
                <span class="rowContent">{{ applicationNumber }}</span>
              </div>
              <div class="row" v-if="authorizationNumber!='未知'">
                <span class="rowTitle">授权号：</span>
                <span class="rowContent">{{ authorizationNumber }}</span>
              </div>
              <div class="row" v-if="publicationNumber!='未知'">
                <span class="rowTitle">公开号：</span>
                <span class="rowContent">{{publicationNumber}}</span>
              </div>
              <div class="row" v-if="applicants!='未知'">
                <span class="rowTitle">申请人：</span>
                <span class="rowContent">{{ applicants }}</span>
              </div>
              <div class="row" v-if="applicationDate!='未知'">
                <span class="rowTitle">申请日：</span>
                <span class="rowContent">{{ applicationDate }}</span>
              </div>
              <div class="row" v-if="authorizationDate!='未知'">
                <span class="rowTitle">授权日：</span>
                <span class="rowContent">{{ authorizationDate }}</span>
              </div>
              <div class="row" v-if="publicationDate!='未知'">
                <span class="rowTitle">公开日：</span>
                <span class="rowContent">{{ publicationDate }}</span>
              </div>
              <div class="row">
                <span class="rowTitle">研究领域</span>
                <span class="rowContent">{{ field }}</span>
              </div>
              <div class="row" v-if="mainClaim!='未知'">
                <span class="rowTitle">主权项：</span>
                <span class="rowContent">{{ mainClaim }}</span>
              </div>
              <div class="row" v-if="abstract!='未知'">
                <span class="rowTitle">摘要：</span>
                <span class="rowContent">{{ abstract }}</span>
              </div>
              <div class="row">
                <span class="rowTitle">浏览量</span>
                <span class="rowContent">{{ views }}</span>
              </div>
            </div>
<!--            <div class="operate">-->
<!--              <a target="_blank" :href="htmlLink">查看原文</a>-->
<!--            </div>-->
          </el-main>
        </el-container>
      </el-container>
      <div class="comment">
        <div class="comment-title">
          <h1>评论</h1>
        </div>

        <div class="comment-content">
          <!-- 循环显示评论 -->
          <div class="comment-item" v-for="comment in curPageComment" :key="comment">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <div class="comment-text">{{ comment.content }}</div>
            <hr />
          </div>
        </div>

        <el-pagination
            :current-page="curCommentPageNum"
            @current-change="changeCommentPage"
            layout="prev, pager, next"
            :total="commentNum"
            style="margin-bottom: 20px">
        </el-pagination>

        <el-form style="display: flex; flex-direction: column; align-content: center; width: 65%; margin-bottom: 20px" :disabled="!store.state.hasLogin">
          <el-input
              style="border-radius: 5px;"
              type="textarea"
              size="large"
              placeholder="请友善评论哦~"
              v-model="myCommentContent"
              @keyup.enter="handleSubmit">
          </el-input>
          <div style="display: flex; flex-direction: row">
            <el-button type="primary" @click="handleSubmit" style="width:50px; margin-right: 10px;margin-top: 10px; background-color: #5D3F6A">发表</el-button>
            <el-button type="primary" @click="handleCancel" style="margin-top: 10px; width:50px; background-color: #5D3F6A">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#outermostContainer {
  display: flex;
//height: 100%;
  justify-content: center;
  overflow: auto;
}

#contentContainer {
//min-height: 100%;
  width: 96%;
}

.outerSideBar {
  display: flex;
  flex-direction: column;
  width: 16%;
  height: 100%;
  position:relative;
  color: #666;
  border-right: 1px solid #e6e6e6;
  background-color: #fafafa;
}

.sideBar {
  overflow-x: hidden;
  overflow-y: auto;
//margin-top: 10px;
//padding-top: 15px;
  width: 100%;
//color: #666;
//border-right: 1px solid #e6e6e6;
//background-color: #fafafa;
  height: 80vh;
  position:sticky;
}

.hiddenOuterSideBar {
  height:0;
  overflow: hidden;
  width: 0;
}

.hiddenSideBar {
  height: 0;
  overflow: hidden;
  width: 0;
}

.sideBarButton {
  position: absolute;
  top: 15px;
  right:0;
  color: #fff;
  background-color: #c8cacd;
}

.hiddenSideBarButton {
  position: absolute;
  top: 15px;
  color: #fff;
  background-color: #c8cacd;
}

#title{
  text-align: center;
}

#author{
  display: flex;
  font-size: 14px;
  justify-content: center;
  gap: 10px;
}

#institution{
  display: flex;
  font-size: 14px;
  justify-content: center;
  gap: 10px;
}

.row{
  float: none;
  min-height: 26px;
  padding-top: 8px;
  font-size: 14px;
  color: #000;
  clear: both;
  text-align: justify;
  text-justify: inter-word;
  display: table;
  width: 100%;
}

.rowTitle{
  display: table-cell;
  vertical-align: top;
  padding-right: 5px;
  line-height: 26px;
  font-weight: bold;
  white-space: nowrap;
  width: 8px;
}

.patentTop{
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.rowContent{
  color: #666;
  line-height: 26px;
  font-weight: normal;
  text-align: justify;
  text-justify: inter-word;
  word-wrap: break-word;
  display: inline-block;
}

.operate{
  border-top: 1px solid #4B0082;
  padding-top: 20px;
  font-size: 28px;
  height: 30px;
  width: 79%;
  display: flex;
  justify-content: center;
  margin: 20px auto 40px;
}

.reference{
  display: flex;
  flex-direction: column;
  width: 79%;
  border-top: 1px solid #4B0082;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
}

.comment{
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border: 1px solid #4B0082;
  align-items: center;
}

.comment-title{
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-bottom: 1px solid #4B0082;
  width: 87%;
}

.comment-content {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment-item {
  margin-bottom: 20px;
  width: 87%;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
}

.comment-author {
  font-weight: bold;
}

.comment-time {
  font-style: italic;
  color: #777;
}

.comment-text {
  margin-top: 10px;
  font-size: 16px;
  color: #555;
}

.comment-pagination {
  margin-top: 20px;
  width: 87%;
  text-align: center;
}

/* 分隔线样式 */
.comment-item hr {
  border: 1px solid #e0e0e0;
  margin-top: 20px;
  margin-bottom: 20px;
}

a {
  color: #5D3F6A;
}


:deep .el-pagination .el-pager li:not(.active):not(.disabled) {
  color: #5D3F6A;
}
</style>