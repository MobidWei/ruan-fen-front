<template>
    <div class="full-width">
        <div class="header flex align-center">
            <div class="header__conta">
                <el-row>
                    <el-col :span="4">
                        <div class="logo flex align-center">
                            <img src="~@/assets/images/logo.png"/>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="header__conta__menu flex align-center justify-center">
                            <ul class="flex align-center menu__lis">
                                <li class="flex align-center justify-center pointer" v-for="item in menus"
                                    :key="item.id" :class="{'current':item.id === currentId}" @click="handleMenu(item)">
                                    <span>{{ item.label }}</span>
                                    <el-icon>
                                        <ArrowDown/>
                                    </el-icon>
                                </li>

                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="8">
                        <div class="right__menu flex align-center">
                            <span class="icon-co flex align-center flex-1"><el-icon><QuestionFilled/></el-icon></span>
                            <span class="icon-co flex-1"><el-icon><Bell/></el-icon></span>
                            <span class="text-co flex-1 ">充值</span>
                            <span class="text-co  flex-1">会员</span>
                            <div class="avatar flex align-center  flex-1">
                                <el-avatar :size="50"  class="ava flex-shrink"/>
                                <span class="ellipsis">个人名称</span>
                            </div>
                            <span class="p__login pointer">登录</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="search__bar flex align-center">
            <div class="search__bar__inner flex align-center flex-1">
                <el-popover
                        placement="bottom"
                        title=""
                        :width="180"
                        trigger="hover"
                >
                    <template #reference>
        <span class="sele flex flex-shrink justify-center align-center pointer">
          {{ currentField }}<el-icon class="m-l-5"><CaretBottom/></el-icon>
        </span>
                    </template>
                    <template #default>
                        <ul class="pop__menu">
                            <li class="pointer" @click="selectTheme('主题')">主题</li>
                            <li class="pointer" @click="selectTheme('来源')">来源</li>
                            <li class="pointer" @click="selectTheme('作者')">作者</li>
                            <li class="pointer" @click="selectTheme('研究领域')">研究领域</li>
                        </ul>
                    </template>
                </el-popover>
                <el-input v-model="searchParams.search" class="inpt"/>
                <span class="pointer flex-shrink search flex align-center justify-center"><el-icon><Search
                        @click="sendData"/></el-icon></span>
                <div class="pointer flex-shrink ques flex align-center justify-center">
                    <el-icon>
                        <ChatLineRound/>
                    </el-icon>
                    <span></span></div>
            </div>
        </div>
<!--        <div class="submenu">-->
<!--            <div class="submenu__con flex align-center">-->
<!--                <div class="total__sub flex align-center">-->
<!--                    <div class="total__sub__info flex align-center justify-center flex-shrink"><span class="-->
<!--            b_t">总库</span></div>-->
<!--                </div>-->
<!--                <div class="all__sub flex-1">-->
<!--                    <div class="all__sub__inner  flex align-center flex-1">-->
<!--                        <div v-for="item in submenu" :key="item.id"-->
<!--                             class="flex flex-column align-center  flex-1 pointer submenu__item ">-->
<!--                            <span class="b_b">{{ item.title }}</span>-->
<!--                            <el-icon v-show="item.isArrow">-->
<!--                                <CaretBottom/>-->
<!--                            </el-icon>-->
<!--                            <span class="blank" v-show="!item.isArrow"></span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script lang="ts" setup>
import {ref, defineEmits} from 'vue'
import Nav_bar from "@/Component/Navbar2.vue";
import {defineProps,onMounted} from "vue/dist/vue";

const currentField = ref('主题');
const selectTheme = (value: string) => {
  currentField.value = value;
  if (value === '来源') {
    searchParams.value.field = 'source'
  } else if (value === '作者') {
    searchParams.value.field = 'researcherName'
  } else if (value === '研究领域') {
    searchParams.value.field = 'fieldOfResearch'
  } else if(value === '主题'){
    searchParams.value.field = 'articleName'
  }
};
interface Props {
    page: number
    field: string;
    question: string;
}

const props = defineProps<Props>();
// eslint-disable-next-line vue/no-setup-props-destructure
currentField.value = props.field
const searchParams = ref({
    search: ''
    , field:'articleName'
    ,page:props.page
    ,pageSize:20
})
// eslint-disable-next-line vue/no-setup-props-destructure
searchParams.value.field = props.field
// eslint-disable-next-line vue/no-setup-props-destructure
searchParams.value.search=props.question
const emit = defineEmits<{
    (event: 'sendData', payload: { search: string ,field: string}): void;
    (event: 'requestSearch', payload: {field: string,page: number,pageSize: number }): void;
}>();
const sendData = () => {
    emit('sendData', searchParams.value);
    emit('requestSearch', searchParams.value);
};
onMounted(() => {
  sendData()
})
interface MenuItem {
    id: number;
    label: string;
}

interface LangItem {
    label: string;
    value: number
}

let menus: MenuItem[] = [
    {id: 1, label: '检索'},
    {id: 2, label: '增强检索'},
    {id: 3, label: '出版来源'},
]

let submenu = [
    {id: 1, title: '学术期刊', isArrow: true},
    {id: 2, title: '学位论文', isArrow: true},
    {id: 3, title: '会议', isArrow: true},
    {id: 4, title: '报纸', isArrow: false},
    {id: 5, title: '年鉴', isArrow: false},
    {id: 6, title: '图书', isArrow: true},
    {id: 7, title: '专利', isArrow: true},
    {id: 8, title: '标准', isArrow: true},
    {id: 9, title: '成果', isArrow: false},
]

let currentLang = ref<number>(0)
let currentId = ref<number>(0)
const handleMenu = (item: MenuItem) => {
    currentId.value = item.id
}
const changeLang = (item: LangItem) => {
    currentLang.value = item.value
}
</script>
<style lang="scss" scoped>

.header {
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
          max-width: 100px
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
    background-color: #efefef;
    border: 1px solid #d2d2d2;
    box-shadow: 0 0 4px 2px #e3e7ea;
    border-radius: 3px;
    color: #333;
    font-size: 16px;
    padding: 0 5px;
    line-height: 60px;
    margin-left: 8px;

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
        //border:  rgba(255,255,255,.5);
        //border-left: 1px solid rgba(255, 255, 255, .5);
        //border-top: 1px solid rgba(255, 255, 255, .5);
        //border-bottom: 1px solid rgba(255, 255, 255, .5);
        // border-right:1px solid rgba(255,255,255,.5);
        // border-radius:3px;

        padding-bottom: 10px;
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
          border-left: 1px solid rgba(255, 255, 255, .5);

          width: 90px;
          height: 36px;
          cursor: pointer;

          &.current {
            border-top: 1px solid rgba(255, 255, 255, .5);
            border-right: 1px solid rgba(255, 255, 255, .5);
            border-bottom: 1px solid rgba(255, 255, 255, .5);
            border-left: none;
            background: rgba(255, 255, 255, .2);
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