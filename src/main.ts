import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import Home from './pages/Home.vue'

import License from './pages/License.vue'
import NotFound from './pages/NotFound.vue'
import AppPage from './pages/AppPage.vue'

import Card from './components/apps/Card.vue'
import LuoCode from './components/apps/LuoCode.vue'
import Paperboard from './components/apps/Paperboard.vue'


export const routes = [
  { path: '/apps', component: Home, meta: { type: 'home', icon: 'hive' } },
  {
    path: '/apps/luocode', component: AppPage, meta: {
      type: 'app', icon: 'bx-barcode-reader', component: LuoCode,
      title: '与依论吃',
      description: '基于文本替换的加解密工具'
    }
  },
  {
    path: '/apps/paperboard', component: AppPage, meta: {
      type: 'app', icon: 'bx-images', component: Paperboard,
      title: '天依举牌',
      description: '天依举牌表情包生成器'
    }
  },
  {
    path: '/apps/card', component: AppPage, meta: {
      type: 'app', icon: 'bx-id-card', component: Card,
      title: '天依卡',
      description: '虚拟身份卡申请系统'
    }
  },
  {
    path: '/apps/license', component: License, meta: {
      type: 'page',
      title: '许可',
      description: '二次创作与开放源代码许可'
    }
  },
  { path: '/404',     component: NotFound },
  { path: '/:_(.*)*', component: NotFound },
]

export const createApp = ViteSSG(
  App,
  { routes },
)
