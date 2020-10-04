import Vue from 'vue'
import Router from 'vue-router'
import NoteEdit from './views/NoteEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
         path: '/',
         name: 'noteEdit',
         component: NoteEdit,
      },
   ],
});
