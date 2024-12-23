<template>
  <header-vue></header-vue>
<div class="downBox">
    <div class="claim">
      <div class="header">
        <div>注册</div>
      </div>
      <div>
        <el-form
          label-width="100"
          style="max-width: 600px; margin: 0 auto"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          status-icon
          inline
        >
          <el-form-item label="用户名：" size="large">
            <el-input v-model="ruleForm.userName" input-style="width: 350px"/>
          </el-form-item>
          <el-form-item label="密码：" size="large" inline="true" prop="email">
            <el-input v-model="ruleForm.password" input-style="width: 350px" />
          </el-form-item>
        </el-form>
        <div style="width: 100%; margin: 30px 0; text-align: center">
          <el-button
            type="primary"
            size="large"
            color="#626aef"
            :dark="isDark"
            @click="register"
            >注册</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import headerVue from "@/component/header.vue";
import { ref, reactive, computed, onMounted } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { request } from "../utils/http/request";

export default {
  components: {
    headerVue: headerVue,
  },
  name: "registerView",
  setup() {

    const ruleFormRef = ref<FormInstance>();
    interface RuleForm {
      userName: string;
      password: string;
    }

    const ruleForm = reactive<RuleForm>({
      userName: "",
      password: "",
    });

    const rules = reactive<FormRules<RuleForm>>({
      userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    });

    const register = () => {
      ElMessageBox.confirm("确认登录？", "确认信息", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        sendConfirm();
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "注册成功！",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "注册失败，用户已存在！",
          });
        });
    };
    const sendConfirm = () => {
      request({
        url: "/user/register",
        method: "post",
        params: {
          username: ruleForm.userName,
          password: ruleForm.password,
        },
      })
        .then((response) => {
          console.log(URL);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(URL);
          console.error(error);
        });
    };

    return {
      ruleForm,
      rules,
      register,
    };
  },
};
</script>

<style scoped>
.downBox {
  width: 100%;
  background-color: #f9f9f9;
  min-height: 800px;
  padding-top: 20px;
}

.claim .header {
  width: 100%;
  height: 55px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.6);
}

.claim .header div {
  font-family: "微软雅黑";
  font-size: 16px;
  font-weight: bold;

  height: inherit;
  line-height: 55px;
  width: 80px;
  margin-left: 20px;
}

.claim {
  width: 50%;
  margin: 0 auto;

  border: 1px solid rgba(128, 128, 128, 0.6);
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 0 0 0 rgba(128, 128, 128, 0.6);
}

.inputLine {
  padding-left: 10%;
  font-family: "宋体";

  width: 80%;
  line-height: normal;
}

.left {
  font-size: 15px;
  display: inline-block;
  height: inherit;
  line-height: normal;
}

.el-input {
  display: inline-block;
  height: 40px;
}
</style>
