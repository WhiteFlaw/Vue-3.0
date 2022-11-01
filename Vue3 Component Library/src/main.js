import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ElSwitch, ElCard, ElCol, ElRow, ElInput, ElButton, ElTable, ElTree, ElInputNumber, ElAvatar, ElTag, ElInfiniteScroll } from 'element-plus';
import '../node_modules/element-plus/theme-chalk/index.css';

const app = createApp(App)

app.use(router)
    .use(ElSwitch)
    .use(ElCard)
    .use(ElRow)
    .use(ElCol)
    .use(ElButton)
    .use(ElInput)
    .use(ElTable)
    .use(ElTree)
    .use(ElInputNumber)
    .use(ElAvatar)
    .use(ElTag)
    .use(ElInfiniteScroll)

app.mount('#app')
