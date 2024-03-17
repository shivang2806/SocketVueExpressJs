<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <RouterLink to="/" v-if="isLogin">Chat</RouterLink>
        </li>
        <li class="nav-item ml-3">
          <RouterLink to="/login" v-if="isLogin == false">Login</RouterLink>
        </li>
        <li class="nav-item ml-3">
          <RouterLink to="/signup" v-if="isLogin == false">Signup</RouterLink>
        </li>
        <li class="nav-item ml-3">
          <button type="button" @click="userLogout" class="btn btn-info" v-if="isLogin">Logout</button> 
        </li>

      </ul>
    </div>
  </nav>
</template>


<script>

export default {
    data() {
      return {
        isLogin : false,
        accesstoken : "",

      }
    },
    mounted() {
      this.accesstoken = localStorage.getItem('accessToken');
      if(this.accesstoken != null){
        this.isLogin = true;
      }


    },
    updated() {
      //
    },
    methods: {
      userLogout() {
        console.log('logout');  
          localStorage.removeItem('accessToken');
          this.$router.push('/login');

        }

    }
  }


</script>
