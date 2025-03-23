import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/storeAuth.js"; // Store di autenticazione
import Signup from "../views/Singup.vue";
import Signin from "../views/Signin.vue";
import PasswordChange from "../views/PasswordChange.vue";
import PasswordForgot from "../views/PasswordForgot.vue";
import PasswordReset from "../views/PasswordReset.vue";
import DashBoard from "../views/DashBoard.vue";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import About from "../views/About.vue";
import DeleteAccount from "../views/DeleteAccount.vue";
import AddComment from "../components/AddComment.vue";
import UserComments from "../components/UserComments.vue";
import Chat from "../views/Chat.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/about", component: About },
  { path: "/signup", component: Signup },
  { path: "/signin", component: Signin },
  { path: "/password-forgot", component: PasswordForgot },
  { path: "/chat", component: Chat, meta: { requiresAuth: true } },
  {
    path: "/reset-password",
    name: "reset-password",
    component: PasswordReset,
    props: (route) => ({ token: route.query.token }),
  },
  {
    path: "/dashboard",
    component: DashBoard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "password-change",
        component: PasswordChange,
        meta: { requiresAuth: true },
      },
      {
        path: "delete-account",
        component: DeleteAccount,
        meta: { requiresAuth: true },
      },
      {
        path: "add-comment",
        component: AddComment,
        meta: { requiresAuth: true },
      },
      {
        path: "user-comments",
        component: UserComments,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/auth-app-frontend/"),
  routes,
});

// Aggiungi un navigation guard globale
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Usa lo store di autenticazione per verificare l'utente

  // Se la rotta richiede autenticazione
  if (to.meta.requiresAuth) {
    if (authStore.user.isLoggedIn) {
      // Se l'utente è autenticato, permetti l'accesso
      next();
    } else {
      // Se l'utente non è autenticato, reindirizzalo al login
      next("/signin");
    }
  } else {
    next(); // Altrimenti, permetti l'accesso
  }
});

export default router;
