<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="card m-auto w-50 ">
      <br /><br />
      <div class="card-header">
        <h2>User Login</h2>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="userEmail">Email</label>
          <input
            type="email"
            v-model="user.email"
            class="form-control"
            id="userEmail"
            placeholder="Enter email"
          />
          <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
        </div>
        <div class="form-group">
          <label for="userpass">Password</label>
          <input
            type="password"
            v-model="user.password"
            class="form-control"
            id="userpass"
            placeholder="Password"
          />
        </div>
        <button type="submit" @click="userLogin()" class="btn btn-primary">
          Login
        </button>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from "../navbar";
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        user: { email: null, password: null },
      };
    },
    methods: {
      userLogin() {
        axios
          .post("/oauth/token", {
            username: this.user.email,
            password: this.user.password,
            client_id: 2,
            client_secret: "u8R0eFx8rOvoq9B2mAAp04I53M7xroRcmbrRWpJJ",
            grant_type: "password",
          })
          .then((response) => {
            // console.log(response);
            // iziToast.success({
            //   title: "Caution",
            //   message: "Login successfully",
            // });
            // console.log(response.data.access_token);
            let token = response.data.access_token;
            localStorage.setItem("AToken", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            this.$router.push({ name: "dashboard" });
            console.log("login data", response);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
</script>
