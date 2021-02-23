<template>
  <div class="container">
    <h2>User Profile</h2>
    <h2>Name:{{ user.name }}</h2>
    <h2>Name:{{ user.email }}</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          name: "",
          email: "",
        },
      };
    },
    mounted() {
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
