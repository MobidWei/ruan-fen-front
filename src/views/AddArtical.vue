<template>
  <header-vue></header-vue>
  <div class="downBox">
    <div class="claim">
      <div class="header">
        <div>添加文章</div>
      </div>
      <div></div>
      <el-row :gutter="20">
        <el-col :span="8"
          >标题
          <div class="grid-content ep-bg-purple"
        /></el-col>
        <el-col :span="8"
          >关键词
          <div class="grid-content ep-bg-purple"
        /></el-col>
        <el-col :span="4"
          >领域
          <div class="grid-content ep-bg-purple"
        /></el-col>
        <el-col :span="4"
          >其他属性
          <div class="grid-content ep-bg-purple"
        /></el-col>
      </el-row>
      <div class="common-layout">
        <el-container>
          <el-header>摘要</el-header>
          <el-main>内容</el-main>
        </el-container>
      </div>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <div style="width: 100%; margin: 30px 0; text-align: center">
        <el-button
          type="primary"
          size="large"
          color="#626aef"
          :dark="isDark"
          @click="open"
          >添加文章</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import headerVue from "@/component/header.vue";
import { ref, reactive, computed } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";

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

    const radiusGroup = ref([
      {
        name: "No Radius",
        type: "",
      },
      {
        name: "Small Radius",
        type: "small",
      },
      {
        name: "Large Radius",
        type: "base",
      },
      {
        name: "Round Radius",
        type: "round",
      },
    ]);
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
          validator: validateCaptcha,
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
      // 这里是open操作的逻辑
      console.log("执行open操作");
      // 例如，可以在这里调用一个方法，传入inputValue作为参数
    };

    const startCountdown = () => {
      if (!validateEmail()) return;
      canSend.value = false;
      sendConfirm(); // 执行open操作
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
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.demo-radius .title {
  color: var(--el-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--el-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .radius {
  height: 40px;
  width: 70%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
}
</style>