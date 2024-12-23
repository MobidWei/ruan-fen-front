<template>
  <header-vue></header-vue>
  <div class="downBox">
    <div class="claim">
      <div class="header">
        <div>认领门户</div>
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
            <el-input v-model="userName" input-style="width: 350px" disabled />
          </el-form-item>
          <el-form-item label="真实姓名：" size="large" prop="realName">
            <el-input v-model="ruleForm.realName" input-style="width: 350px" />
          </el-form-item>
          <el-form-item label="手机号：" size="large">
            <el-input v-model="phone" input-style="width: 350px" />
          </el-form-item>
          <el-form-item label="邮箱：" size="large" inline="true" prop="email">
            <el-input v-model="ruleForm.email" input-style="width: 350px" />
          </el-form-item>
          <el-form-item
            label="验证码："
            size="large"
            inline="true"
            prop="captcha"
          >
            <el-input v-model="userName" input-style="width: 200px" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="warning"
              @click="startCountdown"
              size="large"
              :disabled="!canSend"
              plain
              >{{ timeShow }}</el-button
            >
          </el-form-item>
          <el-form-item label="单位：" size="large">
            <el-input v-model="insitution" input-style="width: 350px" />
          </el-form-item>
        </el-form>
        <div style="width: 100%; margin: 30px 0; text-align: center">
          <el-button
            type="primary"
            size="large"
            color="#626aef"
            :dark="isDark"
            @click="open"
            >提交认证</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import headerVue from "@/Component/header.vue";
import { ref, reactive, computed, onMounted } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { request } from "../utils/http/request";

export default {
  components: {
    headerVue: headerVue,
  },
  name: "portalClaim",
  setup() {
    const userName = ref("123");
    const phone = ref("");
    const insitution = ref("");
    const canSend = ref(true);
    const countdown = ref(60);
    const realCaptcha = ref("");
    const timeShow = computed(() => {
      if (canSend.value) return "发送验证码";
      else return "请在" + countdown.value + "秒后再试";
    });

    const ruleFormRef = ref<FormInstance>();
    interface RuleForm {
      realName: string;
      email: string;
      captcha: string;
    }

    const validateEmail = () => {
      if (ruleForm.email === "") {
        ElMessage.error("请输入邮箱!");
        return false;
      } else if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(ruleForm.email)
      ) {
        ElMessage.error("请输入有效的邮箱地址!");
        return false;
      }
      return true;
    };
    const createCaptcha = () => {
      realCaptcha.value = "";
      for (let i = 0; i < 6; i++) {
        realCaptcha.value += Math.floor(Math.random() * 10);
      }
      realCaptcha.value = "123456";
    };
    const validateCaptcha = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入验证码!"));
      } else {
        if (ruleForm.captcha !== "") {
          if (!ruleFormRef.value) return;
          if (value !== ruleForm.captcha) callback(new Error("验证码错误!"));
        }
        callback();
      }
    };

    const ruleForm = reactive<RuleForm>({
      realName: "",
      email: "",
      captcha: "",
    });

    const rules = reactive<FormRules<RuleForm>>({
      realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      captcha: [
        {
          required: true,
          // validator: validateCaptcha,
          message: "",
          trigger: "blur",
        },
      ],
    });

    const open = () => {
      ElMessageBox.confirm("确认提交认证请求？", "确认信息", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sendConfirm();
        }).then(() => {
          ElMessage({
            type: "success",
            message: "提交成功！",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "提交取消。",
          });
        });
    };
    const sendConfirm = () => {
      console.log(123);
      request({
        url: "/search/article/allArticle",
        method: "get",
        // params: {
        //   email: ruleForm.email,
        //   code: realCaptcha,
        // },
      })
        .then((response) => {
          console.log(12333);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(12334);
          console.error(error);
        });
    };

    const startCountdown = () => {
      if (!validateEmail()) return;
      canSend.value = false;
      sendConfirm();
      let intervalId = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
        } else {
          countdown.value = 60;
          canSend.value = true;
          clearInterval(intervalId);
        }
      }, 1000);
    };

    onMounted(() => {
      createCaptcha();
    });
    return {
      userName,
      ruleForm,
      phone,
      insitution,
      rules,
      open,
      canSend,
      timeShow,
      startCountdown,
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
  width: 60%;
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