<script setup lang="ts">
import {computed, nextTick, ref} from "vue"
  import { onMounted, watch } from 'vue'
  import {request} from "@/utils/http/request";
  import * as articles from "../api/works/article"
  import Navbar3 from "@/Components/Navbar.vue"
  import {useRoute} from 'vue-router'
  import {ar} from "element-plus/es/locale";
  import store from "@/store"
  // 侧边栏收起

  const route= useRoute()

  let data=ref()
  let collapsed = ref(false)
  let sideBarButton = ref("收起")
  let title = ref("")
  let author = ref("")
  let authorUrl = ref("")
  let abstract = ref("")
  let keywordsContent = ref("")
  let doi = ref("")
  let references = ref<{num:string,link:string}[]>([])
  let referenceUrls = []
  let field = ref("")
  let publishTime = ref("")
  let views = ref(0)
  let researcherInstitution = ref("")
  let htmlLink = ref("")

  //引用条数
  let refPageNum = ref(0)
  //当前页面的引用
  let refPageList = ref<{num:string,link:string}[]>([])
  let curPage = ref(0)
  //当前所显示的那些页（例如1，2，3...5）中显示1、2、3、5
  let curPageList = ref<number[]>([])

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

  const changePage = (page: number) => {
    curPage.value = page;
    refPageList.value = [];
    for (let i = (curPage.value - 1) * 10; i < ((curPage.value - 1) * 10 + 10) && i < references.value.length; i++) {
      refPageList.value.push(references.value[i]);
    }
  }

  const modifyViews = () => {
    views.value = views.value + 1
  }

  const getUserName = async(userId: number) => {
    const userResponse = await articles.getUserName(userId)
    return userResponse.data.userName
  }

  const initializeArticleContent = async() => {
    let articleId = Number(route.params.id)
    const articleResponse = await articles.getArticle(articleId)
    const data = articleResponse.data
    title.value = data.articleName
    abstract.value = data.abstractText
    keywordsContent.value = data.keywords
    doi.value = data.doi
    if(doi.value!=undefined && doi.value!=""){
      doi.value=doi.value.split("doi.org/")[1]
    }
    else{
      doi.value = "未知"
    }
    field.value = data.fieldOfResearch
    publishTime.value = data.publishTime
    if(publishTime.value!=undefined){
      publishTime.value = publishTime.value.split("T")[0]
    }
    else{
      publishTime.value = "未知"
    }
    views.value = data.views
    // console.log(data.referencedWorks)
    referenceUrls = data.referencedWorks.replace(" ","").split(",")
    if(referenceUrls[0]==""){
      referenceUrls = []
    }
    for (let i = 0; i < referenceUrls.length; i++) {
      references.value.push({
        num: "[" + (i+1) + "]",
        link: referenceUrls[i]
      })
    }
    author.value = data.researcherName
    authorUrl.value = "https://openalex.org/"+data.researcherUrl
    researcherInstitution.value = data.researcherInstitution
    refPageNum.value = references.value.length
    commentNum.value = comments.value.length
    htmlLink.value = doi.value=="未知" ? "https://openalex.org/"+data.url : "https://doi.org/"+doi.value
    // console.log(referenceUrls)
    // const referenceResponse = await articles.getReference(referenceUrls)
    // const referenceData = referenceResponse.data
    // // console.log(referenceResponse)
    // // references.value = referenceResponse
    // console.log(referenceData)
  }

  const getComments = async() => {
    const commentsResponse = await articles.getArticleComments(Number(route.params.id))
    const data = commentsResponse.data
    for (let i = 0; i < data.length; i++) {
      let username = await getUserName(data[i].userId)
      comments.value.push(new Comment(data[i].commentContent, username, data[i].commentTime.replace("T", " ")))
    }
  }

  const handleSubmit = () => {
    articles.postComment(Number(route.params.id), myCommentContent.value, Number(store.state.userId))
  }

  const handleCancel = () => {
    myCommentContent.value = ""
  }

  onMounted(() => {
    // initializeRefPageList();
    curPage.value=1
    // comments.value.push(new Comment("评论1", "作者1", new Date()))
    // comments.value.push(new Comment("评论2", "作者2", new Date()))
    getComments().then(() => {
      initializeArticleContent().then(() => {
        // refPageNum.value = Math.ceil(references.value.length / 10)
        // console.log(refPageNum.value)
        changePage(1)
        changeCommentPage(1)
      })
    })
    articles.addView(Number(route.params.id))
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
              <div class="articleTop">
                <h1 id="title">{{ title }}</h1>
                <h3 id="author">
                  <!--    使用v-for来添加多个作者     -->
                  <a target="_blank" :href="authorUrl">{{ author }}</a>
                </h3>
                <h3 id="institution">
                  <span>{{researcherInstitution}}</span>
                </h3>
              </div>
              <div class="row">
                <span class="rowTitle">摘要：</span>
                <span class="rowContent">{{ abstract }}</span>
              </div>
              <div class="row">
                <span class="rowTitle">关键词：</span>
                <span class="rowContent">{{ keywordsContent }}</span>
              </div>
              <div class="row" v-if="doi!='未知'">
                <span class="rowTitle">DOI：</span>
                <span class="rowContent">{{ doi }}</span>
              </div>
              <div class="row">
                <span class="rowTitle">研究领域</span>
                <span class="rowContent">{{ field }}</span>
              </div>
              <div class="row">
                <span class="rowTitle">发表时间</span>
                <span class="rowContent">{{ publishTime }}</span>
              </div>
              <div class="row">
                <span class="rowTitle">浏览量</span>
                <span class="rowContent">{{ views }}</span>
              </div>
            </div>
            <div class="reference">
              <h3 style="margin: 0 auto">参考文献</h3>
              <div style="display: flex; margin-top: 15px; flex-direction: column; gap: 10px">
                <div v-for="curPageContent in refPageList" :key="curPageContent" style="color: #666; font-size: 14px">
                  {{ curPageContent.num + " " }}
                  <a :href="'https://openalex.org/'+curPageContent.link" target="_blank">{{ curPageContent.link }}</a>
                </div>
                <div style="display: flex; justify-content: center">
                  <el-pagination
                      :current-page="curPage"
                      @current-change="changePage"
                      layout="prev, pager, next"
                      :total="refPageNum">
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class="operate">
              <a target="_blank" :href="htmlLink">查看原文</a>
            </div>
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

  .articleTop{
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