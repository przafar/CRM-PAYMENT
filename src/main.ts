import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { vuetify } from '@/plugins/vuetify' 

if (process.env.NODE_ENV === 'development') {
  window.addEventListener('error', (e) => {
    if (
      typeof e.message === 'string' &&
      e.message.includes('ResizeObserver loop')
    ) {
      e.stopImmediatePropagation()
      console.warn('Suppressed ResizeObserver loop warning')
    }
  })
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')