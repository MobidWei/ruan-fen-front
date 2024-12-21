<template>
  <div>
    <div>
      <header-view></header-view>
      <p class="title">高级检索</p>
    </div>
    <div class="down">
      <div class="content-block">
        <div class="content">
          <div class="doc">
            <div id="duplicated-author">
              <p class="get-author">
                <span style="margin-right: 18px; font-size: 20px; color: #333"
                  >高级检索使用方法</span
                >
              </p>
              <hr />
              <div class="scrollable-area">
                <div style="line-height: 1.5">
                  高级检索支持使用运算符*、+、-、''、""、()进行同一检索项内多个检索词的组合运算，检索框内输入的内容不得超过120个字符。
                  输入运算符*(与)、+(或)、-(非)时，前后要空一个字节，优先级需用英文半角括号确定。
                  若检索词本身含空格或*、+、-、()、/、%、=等特殊符号，进行多词组合运算时，为避免歧义，须将检索词用英文半角单引号或英文半角双引号引起来。<br />
                  例如：<br />
                  （1）篇名检索项后输入：神经网络 *
                  自然语言，可以检索到篇名包含“神经网络”及“自然语言”的文献。<br />
                  （2）主题检索项后输入：(锻造 + 自由锻) *
                  裂纹，可以检索到主题为“锻造”或“自由锻”，且有关“裂纹”的文献。<br />
                  （3）如果需检索篇名包含“digital library”和“information
                  service”的文献，在篇名检索项后输入：'digital library' *
                  'information service'。<br />
                  （4）如果需检索篇名包含“2+3”和“人才培养”的文献，在篇名检索项后输入：'2+3'
                  * 人才培养。
                </div>
              </div>
            </div>
            <div class="shadow-box">
              <div
                v-for="(inputGroup, index) in inputGroups"
                :key="index"
                class="input_limit_block"
              >
                <div class="input_limit_block_left" v-show="index > 0">
                  <select
                    id="options"
                    v-model="inputGroup.selectedOption"
                    class="choose"
                    style="height:100%"
                  >
                    <option
                      v-for="option in options"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <div
                  class="input_limit_block_left"
                  v-show="index == 0"
                  style="border: none"
                ></div>
                <div class="input_limit_block_right">
                  <el-input
                    v-model="inputGroup.input"
                    style="width: 600px"
                    placeholder="Please input"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        v-model="inputGroup.label"
                        placeholder="Select"
                        style="width: 115px; height: 25px ;border:none;size=100px"
                      >
                        <el-option label="作者" value="1" />
                        <el-option label="主题" value="2" />
                        <el-option label="全文" value="3" />
                        <el-option label="文献来源" value="4" />
                        <el-option label="摘要" value="5" />
                        <el-option label="关键词" value="6" />
                        <el-option label="分类" value="7" />
                      </el-select>
                    </template>
                    <template #append>
                      <el-button :icon="Search" />
                    </template>
                  </el-input>
                </div>
                <button class="plus-button" @click="removeInputGroup(index)">
                  -
                </button>
                <button class="plus-button" @click="addInputGroup">+</button>
              </div>
              <!-- 添加新输入框组的按钮 -->

              <div class="input_limit_block"></div>
              <div class="input_limit_block">
                <div
                  class="input_limit_block_left"
                  style="border: 0px; margin-top: 2.5px"
                >
                  时间范围：
                </div>
              </div>
              <hr class="line_type" />
              <div class="mb-4">
                <div class="input_limit_block" style="  margin-bottom: 10px;">
                  <button class="button_search">检索</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import header from "../component/header.vue";

export default defineComponent({
  components: { "header-view": header },
  data() {
    return {
      inputGroups: [
        {
          input: "",
          label: "",
          selectedOption: null,
        },
        {
          input: "",
          label: "",
          selectedOption: "option1",
        },
        // 初始时有两个输入框组
      ],
      input: "",
      label: "",
      selectedOption: "option1",
      options: [
        { value: "option1", text: "AND" },
        { value: "option2", text: "OR" },
        { value: "option3", text: "NOT" },
      ],
      selectedItem: "option1",
      Items: [
        { value: "option1", text: "主题" },
        { value: "option2", text: "作者" },
        { value: "option3", text: "关键词" },
        { value: "option3", text: "全文" },
        { value: "option3", text: "篇名" },
        { value: "option3", text: "摘要" },
        { value: "option3", text: "文献来源" },
      ],
    };
  },
  setup() {
    const textBoxes = ref([{ value: "" }]);

    function addTextBox() {
      textBoxes.value.push({ value: "" }); // 创建一个具有默认空字符串的对象
    }

    function removeTextBox() {
      if (textBoxes.value.length > 0) {
        textBoxes.value.pop();
      } else {
        alert("No more text boxes to remove!");
      }
    }
    const name = "ResearchUser";
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
    return {
      name,
      duplicated_authors,
      author,
      articles,
      patents,
      projects,
      prices,
    };
  },
  methods: {
    addInputGroup() {
      // 添加一个新的输入框组
      this.inputGroups.push({
        input: "",
        label: "",
        selectedOption: "option1",
      });
    },
    removeInputGroup(index) {
      // 如果输入框组数量大于1，则移除指定的输入框组
      if (this.inputGroups.length > 1) {
        this.inputGroups.splice(index, 1);
      }
    },
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
  height: 300px;
  float: right;
  max-width: 36%;
  min-width: 340px;
  padding: 2px 22px 8px;
  /* margin-left: 300px; */
  /* margin-top: 20px; */
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
  border-bottom: 2px solid rgba(31, 97, 141, 0.5);
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
  color: #2471a3;
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
  color: #003366;
}

.doc-content a:hover {
  color: #2471a3;
  text-decoration: underline;
}

.scrollable-area {
  width: 330px; /* 设置区域的宽度 */
  height: 200px; /* 设置区域的高度 */
  border: 1px solid #ccc; /* 添加边框以便更清晰地看到区域 */
  overflow-y: auto; /* 允许垂直滚动条出现 */
  padding: 10px; /* 添加内边距以提供内容空间 */
  box-sizing: border-box; /* 确保宽度和高度包括边框和内边距 */
}

.content {
  height: 600px; /* 设置内容的高度，使其超出容器的高度以触发滚动条 */
  background-color: #fcfcfc; /* 设置背景颜色以便更清晰地看到内容 */
}

.shadow-box {
  /* display: block; */
  width: 900px; /* 设置宽度 */
  /* height: 300px; 设置高度 */
  background-color: #fff; /* 设置背景颜色 */
  border: 1px solid #ccc; /* 设置边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 设置阴影效果 */
  margin-left: 0px; /* 设置外边距，使框居中 */
  margin-top: 30px;
}
.input_limit_block {
  display: flex;
  width: 900px;
  height: 30px;
  background-color: #fff; /* 设置背景颜色 */
  /* border: none; */
  border: none;
  margin-left: 0px; /* 设置外边距，使框居中 */
  margin-top: 30px;
  margin-bottom: 5px;
}
.input_limit_block_left {
  text-align: center;
  width: 80px;
  height: 100%;
  margin-left: 60px;
  background-color: #fff; /* 设置背景颜色 */
  border: 1px solid #ccc; /* 设置边框 */
  border-radius: 5px;
}
.input_limit_block_right {
  display: flex;
  width: 660px;
  height: 100%;
  margin-left: 30px;
  background-color: #fff; /* 设置背景颜色 */
  /* border: 1px solid #ccc; 设置边框 */
}
.plus-button {
  margin-left: 5px;
  margin-right: 10px;
  width: 26px;
  border: none; /* 设置边框 *
  background-color: #ffffff; /* 按钮背景色 */
  color: #000000; /* 按钮文字颜色 */
  font-size: 20px; /* 按钮文字大小 */
  /* font-weight: bold; 按钮文字粗细 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
  border-radius: 5px; /* 按钮圆角 */
  transition: background-color 0.3s ease, transform 0.3s ease; /* 添加过渡效果 */
}

.plus-button:hover {
  background-color: #e0e0e0; /* 鼠标悬停时改变背景色 */
  transform: scale(1.05); /* 鼠标悬停时稍微放大按钮 */
}
.choose {
  border: none;
  background-color: #fff;
  font-size: 15px;
}
.choose_Item {
  border: none;
  background-color: #fff;
  font-size: 15px;
}
.input_limit_block_right_left {
  text-align: center;
  width: 100px;
  height: 100%;
  margin-left: 40px;
  background-color: #fff; /* 设置背景颜色 */
  border: none; /* 设置边框 */
}
.vertical-line {
  margin-top: 2.5px;
  width: 1px; /* 竖线的宽度 */
  height: 80%; /* 竖线的高度，可以根据需要调整 */
  background-color: rgb(109, 109, 109); /* 竖线的颜色 */
  margin-left: 5px;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.line_type {
  color: #eae9e9;
}
.button_search{
  margin-left: 42%;
 text-align:100%;
height: 100%;
color: #ffffff;
width: 150px;
background-color: #fd7010;
border: #fd7010;
font-size: 20px;
letter-spacing:0.8em;
}
</style>