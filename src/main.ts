import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from './router/index.ts'
import './assets/main.css'
import { Hide, View } from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())

app.component('ViewIcon', View)
app.component('HideIcon', Hide)

const pinia = createPinia()
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
