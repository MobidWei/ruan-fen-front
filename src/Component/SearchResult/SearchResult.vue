<template>
  <div class="table">
    <div class="table__con">
      <div class="table__search flex align-center justify-between">
        <div class="table__search__lf flex align-center">
          <div>检索范围：</div>
          <span class="total__inf">总库</span>
          <span class="topic">主题：1</span>
          <span class="btn-topic pointer">主题定制</span>
          <span class="btn-topic pointer">检索历史</span>
        </div>
        <div class="table__search__fr flex align-center">
          <div class="result">总共找到<span>147,219</span>条结果</div> 
          <div class="page flex align-center justfiy-center">
            <span>1/300</span>
            <span class="btn-next flex align-center justify-center  pointer"><el-icon><CaretRight /></el-icon></span>
          </div>
        </div>
      </div>
      <div class="filter__se flex align-center justify-between">
        <div class="filter__se__lf  flex align-center">
          <el-checkbox label="全选" v-model="checkAll" @change="changeCheckAll"/>
          <div class="m-l-20">已选<span class="col1 m-l-5">{{multipleSelection.length}}</span></div>
          <span class="pointer m-l-20" @click="clearHandle">清除</span>
          <div class="m-l-20 flex align-center">
          <span class="pointer btn-batch ">批量下载</span>
          <span class="pointer btn-batch ">导出分析<el-icon class="m-l-5"><CaretBottom /></el-icon></span>
        </div>
        </div>
        <div class="filter__se__rf  flex align-center">
          <span>排序：<span class="pointer" :class="{'active':searchParams.relevant !== ''}" @click="handleFilter('relevant')">相关度<el-icon v-if="searchParams.relevant ===1"><Bottom /></el-icon><el-icon v-if="searchParams.relevant ===2"><Top /></el-icon></span></span>
          <span class="m-l-20 pointer" :class="{'active':searchParams.publishTime !== ''}" @click="handleFilter('publishTime')">发表时间<el-icon v-if="searchParams.publishTime ===1"><Bottom /></el-icon><el-icon v-if="searchParams.publishTime ===2"><Top /></el-icon></span>
          <span class="m-l-20 pointer" :class="{'active':searchParams.reference !== ''}" @click="handleFilter('reference')">被引<el-icon v-if="searchParams.reference ===1"><Bottom /></el-icon><el-icon v-if="searchParams.reference ===2"><Top /></el-icon></span>
          <span class="m-l-20 pointer" :class="{'active':searchParams.download !== ''}" @click="handleFilter('download')">下载<el-icon v-if="searchParams.download ===1"><Bottom /></el-icon><el-icon v-if="searchParams.download ===2"><Top /></el-icon></span>
          <span class="m-l-20 pointer" :class="{'active':searchParams.type !== ''}" @click="handleFilter('type')">综合<el-icon v-if="searchParams.type ===1"><Bottom /></el-icon><el-icon v-if="searchParams.type ===2"><Top /></el-icon></span>
          <div class="flex align-center m-l-20">
            <span class="flex-shrink">显示：</span>
            <el-select
      v-model="searchParams.pageSize"
      style="width: 60px"
    >
      <el-option
        v-for="item in pages"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
          </div>
          <span class="m-l-20 btn-sel pointer"><el-icon><FullScreen /></el-icon></span>
          <span class="m-l-10 btn-sel pointer"><el-icon><List /></el-icon></span>
        </div>
      </div>

      <div class="table__cont__info">
      <el-table
    ref="multipleTableRef"
    :header-cell-style="{background:'#f2f2f2'}"
    stripe
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    @row-click="goDetail"
  >
    <el-table-column type="selection"   width="55" />
    <el-table-column  label="序号" width="55">
          <template #default="scope">
                {{ scope.$index+1 }}
          </template>
    </el-table-column>

    <el-table-column label="题名" >
      <template #default="scope">{{ scope.row.name }}</template>
    </el-table-column>
    <el-table-column prop="author" label="作者" width="160" />
    <el-table-column prop="source" label="来源" width="160" />
    <el-table-column prop="date" label="发表时间" width="160" />
    <el-table-column prop="database" label="数据库" width="120" />
  </el-table>
</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref,watch} from 'vue'
interface Book {
  id: number
  name: string
  author:string
  source:string
  date:string
  database:string
}
interface Params {
  pageSize: number,
  relevant:number|string,
  publishTime:number|string,
  reference:number|string,
  download:number|string,
  type:number|string,
}
let pages = [
  {label:"20",value:20},
  {label:"30",value:30},
  {label:"40",value:40},
]
let multipleTableRef = ref<any>()
let checkAll = ref<boolean>(false)
let searchParams = ref<Params>({
  pageSize:20,
  relevant:'',
  publishTime:'',
  reference:'',
  download:'',
  type:'',
})
// const selectable = (row: Book) => !!multipleSelection.value.map((item:Book) => item.id).includes(row.id)
const multipleSelection = ref<Book[]>([])
  const   tableData: Book[] = [
  {
    id: 1,
    name: '江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道',
    author:'刘明洋，杨红',
    source:"森林工程",
    date:'2024-12-11 11:11:11',
    database:"期刊"
  },
 
  {
    id: 2,
    name: '江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道',
    author:'刘明洋，杨红',
    source:"森林工程",
    date:'2024-12-11 11:11:11',
    database:"期刊"
  },
  {
    id: 3,
    name: '江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道',
    author:'刘明洋，杨红',
    source:"森林工程",
    date:'2024-12-11 11:11:11',
    database:"期刊"
  },
  {
    id: 4,
    name: '江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道',
    author:'刘明洋，杨红',
    source:"森林工程",
    date:'2024-12-11 11:11:11',
    database:"期刊"
  },
  {
    id: 5,
    name: '江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道',
    author:'刘明洋，杨红',
    source:"森林工程",
    date:'2024-12-11 11:11:11',
    database:"期刊"
  },
  {
    id: 6,
    name: '江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道江苏省南京市秦淮区夫子庙街道',
    author:'刘明洋，杨红',
    source:"森林工程",
    date:'2024-12-11 11:11:11',
    database:"期刊"
  },
]
watch(()=>multipleSelection.value,(nv)=>{
  checkAll.value = nv.length === tableData.length && nv.length !==0
})
const handleSelectionChange = (val: Book[]) => {
  console.log(val)
  multipleSelection.value = val
}
const goDetail = (row:Book) =>{
  console.log('ahha',row)
  alert(row.id)
}
const changeCheckAll = (e:boolean)=>{
 
  multipleSelection.value = e?tableData:[]

  if(e){

    multipleTableRef.value.clearSelection()
    multipleTableRef.value.toggleAllSelection()
  }else{
    multipleTableRef.value.toggleAllSelection()
  }
  
}
const clearHandle = () => {
  multipleSelection.value = []
  multipleTableRef.value.clearSelection()
}
const handleFilter = (tag:string)=>{
  if(tag === 'publishTime') {
    // searchParams.value[tag] = searchParams.value[tag] === 1? 2:1
    Object.assign(searchParams.value,{
      reference:'',
      download:'',
      type:'',
      relevant:''
    })
   
  }
  if(tag === 'reference') {
    // searchParams.value[tag] = searchParams.value[tag] === 1? 2:1
    Object.assign(searchParams.value,{
      publishTime:'',
      download:'',
      type:'',
      relevant:''
    })
    
  }
  if(tag === 'download') {
    // searchParams.value[tag] = searchParams.value[tag] === 1? 2:1
    Object.assign(searchParams.value,{
      publishTime:'',
      reference:'',
      type:'',
      relevant:''
    })
    
  }
  if(tag === 'type') {
    // searchParams.value[tag] = searchParams.value[tag] === 1? 2:1
    Object.assign(searchParams.value,{
      publishTime:'',
      reference:'',
      download:'',
      relevant:''
    })
    
  }
  if(tag === 'relevant') {
    Object.assign(searchParams.value,{
      publishTime:'',
      reference:'',
      download:'',
      type:''
    })
  }
  searchParams.value[tag] =searchParams.value[tag] ===""?1: searchParams.value[tag] === 1? 2:1
}
</script>
<style lang="scss" scoped>
.table{
  width: 95%;
  margin: 0 auto;
  &__con{

    .table__search{
      padding: 20px 0;
      &__lf{
        span{
          margin-right: 20px;
        }
        .total__inf{
          font-weight: bold;
          color:#295cdc;
        }
      
        .btn-topic{
          width: 90px;
          line-height: 30px;
          background: #e5ecfb;
          text-align: center;
       
          color: #295cdc;
        }
      }
      &__fr{
        .result{
          span{
            margin: 0 14px;
            color: #295cdc;
          }
        }
        .page{
          margin:0 0 0 25px;
        }
        .btn-next{
          width: 28px;
          height: 28px;
          background: #f8f8f8;
          border: 1px solid #d8d8d8;
          margin-left: 14px;
        }
      }
    }
    .filter__se{
      padding:12px 20px;
      margin-bottom: 20px;
      border:1px solid #dae0e8;
      background: #f1f2f3;
      &__lf{
    
        .col1{color: #295cdc;}
        .btn-batch{
          border: 1px solid #d6d6d6;
          line-height: 30px;
          padding:0 10px;
          margin-right: -1px;
        }
      }
      &__rf{
        span.active{
          color: #295cdc;
        }
        .btn-sel{
          width: 30px;
          color:#ccc;
          border-radius: 3px;
          height: 30px;
          border:1px solid #d6d6d6;
          font-size: 30px;
        }
      }
    }
    .table__cont__info{
      :deep(.el-table__row){
        cursor: pointer;
      }
    }
  }
}
</style>