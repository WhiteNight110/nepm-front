import { createRouter, createWebHashHistory } from "vue-router";
import { useTokenStore } from "@/stores/token";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/feedbackList",
    name: "FeedbackList",
    component: () => import("../views/FeedbackList.vue"),
  },
  {
    path: "/feedbackInfo",
    name: "FeedbackInfo",
    component: () => import("../views/FeedbackInfo.vue"),
  },
  {
    path: "/guidance",
    name: "Guidance",
    component: () => import("../views/guidance.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let tokenStore = useTokenStore();
  const token = tokenStore.token;
  if (token || to.path === "/login") {
    next();
  } else {
    console.log("token为空");
    next({ path: "/login" });
  }
});

export default router;
