<template>
  <div class="login">
    <!-- 顶部导航栏 -->
    <header>
      <van-nav-bar :title="headerTitle" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-icon name="ellipsis" size="18" />
        </template>
      </van-nav-bar>
    </header>
    <!-- logo -->
    <img src="../../assets/logo.png" width="100" class="logo" alt="">
    <!-- 登录表单 -->
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="用户名" label="用户名" placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <!-- 验证码 -->
        <div style="display:flex;width: 100%;margin-top: 10px;">
          <div class="identify">验证码</div>
          <input type="text" placeholder="验证码" v-model="identifyVal">
          <div class="code" @click="refreshCode" style="width:112px">
            <Identify :identifyCode="identifyCode"></Identify>
          </div>
        </div>

        <!-- 文本提示 -->
        <div style="margin:16px;">
          <p class="link-register" @click="linkRegisterBtn">{{ isTitle ? '立即注册' : '已有账号，立即登录' }}</p>
          <van-button round block type="primary" native-type="submit">{{ isTitle ? '登录' : '注册' }}</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Identify from "../../components/Identify.vue"
import { register, login } from '@/api/index.js'
import { showNotify } from "vant"

let userInfo = reactive({
  username: "",//17001100999
  password: "",//123456
  isTitle: true, // 控制是登录还是注册 
});
let { username, password, isTitle } = toRefs(userInfo);

let identifyVal = ref('')  //用户输入的验证码
let headerTitle = ref('登录')

let route = useRoute()
let router = useRouter()




// 图形验证码
let identifyCodes = "1234567890"
let identifyCode = ref('3212')

// 随机数
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[
      randomNum(0, o.length)
    ];
    // 拼接生成的随机数
  }
}

// 刷新验证码
const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
}

// 钩子
onMounted(() => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
})








// 点击提交
let onSubmit = () => {
  // 判断验证码输入是否正确
  if (identifyCode.value == identifyVal.value) {
    if (isTitle.value) {
      // console.log('登录');
      login(username.value, password.value).then(res => {
        if (res.resultCode == 200) {
          localStorage.setItem('mlyxToken',JSON.stringify(res.data))
          showNotify({
            type: 'success',
            message: '登录成功！',
            duration: 1000,
          })
          setTimeout(() => {
            router.replace('/home')
          },1000)
        }
      })
    } else {
      // console.log('注册');
      register(username.value, password.value).then(res => {
        if (res.resultCode == 200) {
          showNotify({
            type: "success",
            message: res.message == 'SUCCESS' ? '注册成功' : res.message
          })

          let account = username.value
          setTimeout(() => {
            userInfo.isTitle = true
            linkRegisterBtn()
            username.value = account
          }, 2000)
        }
      })

    }
  } else {
    showNotify('验证码输入错误！请重新输入')
  }

  identifyVal.value = ''
  refreshCode()
}



// 点击返回
let onClickLeft = () => {
  router.replace('/home')
}


// 点击切换登录注册状态
let linkRegisterBtn = () => {
  isTitle = !isTitle;
 
  if (isTitle) {
    headerTitle.value = '登录'
  } else {
    headerTitle.value = '注册'
  }
  username.value = '';
  password.value = '';
  // 刷新验证码
  identifyVal.value = ''
  refreshCode()
}


</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;

  header {
    width: 100%;
    padding: 0 0.26667rem;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 0.02667rem solid #dcdcdc;
  }

  .logo {
    width: 3.2rem;
    height: 3.2rem;
    display: block;
    margin: 36px auto 0;
  }

  .login-form {
    padding: 0 0.53333rem;
    margin-top: 45px;
    .van-form {
      display: block;

      .identify {
        margin: 10px 16px;
        margin-right: 28px;
        font-size: 15px;
      }

      input {
        font-size: 16px;
        padding-left: 26px;
        width: 80px;
        height: 34px;
        margin-right: 20px;
        border: none;
        border-bottom: 1px solid rgb(226, 221, 221);
      }

      input::-webkit-input-placeholder {
        color: #aab2bd;
        font-size: 14px;
      }
    }

    /deep/.cerify-code-panel {
      display: flex;
      margin-top: 0.42667rem;
      height: 100%;
      overflow: hidden;

      .verify-code {
        width: 40% !important;
        height: 40px !important;
        line-height: 40px !important;
        font-size: 16px !important;
      }

      .verify-code-area {
        width: 54%;
        margin-left: 0.37333rem;

        .verify-input-area .varify-input-code {
          width: 2.4rem;
          height: 1.01333rem;
          border: 0.02667rem solid #e9e9e9;
          padding-left: 0.26667rem;
          font-size: 0.42667rem;
        }

        .verify-change-area {
          line-height: 1.17333rem;
          font-size: 12px;
        }
      }
    }

    :deep(.cerify-code-panel) {
      display: flex;
      margin-top: 0.42667rem;
      height: 100%;
      overflow: hidden;

      .verify-code {
        width: 40% !important;
        height: 40px !important;
        line-height: 40px !important;
        font-size: 16px !important;
      }

      .verify-code-area {
        width: 54%;
        margin-left: 0.37333rem;

        .verify-input-area .varify-input-code {
          width: 2.4rem;
          height: 1.01333rem;
          border: 0.02667rem solid #e9e9e9;
          padding-left: 0.26667rem;
          font-size: 0.42667rem;
        }

        .verify-change-area {
          line-height: 1.17333rem;
          font-size: 12px;
        }
      }
    }
  }

  .link-register {
    float: left;
    font-size: 0.37333rem;
    margin-bottom: 0.53333rem;
    color: #1989fa;
    display: inline-block;
  }

  .van-button--round {
    background: rgb(27, 174, 174) !important;
    border-color: rgb(27, 174, 174) !important;
  }
}
</style> 