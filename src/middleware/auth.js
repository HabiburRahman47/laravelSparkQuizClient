export default function auth({ next, router }) {
  console.log("here checking token");
  if (!localStorage.getItem("AToken")) {
    return router.push({ name: "login" });
  }

  return next();
}
