import Vue from "vue";
import Router from "vue-router";

const TheContainer = () => import("@/container/TheContainer");
const Home = () => import("@/views/Home.vue");
const Analytics = () => import("@/views/Analytics.vue");
const NlpModel = () => import("@/views/NlpModelView");

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: TheContainer,
      children: [
        {
          path: "home",
          name: "Home",
          component: Home
        },
        {
          path: "analytics",
          name: "Analytics",
          component: Analytics
        },
        {
          path: "nlpModel",
          name: "NlpModel",
          component: NlpModel
        }
      ]
    }
  ]
});

export default router;
