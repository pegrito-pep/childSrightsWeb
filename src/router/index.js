import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import AllLearners from '@/views/learners/AllLearners.vue'
import Quiz from '@/views/quizzes/Quiz.vue'
import ListQuestions from '@/views/questions/ListQuestions.vue'
import QuizDetail from '@/views/quizzes/QuizDetail.vue'
import VersionDetail from '@/views/versions/VersionDetail.vue'
import Theme from '@/views/themes/ListTheme.vue'
import Droit from '@/views/droits/ListDroits.vue'
import i18n from '../i18n.js'


Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'home',
        component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
  },
    {
      path: '/quizzes',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/questions',
      name: 'list-questions',
      component: ListQuestions
    },
    {
			path: '/quiz-details/:idQuiz',
			name: '/quiz-details',
			component: QuizDetail
		},
    {
			path: '/version-details/:idVersion',
			name: '/version-details',
			component: VersionDetail
		},
    {
      path: '/learners',
      name: 'AllLearners',
      component: AllLearners
    },
    {
      path: '/themes',
      name: 'theme',
      component: Theme
    },
    {
      path: '/doits',
      name: 'droit',
      component: Droit
    },
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/Register.vue')
    },
    {
        path: '/confirm',
        name: 'confirm',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/Confirm.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        meta: { layout: 'empty', noAuth: true },
        component: () =>
            import ('../views/auth/ForgotPassword.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach(async(to, from, next) => {
    if (to.matched.some(record => (record.meta.noAuth && true === record.meta.noAuth))) {
        next()
    } else {
        const access_token = storage.get('access_token')
        if (!access_token || access_token == null || access_token == '') {
            next({ name: 'login' })
        }
        next()
    }
})

export default router