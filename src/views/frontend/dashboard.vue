<template>
  <div class="container">
    <div class="container">
      <Navbar></Navbar>
    </div>
    <div class="container">
      <h2>User Profile</h2>
      <h2>Name:{{ user.name }}</h2>
      <h2>Name:{{ user.email }}</h2>
    </div>
  </div>
</template>

<script>
  import Navbar from "./navbar";
  // import axois from "axios";
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        user: {
          name: "",
          email: "",
        },
      };
    },
    mounted() {
      // axois.get("http://quiz.test/api/v1/auth/profile").then((response) => {
      //   console.log(response);
      // });
      axios
        .get("http://quiz.test/api/v1/auth/profile")
        .then((res) => {
          this.user = res.data;
          console.log("profile is:", res.data);
        })
        .catch((error) => console.log(error));
    },
  };
</script>

<style></style>
