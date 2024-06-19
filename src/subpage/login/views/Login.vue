<script setup lang="ts">
import { ref, onMounted } from 'vue'

const username = ref('')
const password = ref('')
const autoLogin = ref(false)
const disableSubmit = ref(true)
const showLoading = ref(false)
const showLogin = ref(false)

const updateSubmit = () => {
  disableSubmit.value = username.value === '' || password.value === ''
}

const login = () => {
  showLoading.value = true
  showLogin.value = false

  // TODO: login请求

  // login error
  // setTimeout(() => {
  //   showLoading.value = false
  //   showLogin.value = true
  //   ElMessage.error({ message: 'login error' })
  // }, 2000)

  // login success
  setTimeout(() => {
    electronAPI.set('username', username.value)
    electronAPI.set('autoLogin', autoLogin.value)
    if (autoLogin.value) {
      electronAPI.set('session', 'ABC')
    }
    electronAPI.login()
  }, 2000)
}

onMounted(() => {
  const getLocalStore = async () => {
    const local_username = await electronAPI.get('username')
    const local_autoLogin = await electronAPI.get('autoLogin')
    const local_session = await electronAPI.get('session')

    username.value = typeof local_username !== 'undefined' ? local_username : ''
    autoLogin.value = typeof local_autoLogin !== 'undefined' ? local_autoLogin : true

    if (typeof local_session !== 'undefined') {
      // TOOD: 过期判断
      showLoading.value = true
      login()
    } else {
      showLogin.value = true
    }
  }

  getLocalStore().catch((err) => {
    ElMessage.error({ message: err })
  })
})
</script>

<template>
  <div class="login">
    <div class="login-wrap">
      <img class="logo" src="@/assets/logo.png" />
      <p class="loading" v-if="showLoading">正在登录…</p>
      <div class="login-form" v-if="showLogin">
        <el-form size="large">
          <el-form-item>
            <el-input
              v-model.trim="username"
              maxlength="20"
              placeholder="请输入用户名"
              @input="updateSubmit"
              clearable
              autofocus
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="password"
              maxlength="20"
              placeholder="请输入密码"
              type="password"
              @input="updateSubmit"
              @keyup.enter="login"
              clearable
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" :disabled="disableSubmit">登录</el-button>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="12" style="text-align: left">
            <el-tooltip effect="dark" content="支持30天内自动登录" placement="bottom-start">
              <el-checkbox v-model="autoLogin" label="自动登录" />
            </el-tooltip>
          </el-col>
          <el-col :span="12" style="text-align: right; padding-top: 6px">
            <el-link>忘记密码</el-link> | <el-link>注册账号</el-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  height: 100%;
  -webkit-app-region: drag;
}
.login-wrap {
  margin: 0 auto;
  width: 300px;
  text-align: center;
}
.logo {
  margin: 110px 0 30px 0;
}
.loading {
  font-size: 16px;
  margin-top: 40px;
}
.el-form-item {
  margin-bottom: 10px;
}
button {
  width: 300px;
  font-size: 16px;
}
</style>
