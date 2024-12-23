<template>
    <div class="wrap">
        <HeaderNav :page="currentPage" :field="field" :question="question" @sendData="handleData" @requestSearch="handleSearchRequest"/>
        <SearchResult :question="sharedData" :page="currentPage" :articles="articleList"/>
        <div class="pagination-container">
            <el-pagination
                    v-model:current-page="currentPage"
                    background
                    layout="prev, pager, next"
                    :total="totalItems"
                    @current-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import HeaderNav from "@/Component/HeaderNav.vue";
import SearchResult from "@/Component/SearchResult.vue";
import {ref, watch,defineProps} from 'vue';
import {searchArticlesByFieldWithPage} from "@/api/Search/search";
const sharedData = ref<{ search: string,field:string}>({search: '',field:''});
const handleData = (data: { search: string ,field:string}) => {
  sharedData.value = data;
};
interface Props {
  field: string;
  question: string;
}
const props = defineProps<Props>()
console.log(props)
const field = props.field===undefined?"主题":props.field
const question = props.question===undefined?'':props.question
// field = "来源";
// question = "1234";
// 定义响应式变量
const currentPage = ref<number>(1);
const totalItems = ref<number>(1000); // 总条目数

// 监听 currentPage 的变化
watch(currentPage, (newPage) => {
    console.log('当前页码:', newPage);
    // 在这里可以调用您的搜索函数或数据获取函数
    // fetchData(newPage);
});

// 处理页码变化的函数（可选）
const handlePageChange = (page: number) => {
    currentPage.value = page;
    // 可以在这里执行其他逻辑，例如获取新页的数据
    // fetchData(page);
};
const articleList = ref<any[]>([]);

// 当 SiblingA 发起搜索请求，带有要搜索的 field, text, page, pageSize
const handleSearchRequest = async (
  payload: { field: string; search: string; page: number; pageSize: number }
) => {
  try {
    const response = await searchArticlesByFieldWithPage(
      payload.field,
      payload.search,
      payload.page,
      payload.pageSize
    );
    console.log(response);
    if (response.code === 200) {
      // 返回值中 response.data = List<ArticleDoc>
      articleList.value = response.data;
    } else {
      console.error('搜索失败:', response.message);
      articleList.value = [];
    }
  } catch (err) {
    console.error('搜索错误:', err);
    articleList.value = [];
  }
};
</script>

<style scoped>
.wrap {
    background: #f3f4f7;
    height: 100vh;
    overflow: auto;
}

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
    /* 响应式调整 */
    @media (max-width: 600px) {
        .el-pagination {
            font-size: 12px;
        }
    }
}
</style>