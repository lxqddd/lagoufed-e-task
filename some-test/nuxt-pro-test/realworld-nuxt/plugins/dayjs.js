import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format)
})
