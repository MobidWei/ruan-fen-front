<template>
  <nav class="navbar navbar-expand-lg navbar-background">
    <div class="container-fluid" style="background-color: #295cdc;">
      <a class="navbar-brand" href="#" style="display: flex;align-items: center;font-size: 26px">
        <img :src="nav_data.logo_img" alt="" width="50" height="50"/>
        {{ nav_img_head }}
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="(item, index) in nav_data.title_data" :key="index"
              class="nav-item navbar-item">
            <div class="nav-link" data-bs-toggle="offcanvas" :data-bs-target="item.offCanvas_id"
                 aria-controls="offcanvasTop" @click="off_canvas_choice(1,index)">
              {{ item.name }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </li>
          <li class="nav-item navbar-item">
            <a v-for="(item, index) in nav_data.link_data" :key="index" :href="item.link"
               class="nav-link">
              {{ item.name }}
            </a>
          </li>
        </ul>
        <div class="navbar-text navbar-right">
          <img :src="user_data.avatar_img" alt="" width="50" height="50" style="border-radius: 50%"/>
          <span class="navbar-username text-truncate" v-if="user_data.login">{{ user_data.user_name }}</span>
          <button type="button" class="btn btn-outline-light navbar-button" v-if="!user_data.login" @click="log_in">
            登录
          </button>
          <button type="button" class="btn btn-outline-danger navbar-button" v-else @click="log_out">退出登录</button>
        </div>
      </div>
    </div>
  </nav>

  <div class="offcanvas offcanvas-top navbar-canvas" tabindex="-1" id="off_canvas_1" aria-labelledby="offcanvasTop"
       style="background-color: rgba(142,145,149,0.69); height: 300px">
    <div class="container-lg">
      <div class="row" style="margin-top: 50px">
        <div class="col-2" style="border-right: 1px solid #c8cacd">
          <div class=" d-grid gap-2">
            <div class="btn choice" :class="offCanvasSettings.choice1 === 0?'btn-primary':'btn-outline-light'"
                 @click="off_canvas_choice(1,0)" style="border-top-left-radius: 10px;border-top-right-radius: 10px">
              读者服务
            </div>
          </div>
          <div class=" d-grid gap-2">
            <div class="btn choice" :class="offCanvasSettings.choice1 === 1?'btn-primary':'btn-outline-light'"
                 @click="off_canvas_choice(1,1)">
              作者服务
            </div>
          </div>
          <div class=" d-grid gap-2">
            <div class="btn choice" :class="offCanvasSettings.choice1 === 2?'btn-primary':'btn-outline-light'"
                 @click="off_canvas_choice(1,2)"
                 style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px">
              帮助
            </div>
          </div>

        </div>
        <div class="col-4" style="border-right: 1px solid #c8cacd;height: 100%">
          <div v-for="(item,index) in offCanvasSettings.content" :key="index">
            <div v-if="offCanvasSettings.choice1===index">
              <a v-for="(innerItem,index) in offCanvasSettings.content[offCanvasSettings.choice1]" :key="index"
                 class="btn choice"
                 :class="offCanvasSettings.choice2 === index?'btn-primary':'btn-outline-light'"
                 :href="innerItem.url"
                 @mouseenter="off_canvas_choice(2, index)"
                 :style="get_choice_style(index)">
                {{ innerItem.title }}
              </a>
            </div>
          </div>
        </div>
        <div class="col-6" style="color:white;text-align: center;font-size: 18px;white-space: pre-line;">
          {{ offCanvasSettings.content[offCanvasSettings.choice1][offCanvasSettings.choice2].description }}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Nav_bar',
  data(){
    return{
      nav_data: {
        logo_img: 'images/logo.png',
        title_data: [
          {
            name: "读者服务",
            offCanvas_id: "#off_canvas_1",
          }, {
            name: "作者服务",
            offCanvas_id: "#off_canvas_1",
          }, {
            name: "帮助",
            offCanvas_id: "#off_canvas_1",
          }
        ],
        link_data: [
          {
            name: "联系我们",
            link: "#",
          },

        ],
      },
      user_data: {
        login: true,
        avatar_img: 'images/avatar.jpg',
        user_name: "武易",
      },
      nav_img_head: '软分知网',
      offCanvasSettings: {
        choice1: 0,
        choice2: 0,
        content: [
          [
            {
              url: "#",
              title: "资源推荐",
              description: "我们会根据您的研究兴趣和历史浏览记录，\n推荐相关的学术资源，\n如论文、书籍、会议资料等。"
            },
            {
              url: "#",
              title: "引用管理",
              description: "我们可以帮助您管理引用的文献，\n一键生成不同格式的引用（如APA、MLA、Chicago等）。"
            },
            {
              url: "#",
              title: "个性化检索",
              description: "您可以根据自己的实际需求，\n个性化定制检索条件，设置不同的筛选器，\n检索界面清晰易用，快去试试吧！"
            },
          ],
          [
            {
              url: "#",
              title: "门户认领",
              description: "若您是科研人员，\n可以前往认领自己的门户，\n通过审核后可以获得对自己学术成果的管理权限。"
            },
            {
              url: "#",
              title: "投稿管理",
              description: "您如果有自己的门户，\n可以前往投稿，在自己的门户中上传全新的学术成果分享给读者。"
            },
            {
              url: "#",
              title: "出版合作",
              description: "若您有意向，\n平台可以提供与出版社或学术期刊的合作机会，\n推广您的作品。"
            },
            {
              url: "#",
              title: "同行评审",
              description: "平台为您提供了同行评审服务，\n确保学术资源的质量，\n增强平台的学术氛围。"
            },
          ],
          [
            {
              url: "#",
              title: "FAQ（常见问题解答）",
              description: "前往查看常见问题的详细解答，\n或许可以帮助您快速解决常见的使用问题。"
            },
            {
              url: "#",
              title: "平台指南",
              description: "您可以前往查看平台指南，\n以更详细地了解我们的功能。"
            },
            {
              url: "#",
              title: "反馈与建议",
              description: "您可以前往填写您对我们平台的意见和建议，\n十分感谢您的反馈！"
            },
          ]
        ]
      }

    }
  },
  methods:{
    log_in() {
      this.user_data.login = true;
      this.user_data.avatar_img = "images/avatar.jpg";
    },
    log_out() {
      this.user_data.login = false;
      this.user_data.avatar_img = "images/no_log.png";
    },
    off_canvas_choice(level, index) {
      if (level === 1) {
        if (this.offCanvasSettings.choice1 !== index) {
          this.offCanvasSettings.choice1 = index;
          this.offCanvasSettings.choice2 = 0;
        }
      } else {
        if (this.offCanvasSettings.choice2 !== index) {
          this.offCanvasSettings.choice2 = index;
        }
      }
    },
    get_choice_style(index) {
      if (index === 0) {
        return "border-top-left-radius: 10px;border-top-right-radius: 10px";
      } else if (index === this.offCanvasSettings.content[this.offCanvasSettings.choice1].length - 1) {
        return "border-bottom-left-radius: 10px;border-bottom-right-radius: 10px";
      }
      return "";
    }

  }
}
</script>

<style scoped>
.navbar-background {
  padding: 0;
  width: 100%;
  height: 80px;
  z-index: 99;
}

.navbar {
  --bs-navbar-brand-padding-y: 16px;
}

.navbar-canvas {
  height: 400px;
}

.navbar-item {
  cursor: pointer;
  font-size: 22px;
  margin-right: 10px;
  border-bottom: 1px solid black;

}

.nav-link {
  color: white;
  padding-top: 0;
  padding-bottom: 0;
}

.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.navbar-username {
  color: white;
  margin-left: 20px;
  font-size: 22px;
  max-width: 140px;
}

.navbar-button {
  margin-left: 20px;
}

.choice {
  border-radius: 0;
  width: 100%;
  margin-bottom: 10px;
}


</style>