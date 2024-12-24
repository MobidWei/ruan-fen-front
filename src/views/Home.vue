<template>
  <div class="page-background">
    <el-dialog v-model="dialogVisible" title="Tips" width="500">
      <span>{{ log_message }}</span>
      <template #footer>
      </template>
    </el-dialog>
    <!--  导航栏-->
    <Nav_bar></Nav_bar>
    <div class="" style="width: 100%; height: 150px; padding-top: 50px;">
      <div style="margin: 0 auto; width: fit-content;">
        <img src="../assets/logo-无背景.png" alt="" style="height: 70px">
      </div>
    </div>
    <div class="container text-center">
      <div class="row">
        <div class="col-md-1 "></div>
        <div class="col-md-10 ">
          <div class="container">
            <div class="row"
                 style="border: 1px solid rgba(128, 128, 128, 0.4); border-radius: 10px; margin-bottom: 40px; padding-bottom: 30px; padding-left: 10px; padding-right: 20px;">
              <div class="col-1" style="padding: 5px 0">
                <button class="btn btn-outline-light" type="button" style="width: 100%; min-height: 80px; color: black;"
                        data-bs-toggle="dropdown" aria-expanded="false">
                  {{ search_setting.types[search_setting.type].value }}
                  <br>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       class="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>

                </button>
                <ul class="dropdown-menu" style="max-height: 400px;">
                  <li v-for="(item,index) in search_setting.types" :key="index">
                    <button class="dropdown-item" :class="index===search_setting.type?'active':''"
                            @click="change_type(index)">{{ item.value }}
                    </button>
                  </li>
                </ul>
              </div>
              <div class="col-11" style="padding: 5px">
                <div class="container">
                  <div class="row">
                    <button type="button" class="btn header-card"
                            :class="search_setting.mode===0?'btn-outline-dark':'btn-light'" @click="change_mode(0)">普通检索
                    </button>
                    <router-link to='AdvancedSearch' style="width: fit-content; line-height: 40px;">点击前往高级检索
                    </router-link>
                  </div>
                </div>
                <div class="input-group input-group-md">
                  <el-autocomplete
                      v-model="search_setting.content"
                      :fetch-suggestions="get_history"
                      clearable
                      class="form-control search-input"
                      style="border-top-left-radius: 0; border-top: 0"
                      placeholder="请输入查询"
                      @keyup.enter="search"
                  />
                  <button type="button" class="btn btn-success input-group-text inputGroup-sizing-lg " id="basic-addon1"
                          style="border-top-right-radius: 0"
                          @click="search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-search"
                         viewBox="0 0 16 16">
                      <path
                          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </button>
                </div>
                <!-- <div style="width: 100%; align-items: center">
                  <button class="btn btn-outline-primary" type="button" style="margin: 20px" @click="select_all">全选
                  </button>
                  <div class="form-check form-switch form-check-inline" v-for="(item,index) in search_setting.choices"
                       :key="index">
                    <input class="form-check-input" type="checkbox" role="switch" :id="'flexSwitchCheck'+index"
                           v-model="item.choose" @change="save_choices">
                    <label class="form-check-label" :for="'flexSwitchCheck'+index">{{ item.name }}</label>
                  </div>
                </div> -->

              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1 "></div>
      </div>
    </div>
    <div class="container text-center">
      <div class="row" style="margin-top: 20px">
        <div class="col12">
          <div class="card" style="background-color: #f6f9feaf;height: 100%">
            <h5 class="card-header">热文速递</h5>
            <div class="card-body" style="height: 100%">
              <el-space style="width: 100%" fill>
                <el-skeleton style="display: flex; gap: 8px" :loading="loading_new_articles" animated :count="4">
                  <template #template>
                    <div style="flex: 1">
                      <el-skeleton-item variant="image" style="height: 240px"/>
                      <div style="padding: 14px">
                        <el-skeleton-item variant="h3" style="width: 50%"/>
                        <div
                            style="display: flex;align-items: center;justify-items: center;margin-top: 16px;height: 16px;">
                          <el-skeleton-item variant="text" style="margin-right: 16px"/>
                          <el-skeleton-item variant="text" style="width: 30%"/>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #default>
                    <el-card v-for="(item,index) in new_article_list.slice(0,4)" :key="index"
                             :body-style="{ padding: '10px'}"
                             class="card-hover cus-card">
                      <a :href="item.url" style="text-decoration: none;color: black">
                        <img :src="item.cover_image_url" class="image multi-content" style="width: 252px;height: 162px" alt=""/>
                        <div style="padding: 14px">
                          <div style="margin-bottom: 10px;height: 150px">{{ item.title }}</div>
                          <div class="bottom card-header" style="margin-top: 5px">
                            {{ item.type === 0 ? "论文" : "专利" }}
                          </div>
                        </div>
                      </a>

                    </el-card>
                  </template>
                </el-skeleton>
                <el-skeleton style="display: flex; gap: 8px" :loading="loading_new_articles" animated :count="4">
                  <template #template>
                    <div style="flex: 1">
                      <el-skeleton-item variant="image" style="height: 240px"/>
                      <div style="padding: 14px">
                        <el-skeleton-item variant="h3" style="width: 50%"/>
                        <div
                            style="display: flex;align-items: center;justify-items: center;margin-top: 16px;height: 16px;">
                          <el-skeleton-item variant="text" style="margin-right: 16px"/>
                          <el-skeleton-item variant="text" style="width: 30%"/>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #default>
                    <el-card v-for="(item,index) in new_article_list.slice(4,8)" :key="index"
                             :body-style="{ padding: '10px'}"
                             class="card-hover cus-card">
                      <a :href="item.url" style="text-decoration: none;color: black">
                        <img :src="item.cover_image_url" class="image multi-content" style="width: 252px;height: 162px" alt=""/>
                        <div style="padding: 14px">
                          <div style="margin-bottom: 10px;height: 150px">{{ item.title }}</div>
                          <div class="bottom card-header" style="margin-top: 5px">
                            {{ item.type === 0 ? "论文" : "专利" }}
                          </div>
                        </div>
                      </a>

                    </el-card>
                  </template>
                </el-skeleton>
              </el-space>
            </div>
          </div>

        </div>
      </div>

    </div>
    <div class="container text-center">

      <div class="row">
        <!-- <div class="card" style="width: 100%;background-color: #ffffff;margin: 10px 0">
          <div class="card-body">
            <div style="display: flex;align-items: center; justify-content: left">
              <svg style="margin-right: 10px" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                   fill="currentColor" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
              常用服务
            </div>
            <div class="row" style="margin-top: 20px">
              <div class="col-4" v-for="(item, index) in useful_service" :key="index">
                <a class="card" :href="item.link" style="text-decoration: none; color: black">
                  <div class="card-body">
                    {{ item.message }}
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div> -->

        <div class="col-12 " style="margin-top: 20px">
          <div class="card" style="background-color: #f6f9feaf;height: 100%">
            <h5 class="card-header">最新文章</h5>
            <div class="card-body" style="height: 100%">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">标题</th>
                  <th scope="col">领域</th>
                  <th scope="col">发表时间</th>
                </tr>
                </thead>
                <tbody v-if="!loading_hot_articles">
                <tr v-for="(item, index) in download_list" :key="index">
                  <td><span v-if="item.index === 1" style="color: goldenrod">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-1-square-fill" viewBox="0 0 16 16">
                      <path
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm7.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/>
                      </svg>
                    </span>
                    <span v-else-if="item.index === 2" style="color: silver">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-2-square-fill" viewBox="0 0 16 16">
  <path
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z"/>
</svg>
                    </span>
                    <span v-else-if="item.index === 3" style="color: sandybrown">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-3-square-fill"
                           viewBox="0 0 16 16">
  <path
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm5.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z"/>
                        </svg>
                    </span>
                    <span v-else>
                      {{ item.index }}
                    </span></td>
                  <td style="max-width: 500px"><a :href="item.link" style="text-decoration: none;" class="blue-hover">
                    {{ item.title }}
                  </a></td>
                  <td style="max-width: 200px" class="blue-hover" @click="search_word(item.belong)">{{ item.belong }}</td>
                  <td >{{ item.time }}</td>
                </tr>
                </tbody>
                <tbody v-else-if="load_hot_article_error">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
                <tr>
                  加载失败...
                </tr>
                </tbody>
                <tbody v-else>
                <tr class="spinner-grow text-info" role="status">
                </tr>
                <tr>
                  加载中...
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-12 " style="margin-top: 20px">
          <div class="card" style="background-color: #f6f9feaf;height: 100%">
            <h5 class="card-header">周热词排行</h5>
            <div class="card-body" style="height: 100%">
              <table class="table">
                <tbody v-if="!loading_hot_words">
                <tr v-for="(item, index) in hot_words_list" :key="index">
                  <td><span v-if="item.index === 1" style="color: goldenrod">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-1-square-fill" viewBox="0 0 16 16">
                      <path
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm7.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/>
                      </svg>
                    </span>
                    <span v-else-if="item.index === 2" style="color: silver">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-2-square-fill" viewBox="0 0 16 16">
  <path
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z"/>
</svg>
                    </span>
                    <span v-else-if="item.index === 3" style="color: sandybrown">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-3-square-fill"
                           viewBox="0 0 16 16">
  <path
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm5.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z"/>
                        </svg>
                    </span>
                    <span v-else>
                      {{ item.index }}
                    </span></td>
                  <td class="blue-hover" @click="search_word(item.name)">
                    <span v-if="item.index <= 3" style="color: red">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-fire" viewBox="0 0 16 16">
  <path
      d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
</svg>
                    </span>
                    {{ item.name }}
                  </td>

                  <td>{{ item.hot_value }}</td>
                  <td>
                    <span v-if="item.type===1" style="color: green">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-arrow-up-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd"
        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
</svg>
                    </span>
                    <span v-else-if="item.type===2" style="color: red">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-arrow-down-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd"
        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
</svg>
                    </span>
                    <span v-else style="color: #7e8c8d">
                      -
                    </span>
                  </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr class="spinner-grow text-info" role="status">
                </tr>
                <tr>
                  加载中...
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  底部导航栏-->
    <div class="card text-center" style="background-color: #0000008D; color: white;border-radius: 0; margin-top: 100px">
      <div class="card-body">
        <div class="container">
          <p class="card-text" style="text-align: left;font-size:25px;">
            <img src="../assets/logo-无背景.png" alt="" width="150" height="50"/>
          </p>
          <div class="row" style="margin-top: 40px;margin-bottom: 40px">
            <div class="col-4" style="border-right: 1px solid #f6f9feaf">
              <p style="text-align: left;font-size: 18px">
                联系我们
              </p>
              <div style="text-align: left">
                +86 11011412011
              </div>
              <div style="text-align: left">
                1234567891@buaa.edu.cn
              </div>
            </div>
            <div class="col-4" style="border-right: 1px solid #f6f9feaf;text-align: left;padding-left: 50px">
              <p>
                <span class="cus-link" @click="open_dialog(2)">前往投诉</span>
              </p>
              <p>
                <span class="cus-link" @click="open_dialog(1)">支持我们</span>
              </p>
              <p>
                <span class="cus-link" @click="open_dialog(0)">商业合作</span>
              </p>
            </div>
            <div class="col-4" style="display: flex;align-items: center;padding-left: 10%">
              <div class="btn btn-primary" @click="scroll_to_top">回到顶部</div>
            </div>
          </div>
        </div>
      </div>

    </div>


    <!--  侧栏页面-->

  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import Nav_bar from "@/Component/header.vue";
import {searchArticlesByTimeDesc, searchArticlesByViewDesc} from "@/api/home/home";


export default {
  name: 'Index-1',
  components: {Nav_bar},
  data() {
    return {
      dialogVisible: false,
      nav_img_head: '软分知网',
      loading_hot_articles: true,
      load_hot_article_error: false,
      loading_hot_words: true,
      loading_new_articles: true,
      current_date: new Date().toDateString(),
      user_data: {
        login: true,
        avatar_img: 'images/avatar.jpg',
        user_name: "武易",
      },
      search_setting: {
        mode: 0,
        type: 0,
        types: [
          {value: "主题"},
          {value: "来源"},
          {value: "作者"},
          {value: "研究领域"},
        ],
        place_holder: "请输入查询",
        content: "",
        history: [],
        choices: [
          {name: "学术期刊", choose: true},
          {name: "学位论文", choose: true},
          {name: "学术辑刊", choose: true},
          {name: "会议", choose: true},
          {name: "报纸", choose: true},
          {name: "年鉴", choose: true},
          {name: "专利", choose: true},
          {name: "标准", choose: true},
          {name: "成果", choose: true},
          {name: "图书", choose: true},
          {name: "文库", choose: true},
        ]
      },
      useful_service: [
        {
          message: "常用服务1",
          link: "#"
        }, {
          message: "常用服务2",
          link: "#"
        }, {
          message: "常用服务3",
          link: "#"
        },
      ],
      download_list: [],
      hot_words_list: [],
      new_article_list: [],
      test: true,
      log_message: "什么都没有哦~",
    }
  },
  methods: {
    search() {
      if (this.search_setting.content === "") {
        this.alert('搜索内容不能为空！', "error")
        return
      }
      this.search_setting.history = this.search_setting.history.filter((item) => item.value !== this.search_setting.content);
      this.search_setting.history.unshift({value: this.search_setting.content})
      if (this.search_setting.history.length > 20) {
        this.search_setting.history = this.search_setting.history.slice(0, 20);
      }
      this.save_history();
      this.$router.push({
        name: "search",
        query: {field: this.search_setting.types[this.search_setting.type].value, question: this.search_setting.content}
      });
    },
    search_word(content) {
      this.search_setting.history = this.search_setting.history.filter((item) => item.value !== content);
      this.search_setting.history.unshift({value: content})
      if (this.search_setting.history.length > 20) {
        this.search_setting.history = this.search_setting.history.slice(0, 20);
      }
      this.save_history();
      this.$router.push({name: "search", query: {field: "主题", question: content}});

    },
    get_history(queryString, cb) {
      let items = this.search_setting.history;
      let results;
      if (items.length !== 0) {
        results = items;
      } else {
        results = [{value: "当前暂无历史记录"}];
      }
      cb(results);
    },
    change_mode(newMode) {
      if (this.search_setting.mode === newMode) {
        return;
      }
      this.search_setting.mode = newMode;
    },
    change_type(newType) {
      this.search_setting.type = newType;
    },
    select_all() {
      this.search_setting.choices.forEach((item) => {
        item.choose = true;
      })
      this.save_choices();
    },
    save_history() {
      let storage = [];
      this.search_setting.history.forEach(h => {
        storage.push(h.value);
      })
      localStorage.setItem("search_history", storage.toString());
    },
    load_history() {
      if (localStorage.getItem("search_history") !== null) {
        let str = localStorage.getItem("search_history");
        let strArray = str.split(",");
        strArray.forEach((item) => {
          this.search_setting.history.push({value: item})
        })
      }
    },
    save_choices() {
      let choices = [];
      this.search_setting.choices.forEach(choice => {
        choices.push(choice.choose ? 1 : 0);
      })
      localStorage.setItem("choices", choices.toString());
    },
    load_choices() {
      if (localStorage.getItem("choices") !== null) {
        let str = localStorage.getItem("choices");
        str = str.split(",");
        for (let i = 0; i < str.length; i++) {
          this.search_setting.choices[i].choose = str[i] === '1';
        }
      }
    },
    alert(messages, type, duration=3000) {
      ElMessage({
        message: messages,
        type: type,
        duration: duration,
        showClose: true
      })
    },
    scroll_to_top() {
      window.scroll({top: 0, behavior: "smooth"});
    },
    open_dialog(index) {
      switch (index) {
        case 0:
          this.log_message = "什么都没有哦~";
          break;
        case 1:
          this.log_message = "感谢您的支持~";
          break;
        case 2:
          this.log_message = "功能还未开发~";
          break;
      }
      this.dialogVisible = true;
    },
    load_hot_words() {
        this.hot_words_list = [
          {index: 1, name: "新质生产力", hot_value: "82", type: 0},
          {index: 2, name: "数字化转型", hot_value: "67", type: 1},
          {index: 3, name: "人工智能", hot_value: "30", type: 2},
          {index: 4, name: "数字经济", hot_value: "12", type: 2},
          {index: 5, name: "盈利能力分析", hot_value: "10", type: 0},
          {index: 6, name: "绿色金融", hot_value: "9", type: 1},
          {index: 7, name: "绿色债券", hot_value: "7", type: 0},
          {index: 8, name: "财务风险", hot_value: "3", type: 1},
          {index: 9, name: "财务舞弊", hot_value: "3", type: 2},
          {index: 10, name: "中国式现代化", hot_value: "2", type: 0}
        ]
    },
    load_hot_articles() {
      searchArticlesByTimeDesc().then((request) => {
        console.log(request.data)
        for (let i = 0; i < 10; i++) {
          this.download_list.push({
            index: i+1,
            title: request.data[i].articleName,
            time: request.data[i].publishTime.substring(0,request.data[i].publishTime.indexOf("T")),
            belong:request.data[i].fieldOfResearch,
            link: `/article/${request.data[i].articleId}`,
          })
        }
        this.loading_hot_articles = false;
        this.loading_hot_words = false;

      }).catch((error)=>{
        console.log(error)
        this.load_hot_article_error = true;
        this.alert("加载失败，请检查您的网络","error",30000)
      })
    },
    load_new_articles() {
      searchArticlesByViewDesc().then((request) => {
        console.log(request.data)
        for (let i = 0; i < 8; i++) {
          this.new_article_list.push({
            title: request.data[i].articleName,
            url: `/article/${request.data[i].articleId}`,
            cover_image_url:`images/articleImage${i}.jpg`,
            type: 0,
          })
        }
        this.loading_new_articles = false;
      }).catch((error)=>{
        console.log(error)
        this.alert("加载失败，请检查您的网络","error",30000)
      })
    },
    init() {
      this.loading_hot_words = true;
      this.loading_hot_articles = true;
      this.loading_new_articles = true;
    },


  },
  created() {
    this.init();
    this.load_history();
    this.load_choices();
    this.load_hot_words();
    this.load_new_articles();
    this.load_hot_articles();
  },
  computed: {
    choice_num() {
      let num = 0;
      for (let choicesKey of this.search_setting.choices) {
        if (choicesKey.choose === true) {
          num++;
        }
      }
      return num;
    }
  }
}
</script>
<style scoped>

.debug_test {
  border: 1px solid red;
}

.page-background {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #f9f9f9;
}


.header-card {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 10%;
}

.form-control {
  --bs-border-width: 0;
  border: 0;
}

.search-input {
  border-top-left-radius: 0 !important;
  width: 100% !important;
}


.blue-hover {
  color: black;
  cursor: pointer;
}

.blue-hover:hover {
  color: cornflowerblue;
}

.cus-card {
  margin: 10px;
  padding-top: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.card-hover {
  background-color: #f6f9feaf;
}

.card-hover:hover {
  background-color: #ffffffff;
}

.cus-link {
  color: #f6f9feaf;
  text-decoration: none;
  cursor: pointer;
}

.cus-link:hover {
  color: #ffffffff;
}

</style>