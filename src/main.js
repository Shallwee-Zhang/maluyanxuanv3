import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index.js'
import './assets/fonts/iconfont.css'
import './assets/flexible'
import './assets/reset.css'
import vant from 'vant'
import 'vant/lib/index.css'



let app = createApp(App)


app.use(router)
app.use(vant)

app.mount('#app')
