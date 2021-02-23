import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/frontend/dashboard.vue";
import auth from "./middleware/auth";
//Quiz component
import QuizIndex from "./views/frontend/quiz/index.vue";
import QuizCreate from "./views/frontend/quiz/create.vue";
import QuizEdit from "./views/frontend/quiz/edit.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "frontend-master",
      component: () => import("../src/views/frontend/frontend-master.vue"),
      redirect: { path: "/home" },
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("../src/views/frontend/home/home.vue"),
        },
        {
          path: "product-details/:product_id",
          name: "product_details",
          component: () =>
            import("../src/views/frontend/home/product-details.vue"),
        },
        {
          path: "/log-out",
          name: "logout",
          component: () => import("../src/views/frontend/Auth/logOut.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      // redirect: "/dashboard",
      component: () => import("../src/views/frontend/Auth/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../src/views/frontend/Auth/Register.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        middleware: auth,
      },
      component: Dashboard,
      children: [
        {
          path: "profile",
          name: "profile",
          component: () => import("./views/frontend/profile"),
        },
        {
          path: "quiz-index",
          name: "quiz-index",
          component: QuizIndex,
        },
        {
          path: "quiz-create",
          name: "quiz-create",
          component: QuizCreate,
        },
        {
          path: "quiz-edit",
          name: "quiz-edit",
          component: QuizEdit,
        },
      ],
    },
  ],
  mode: "history",
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});
export default router;
