import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VTextField: {
      variant: 'outlined',
      rounded: 'md',
      density: 'comfortable',
      height: 36,
    },
    VSelect: {
      variant: 'outlined',
      rounded: 'md',
      density: 'comfortable',
      height: 36,
    },
    VTextarea: {
      variant: 'outlined',
      rounded: 'md',
      density: 'comfortable',
    },
    VMenu: {
      variant: 'outlined',
    },
    VDatePicker: {
      variant: 'outlined',
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary:   '#5b65dc',
          secondary: '#1976D2',
          accent:    '#82B1FF',
        },
      },
    },
  },
})