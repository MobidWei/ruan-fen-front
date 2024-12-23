<template>
  <header-vue></header-vue>
  <div class="downBox">
    <div class="claim">
      <div class="header">
        <div style="width: fit-content">
          登录<router-link
            to="/register"
            style="margin-left: 20px; font-size: 14px"
            >还没有账号？前往注册</router-link
          >
        </div>
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
            <el-input v-model="ruleForm.userName" input-style="width: 350px" />
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
            @click="login"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import headerVue from "@/component/header.vue";
import { ref, reactive, computed, onMounted } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { request } from "../utils/http/request";
import { useStore } from 'vuex'

export default {
  components: {
    headerVue: headerVue,
  },
  name: "loginView",
  setup() {
    const store = useStore();
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
          message: "",
          trigger: "blur",
        },
      ],
    });

    const login = () => {
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
            message: "登录成功！",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "登陆失败！请检查用户名密码是否正确！",
          });
        });
    };
    const sendConfirm = () => {
      request({
        url: "/user/login",
        method: "post",
        params: {
          username: ruleForm.userName,
          password: ruleForm.password,
        },
      })
        .then((response) => {
          store.dispatch("commitSetToken", response.data.data);
          store.dispatch("commitSetUserName", ruleForm.userName);
          store.dispatch("commitLogin", true);
          console.log(response);
          console.log(111);
        })
        .catch((error) => {
          console.log(error.data);
          return false;
        });
    };

    return {
      ruleForm,
      rules,
      login,
      store,
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
