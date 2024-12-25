<template>
  <div>
    <div>
      <header-view></header-view>
      <p class="title">作者信息</p>
    </div>
    <div class="down">
      <div class="content-block">
        <div class="content">
          <div class="doc">
            <div id="duplicated-author">
              <p class="get-author">
                <span style="margin-right: 18px; font-size: 14px; color: #333"
                  >同名作者</span
                >
                <router-link to="/portalClaim"
                  >本人认领自己的成果库</router-link
                >
              </p>
              <ul>
                <li v-for="author in duplicated_authors" :key="author.id">
                  <router-link to="">{{ author.name }}</router-link>
                  <router-link to="">{{ author.institution }}</router-link>
                  <span>{{ author.domain }}</span>
                </li>
              </ul>
            </div>
            <div class="author-info">
              <h1 id="name">帅哥</h1>
              <h3>
                <span>
                  <router-link style="color: #2e86c1" to="">{{
                    author.institution
                  }}</router-link>
                </span>
              </h3>
              <h3>
                <span>
                  {{ author.domain }}
                </span>
              </h3>
            </div>
            <div id="author-article">
              <div class="doc-title">
                <h2>作者文献</h2>
                <h3>
                  <router-link to="">认领门户</router-link
                  >后可管理自己的文献信息
                </h3>
              </div>
              <div class="doc-content">
                <ul>
                  <li v-for="(project, index) in projects" :key="project.id">
                    [{{ index + 1 }}]
                    <router-link>{{ project.name }}</router-link>
                    {{ project.author.join(",") }}
                  </li>
                </ul>
              </div>
            </div>
            <div id="author-patent">
              <div class="doc-title">
                <h2>作者专利</h2>
                <h3>
                  <router-link to="">认领门户</router-link
                  >后可管理自己的专利信息
                </h3>
              </div>
              <div class="doc-content">
                <li v-for="(patent, index) in patents" :key="patent.id">
                  [{{ index + 1 }}]
                  <router-link>{{ patent.name }}</router-link>
                  {{ patent.author.join(",") }}
                </li>
              </div>
            </div>
            <div id="author-project">
              <div class="doc-title">
                <h2>相关科研项目</h2>
              </div>
              <div class="doc-content">
                <li v-for="(patent, index) in patents" :key="patent.id">
                  [{{ index + 1 }}]
                  <router-link>{{ patent.name }}</router-link>
                  {{ patent.author.join(",") }}
                </li>
              </div>
            </div>
            <div id="author-prize">
              <div class="doc-title">
                <h2>获得奖项</h2>
              </div>
              <div class="doc-content">
                <li v-for="(prize, index) in prizes" :key="prize.id">
                  [{{ index + 1 }}] <router-link>{{ prize.name }}</router-link>
                  {{ prize.level }}
                </li>
              </div>
            </div>
            <div id="author-cooperation">
              <div class="doc-title">
                <h2>相关作者</h2>
              </div>
              <div class="doc-content">
                <li v-for="(prize, index) in prizes" :key="prize.id">
                  [{{ index + 1 }}] <router-link>{{ prize.name }}</router-link>
                  {{ prize.level }}
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import header from "@/component/header.vue";
import request from "../utils/http/request.ts";

export default defineComponent({
  components: { "header-view": header },
  setup() {
    const name = "ResearchUser";
    const authorName = "";
    const authorId = 0;
    const duplicated_authors = ref([
      {
        id: 0,
        name: "帅哥",
        institution: "北京医科大学第三附属医院",
        domain: "心血管疾病",
      },
      { id: 1, name: "帅哥", institution: "北医三院", domain: "心血管疾病" },
      { id: 2, name: "帅哥", institution: "北医三院", domain: "心血管疾病" },
      { id: 3, name: "帅哥", institution: "北医三院", domain: "心血管疾病" },
      { id: 4, name: "帅哥", institution: "北医三院", domain: "心血管疾病" },
      { id: 5, name: "帅哥", institution: "北医三院", domain: "心血管疾病" },
    ]);
    const articles = ref([
      { id: 0, name: "三体", author: ["刘慈欣"] },
      { id: 0, name: "三体", author: ["刘慈欣"] },
      { id: 0, name: "三体", author: ["刘慈欣"] },
      { id: 0, name: "三体", author: ["刘慈欣"] },
      { id: 0, name: "三体", author: ["刘慈欣"] },
      { id: 0, name: "三体", author: ["刘慈欣"] },
      { id: 0, name: "三体", author: ["刘慈欣"] },
    ]);
    const patents = ref([
      {
        id: 0,
        name: "棒料锯切自动在线光电控制等重下料的计算机控制方法",
        author: ["李先禄", "吴键", "张志明", "沈蕾芳"],
      },
    ]);
    const projects = ref([
      {
        id: 0,
        name: "多模无线通信光纤分布设备研发及应用",
        author: ["邓泽林", "杨建明", "孙玉静", "吕昕范辉"],
      },
    ]);
    const prices = ref([{ id: 0, name: "国家科技成果", level: "二等奖" }]);
    const author = ref({
      name: "帅哥",
      institution: "北京医科大学第三附属医院",
      domain: "心血管疾病",
    });

    onMounted(() => {
      request({
        url: "/search/researcher",
        method: "get",
        params: {
          name: this.$route.query.name,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      request({
        url: "/search/researcher/doc",
        method: "get",
        params: {
          name: this.$route.query.name,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      request({
        url: "/search/researcher",
        method: "get",
        params: {
          id: this.$route.query.id,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    
    return {
      name,
      duplicated_authors,
      author,
      articles,
      patents,
      projects,
      prices,
      authorName,
      authorId,
    };
  },
});
</script>

<style scoped>
.title {
  margin: 0 auto;
  width: 100%;
  min-width: 1200px;
  box-sizing: border-box;
  padding-left: 2%;
  padding-right: 2%;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  font-weight: bold;
  font-family: "Microsoft yahei", serif;
  background-color: #f9f9f9;
}

.down {
  position: relative;
  width: 100%;
  min-width: 1200px;
  padding: 0 0 50px;
  background-color: #f9f9f9;
}

.content-block {
  display: table;
  position: relative;
  width: 96%;
  min-height: 900px;
  margin: 0 auto;
  font-family: "Microsoft yahei";
  border: 1px solid #e4e4e4;
  background-color: #fff;
  clear: both;
  -webkit-box-shadow: 1px 1px 10px 2px #f9f9f9;
  -moz-box-shadow: 1px 1px 10px 2px #f9f9f9;
  box-shadow: 1px 1px 10px 2px #eee;
}

.content {
  padding-top: 15px;
  background-color: #fff;
  overflow: hidden;
}

.doc {
  min-width: 960px;
  width: 79%;
  margin: 0 auto 30px;
}

.doc h3 {
  line-height: 27px;
  font-size: 14px;
  font-weight: normal;
}

.doc h3 a:hover {
  color: #f60 !important;
}

#duplicated-author {
  float: right;
  max-width: 36%;
  min-width: 340px;
  padding: 2px 22px 8px;
  margin-top: 20px;
  margin-bottom: 24px;
  background-color: #f9f9f9;
}

.get-author {
  line-height: 38px;
  color: #999;
  overflow: hidden;
}

.get-author a {
  font-size: 14px;
  /* font-weight: bold; */
}

.get-author a:hover {
  text-decoration: underline;
  color: #cb4335;
}

#duplicated-author li,
#duplicated-author li a {
  font-size: 14px;
  /* font-weight: bold; */
  color: black;
}

#duplicated-author li {
  margin-bottom: 10px;
}

#duplicated-author li a {
  margin-right: 10px;
  color: #2e86c1;
}

#duplicated-author li a:hover {
  color: #f60;
  text-decoration: underline;
}

#name {
  padding-top: 25px;
  padding-bottom: 15px;
  font-size: 24px;
  color: #333;
  font-weight: normal;
  line-height: 35px;
  vertical-align: middle;
  font-family: "Microsoft yahei";
  word-wrap: break-word;
}

#author-article,
#author-patent,
#author-project,
#author-prize,
#author-cooperation {
  margin-top: 15px;
  clear: both;
  min-height: 200px;
}

.doc-title {
  width: 100%;
  padding-top: 20px;
}

.doc-title h2 {
  font-family: "微软雅黑";
  font-size: 18px;

  height: 32px;
  border-bottom: 2px solid rgba(118, 68, 138, 0.5);
  line-height: 26px;
}

.doc-title a,
.doc-title h3 {
  font-size: 16px;
  color: #717d7e;
  height: 32px;
  line-height: 32px;
}

.doc-title a {
  text-decoration: underline;
  color: #76448a;
}

.doc-content {
  width: 100%;
  padding-top: 25px;
}

.doc-content li {
  line-height: 24px;

  font-size: 16px;
  font-family: "宋体";
}

.doc-content a {
  color: #6c3483;
}

.doc-content a:hover {
  color: #a93226;
  text-decoration: underline;
}
</style>