<script setup lang="ts">
  import { ref } from "vue"
  import { onMounted, watch } from 'vue'
  import Navbar3 from "../components/Navbar.vue"
  // 侧边栏收起
  let collapsed = ref(false)
  let sideBarButton = ref("收起")
  let title = ref("文章标题")
  let authors = ref(["作者1", "作者2"])
  let abstract = ref("玻璃纤维增强热固性聚合物复合材料（GFRP）在各种工业领域中被广泛应用，其优异的力学性能和耐腐蚀性使其成为替代传统材料的" +
      "理想选择。目前，全球聚合物复合材料年产量超过1 600万t，并以约8%的年增长率不断增加。然而，GFRP的废弃物处理一直是一个挑战，因为热固性基体难以降" +
      "解且复合材料很难进行有效的回收利用。据统计，仅有不到10%的废料得到回收利用，特别是在风电行业，废弃叶片的回收面临巨大挑战。随着风电设备的装机容量" +
      "不断增加，风电叶片的回收需求迫在眉睫。目前，机械粉碎虽然是主要的回收工艺，但化学回收和热解回收处理后的纤维质量较高而显示出更大的潜在优势。然而，" +
      "各种工艺的需求尚未得到充分的解释，影响了经济价值及工艺可行性评估。总结了玻璃纤维增强热固性聚合物复合材料的化学回收和热解回收利用方法，并讨论了" +
      "相关挑战和未来发展趋势，旨在推动GFRP废弃物的有效处理和资源化利用。")
  let keywords = ref(["玻璃纤维增强热固性聚合物复合材料（GFRP）", "化学回收", "热解回收"])
  let keywordsContent = ref("")
  let references = ref(["[1] 碳纤维复合材料的应用分析[J]. 熊睿彦.数码世界,2017(12)\n",
  "[2] 低成本聚丙烯腈基碳纤维的创新发展[J]. 罗益锋;罗晰旻.新材料产业,2017(08)\n" ,
  "[3] 中空碳纤维研究现状及应用[J]. 刘先凤;李好义;谭晶;沙扬;曹维宇;杨涛;杨卫民.化工新型材料,2017(06)\n" ,
  "[4] 碳纤维复合材料在海洋中的应用[J]. 于礼玮;曹维宇.化工新型材料,2016(08)\n" ,
  "[5] 碳纤维的等离子体表面处理技术研究进展[J]. 何烨;肖建文;孔德玉;曹维宇.弹性体,2015(06)\n" ,
  "[6] 聚丙烯腈基碳纤维高温石墨化综述[J]. 卢天豪;陆文晴;童元建.高科技纤维与应用,2013(03)\n" ,
  "[7] 围绕市场发展国产碳纤维制备及其应用技术[J]. 冯闻;徐梁华.高科技纤维与应用,2013(03)\n" ,
  "[8] 高性能PAN基碳纤维国产化进展及发展趋势[J]. 徐樑华.中国材料进展,2012(10)\n" ,
  "[9] 国产碳纤维质量状况分析及对策建议[J]. 徐樑华.新材料产业,2010(09)\n" ,
  "[10] 高模量碳纤维的现状及发展(1)[J]. 沈曾民;迟伟东;张学军;田艳红.高科技纤维与应用,2010(03)",
  "[11] 第二页1",
  "[12] 第二页2",
  "[13] 第二页3",
  "[14] 第二页4",
  "[15] 第二页5",
  "[16] 第二页6",
  "[17] 第二页7",
  "[18] 第二页8",
  "[19] 第二页9",
  "[20] 第二页10"
  ])

  //引用的页数
  let refPageNum = ref(references.value.length)
  //当前页面的引用
  let refPageList = ref<string[]>([])
  let curPage = ref(0)
  //当前所显示的那些页（例如1，2，3...5）中显示1、2、3、5
  let curPageList = ref<number[]>([])

  const connectKeywords = (keywords: string[]) => {
    keywordsContent.value = ""
    for (let i = 0; i < keywords.length - 1; i++) {
      keywordsContent.value += keywords[i] + "; "
    }
    keywordsContent.value += keywords[keywords.length - 1]
  }

  const modifySideState = () => {
    collapsed.value = !(collapsed.value)
    if (collapsed.value){
      sideBarButton.value = "展开"
    }else {
      sideBarButton.value = "收起"
    }
  }

  /**
   * 获取文章
   */
  const getArticle = () => {
    console.log("获取文章")
  }

  const changePage = (page: number) => {
    curPage.value = page;
    refPageList.value = [];
    for (let i = (curPage.value - 1) * 10; i < ((curPage.value - 1) * 10 + 10); i++) {
      refPageList.value.push(references.value[i]);
    }
  }

  // watch(curPage, () => {
  //   refPageList.value = [];
  //   for (let i = (curPage.value - 1) * 10; i < ((curPage.value - 1) * 10 + 10); i++) {
  //     refPageList.value.push(references.value[i]);
  //   }
  // });

  onMounted(() => {
    connectKeywords(keywords.value)
    // initializeRefPageList();
    curPage.value=1
    changePage(1)
  })

</script>

<template>
  <div id="outermostContainer">
<!--    <Navbar3 />-->
    <div id="contentContainer">
      <el-container>
        <el-aside :class="collapsed ? 'hiddenSideBar' : 'outerSideBar'">
          <!--    控制收起和展开的按钮      -->
          <el-button @click="modifySideState" :class="collapsed ? 'hiddenSideBarButton' : 'sideBarButton'">{{sideBarButton}}</el-button>
          <h5 style="margin-top: 60px;margin-left: 15px" :class="collapsed ? 'hiddenSideBar' : ''">文章目录</h5>
          <div :class="collapsed ? 'hiddenSideBar' : 'sideBar'">
            <!--     侧边栏内容     -->
            <div style="margin-top:10px; margin-left:15px">
              <div>
                以下为目录
              </div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
              <div>目录</div><div>目录</div><div>目录</div><div>目录</div><div>目录</div>
            </div>
          </div>
        </el-aside>

        <el-container style="flex-direction: column">
          <el-main>
            <!--    文章内容     -->
            <div style="display : flex; flex-direction: column; width: 79%; margin : 0 auto">
              <!--    文章标题和作者     -->
              <div class="articleTop">
                <h1 id="title">{{ title }}</h1>
                <h3 id="author">
                  <!--    使用v-for来添加多个作者     -->
                  <span>作者</span>
                  <span>作者</span>
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
              <div class="row">
                <span class="rowTitle">可添加更多属性</span>
              </div>
              <div class="row">
                <span class="rowTitle">可添加更多属性</span>
              </div>
              <div class="row">
                <span class="rowTitle">可添加更多属性</span>
              </div>
            </div>
            <div class="reference">
              <h3 style="margin: 0 auto">参考文献</h3>
              <div style="display: flex; margin-top: 15px; flex-direction: column; gap: 10px">
                <div v-for="curPageContent in refPageList" :key="curPageContent" style="color: #666; font-size: 14px">
                  {{ curPageContent }}
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
              <a target="_blank" href="https://baidu.com">查看原文</a>
            </div>
          </el-main>
        </el-container>
      </el-container>
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
    min-height: 100%;
    width: 96%;
    border: 1px solid #c93d3d;
  }

  .el-container {
    height: 100%;
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

  .hiddenSideBar {
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
    border-top: 1px solid #c93d3d;
    padding-top: 20px;
    font-size: 28px;
    height: 80px;
    width: 79%;
    margin: 20px auto 0;
    display: flex;
    justify-content: center;
  }

  .reference{
    display: flex;
    flex-direction: column;
    width: 79%;
    border-top: 1px solid #c93d3d;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 20px;
  }
</style>