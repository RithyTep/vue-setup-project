<template>
  <main class="login-page">
    <header class="login-header">{{ currentTime }} GMT-4</header>

    <section class="login-content">
      <div class="login-heading">Sign in</div>
      <el-form :model="loginFormData" label-position="top" @submit.prevent="onSubmit" class="login-form"
        :hide-required-asterisk="true">
        <el-form-item prop="Username" label="Username">
          <el-input id="UsernameLogin" v-model="loginFormData.Username" type="text" placeholder="Enter username"
            maxlength="20" />
        </el-form-item>
        <el-form-item prop="Password" label="Password">
          <el-input id="PasswordLogin" v-model="loginFormData.Password" :type="inputPassword"
            placeholder="Enter password" maxlength="20">
            <template #suffix>
              <button type="button" class="password-toggle" @click="showPassword">
                <el-icon v-if="inputPassword === 'password'" :size="12">
                  <ViewIcon />
                </el-icon>
                <el-icon v-else :size="12">
                  <HideIcon />
                </el-icon>
              </button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Language">
          <el-select v-model="loginFormData.Languages" class="language-select">
            <el-option v-for="item in languages" :key="item.code" :label="item.text" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-button id="btn-login" class="login-button" type="primary" native-type="submit">
          Sign In
        </el-button>
      </el-form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';

const loginFormData = ref({
  Username: '',
  Password: '',
  Languages: 'en',
});
const inputPassword = ref('password');
const languages = [{ code: 'en', text: 'English' }];
const formatTime = () => new Date().toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});
const currentTime = ref(formatTime());
const timer = window.setInterval(() => currentTime.value = formatTime(), 1000);

const onSubmit = () => {
  console.log('Login submitted:', loginFormData.value);
};

const showPassword = () => {
  inputPassword.value = inputPassword.value === 'password' ? 'text' : 'password';
};

onUnmounted(() => window.clearInterval(timer));
</script>
<style scoped>
.login-page {
  min-height: 100vh;
  padding-top: 40px;
  color: #12345b;
  background: #dbeeff url('src/assets/background_login.jpg') center center / cover no-repeat;
}

.login-header {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  background: #12345b;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(368px, calc(100vw - 32px));
  transform: translate(-50%, -50%);
}

.login-heading {
  margin-bottom: 16px;
  padding-left: 24px;
  color: #12345b;
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.login-form {
  width: 100%;
  padding: 24px 24px 28px;
  background: #ecf5ff;
  border: 2px solid #c6e2ff;
  border-radius: 8px;
  box-shadow: 0 10px 28px rgb(18 52 91 / 15%);
}

:deep(.el-form-item) {
  margin-bottom: 16px;
}

:deep(.el-form-item__label) {
  margin-bottom: 4px;
  color: #12345b;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
}

:deep(.el-input__wrapper),
:deep(.el-select .el-input__wrapper) {
  min-height: 32px;
  padding: 1px 12px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #b9d5f0 inset;
}

.language-select,
.login-button {
  width: 100%;
}

.password-toggle {
  padding: 0;
  color: #3976ad;
  font-size: 11px;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.login-button {
  height: 32px;
  margin-top: 4px;
  color: #fff;
  font-weight: 500;
  background: #2477c5;
  border-color: #2477c5;
}

@media (max-width: 480px) {
  .login-content {
    top: 52%;
  }

  .login-heading {
    font-size: 32px;
  }
}
</style>
