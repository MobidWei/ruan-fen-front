<template>
  <Nav_bar />
  <div class="full-width">
    <div class="search__bar flex align-center">
      <div class="search__bar__inner flex align-center flex-1" style="margin: 50px 0;">
        <el-popover placement="bottom" title="" :width="180" trigger="hover">
          <template #reference>
            <span
              class="sele flex flex-shrink justify-center align-center pointer"
            >
              {{ nowChosen }}<el-icon class="m-l-5"><CaretBottom /></el-icon>
            </span>
          </template>
          <template #default>
            <ul class="pop__menu">
              <li class="pointer" v-for="(option, index) in options" :key="option.value" @click="changeOption(index)">{{ option.label }}</li>
            </ul>
          </template>
        </el-popover>
        <el-input v-model="searchParams.search" class="inpt" />
        <span
          class="pointer flex-shrink search flex align-center justify-center"
          ><el-icon><Search /></el-icon
        ></span>
        <!-- <div class="pointer flex-shrink ques flex align-center justify-center">
          <el-icon>
            <ChatLineRound />
          </el-icon>
          <span>问答</span>
        </div> -->
      </div>
      <router-link to="advancedSearch" class="btn-search pointer"
        >高级检索</router-link
      >
      <!-- <span class="btn-search pointer">检索设置</span> -->
    </div>
    <!-- <div class="submenu">
      <div class="submenu__con flex align-center">
        <div class="total__sub flex align-center">
          <div
            class="total__sub__info flex align-center justify-center flex-shrink"
          >
            <span class="b_t">总库</span><span class="s_t">14.72万</span>
          </div>
          <div class="lan flex align-center justify-center flex-column">
            <span class="current flex align-center justify-center">中文</span>
                        <span class="flex align-center justify-center">外文</span>
            <span
              v-for="item in langs"
              :key="item.value"
              class="flex align-center justify-center"
              :class="{ current: currentLang === item.value }"
              @click="changeLang(item)"
              >{{ item.label }}</span
            >
          </div>
        </div>
        <div class="all__sub flex-1">
          <div class="all__sub__inner flex align-center flex-1">
            <div
              v-for="item in submenu"
              :key="item.id"
              class="flex flex-column align-center flex-1 pointer submenu__item"
            >
              <span class="b_b">{{ item.title }}</span>
              <span class="s_b">{{ item.count }}</span>
              <el-icon v-show="item.isArrow">
                <CaretBottom />
              </el-icon>
              <span class="blank" v-show="!item.isArrow"></span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Nav_bar from "@/component/header.vue";

interface MenuItem {
  id: number;
  label: string;
}

interface LangItem {
  label: string;
  value: number;
}

const nowChosen=ref("主题");
let menus: MenuItem[] = [
  { id: 1, label: "检索" },
  { id: 2, label: "增强检索" },
  { id: 3, label: "出版来源" },
];

const options = [
  { value: "title", label: "主题"},
  { value: "summary", label: "摘要" },
  { value: "author", label: "作者" },
  { value: "keywords", label: "关键词" },
];

let submenu = [
  { id: 1, title: "学术期刊", count: "9.93万", isArrow: true },
  { id: 2, title: "学位论文", count: "3.4万", isArrow: true },
  { id: 3, title: "会议", count: "8000", isArrow: true },
  { id: 4, title: "报纸", count: "800", isArrow: false },
  { id: 5, title: "年鉴", count: "", isArrow: false },
  { id: 6, title: "图书", count: "0", isArrow: true },
  { id: 7, title: "专利", count: "", isArrow: true },
  { id: 8, title: "标准", count: "130", isArrow: true },
  { id: 9, title: "成果", count: "2722", isArrow: false },
];
let langs: LangItem[] = [
  { label: "中文", value: 0 },
  { label: "外文", value: 1 },
];
let currentLang = ref<number>(0);
let currentId = ref<number>(0);
let searchParams = ref({
  search: "1",
});
const handleMenu = (item: MenuItem) => {
  currentId.value = item.id;
};
const changeLang = (item: LangItem) => {
  currentLang.value = item.value;
};

const changeOption = (index: number) => {
  nowChosen.value = options[index].label;
}

</script>
<style lang="scss" scoped>
.headerHereHere {
  border-top: 3px solid #1f4ed1;
  background: #f7f7f7;
  border-bottom: 1px solid #e6e9f0;
  height: 96px;
  width: 100%;

  &__conta {
    width: 95%;
    margin: 0 auto;
    height: 100%;

    :deep(.el-row) {
      height: 100%;
    }

    .logo {
      height: 100%;

      img {
        width: 198px;
        height: 65px;
      }
    }

    &__menu {
      height: 100%;

      .total__menu {
        border-left: 1px solid #cddcfc;

        span {
          padding: 0 17px 0 27px;
        }
      }

      .menu__lis {
        flex: 1;
        height: 100%;

        li {
          flex: 1;
          text-align: center;
          height: 100%;

          span {
            margin-right: 3%;
          }

          &.current {
            background: #1f4ed1;
            color: #fff;
          }
        }
      }
    }

    .right__menu {
      color: #517ee3;
      height: 100%;

      .icon-co {
        font-size: 30px;
        margin-right: 3%;
      }

      .text-co {
        color: #333;
        margin-right: 2%;
      }

      .avatar {
        .ava {
          margin-right: 3%;
        }

        .ellipsis {
          max-width: 100px;
        }
      }

      .p__login {
        width: 108px;
        height: 44px;
        border: 1px solid #3365de;
        border-radius: 10px;
        color: #3365de;
        background: #ebf2fe;
        text-align: center;
        line-height: 44px;
        margin: 0 5%;
      }
    }
  }
}

.search__bar {
  width: 80%;
  margin: 20px auto;

  &__inner {
    background: #fff;
    height: 60px;
    box-shadow: 0 0 4px 4px #e3e7ea;

    .sele {
      width: 196px;
      border-right: 1px solid #cccccc;
    }

    .inpt {
      :deep(.el-input__wrapper) {
        box-shadow: none !important;
      }
    }

    .search {
      width: 86px;
      font-size: 26px;
      color: #3466df;
      border-right: 1px solid #cccccc;
    }

    .ques {
      font-size: 26px;
      color: #3466df;
      width: 140px;

      span {
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }

  .btn-search {
    height: 60px;
    // background-color: #efefef;
    // border: 1px solid #d2d2d2;
    // box-shadow: 0 0 4px 2px #e3e7ea;
    // border-radius: 3px;
    color: #333;
    font-size: 16px;
    padding: 0 5px;
    line-height: 60px;
    margin-left: 8px;
  }
  
  .btn-search:hover {
    color: #E74C3C;
  }

}

.submenu {
  background-color: #3365de;
  padding-top: 16px;

  &__con {
    width: 95%;
    margin: 0 auto;
    color: #fff;

    .total__sub {
      &__info {
        width: 242px;
        height: 74px;
        box-sizing: border-box;
        // border:  rgba(255,255,255,.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        // border-right:1px solid rgba(255,255,255,.5);
        // border-radius:3px;

        padding-top: 10px;
        background: rgba(255, 255, 255, 0.2);
        flex-direction: column;

        .b_t {
          font-size: 16px;
          font-weight: bold;
        }

        .s_t {
          font-size: 12px;
          margin-top: 5px;
        }
      }

      .lan {
        span {
          border-left: 1px solid rgba(255, 255, 255, 0.5);

          width: 90px;
          height: 36px;
          cursor: pointer;

          &.current {
            border-top: 1px solid rgba(255, 255, 255, 0.5);
            border-right: 1px solid rgba(255, 255, 255, 0.5);
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
            border-left: none;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }

    .all__sub {
      justify-content: flex-start;

      .all__sub__inner {
        padding: 10px 0;

        .submenu__item {
          border-right: 1px solid #1d49ca;

          &:last-of-type {
            border-right: none;
          }
        }

        .b_b {
          font-size: 16px;
        }

        .s_b {
          font-size: 12px;
          margin: 5px 0 1px;
          color: rgba(255, 255, 255, 0.7);
          height: 14px;
        }

        .blank {
          height: 14px;
        }
      }
    }
  }
}

.pop__menu {
  font-size: 16px;
  padding: 0 !important;

  li {
    padding: 10px 0;
    text-align: center;

    &:hover {
      color: #1d49ca;
    }
  }
}
</style>