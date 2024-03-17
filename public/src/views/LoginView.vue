<template>
  <main>
    <div class="">
      <div class="row mt-5">
        <div class="col-md-4"></div>
        
          <div class="col-md-4">
            <div class="login-box">
              <div class="p-5">
                <h1 class="title" style="margin: 10px 190px;">Login</h1>
                <form>
                  <div class="form-group">
                    <label for="name">User Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" v-model="form_data.username" placeholder="Enter User Name">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form_data.email" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    <div class="text-danger" >{{this.validation_msg}}</div>

                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="form_data.password">
                  </div>
                  <button type="button" class="btn btn-primary mt-3" @click="loginUser" > Sign In</button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-md-4"></div>
        </div>

    </div> 
  </main>
</template>

<script>

import axios from 'axios'

export default {
    data() {
      return {
        responce: {},
        validation_msg: '',
        accessToken: '',
        form_data : {
          username : 'shivang',

          email : 'shivang@gmail.com',
          password : '12345678'
        },
      }
    },
    mounted() {

      
    },
    updated() {

    },
    methods: {
      async loginUser() {
        
        this.validation_msg = '';

          this.responce = await axios.get(
            `http://localhost:9000/api/users/login`, 
            { 
              params: {
                username : this.form_data.username,
                email : this.form_data.email,
                password : this.form_data.password
              }
            }).then(res => {

              if (res.status == 200) {
                this.accessToken = res.data.accessToken;
                localStorage.setItem('accessToken', this.accessToken);
                this.$router.push('/login');
              } 
              if(this.accessToken == '')
              {
                this.validation_msg = 'Some thinsg went wrong, Try again!';
              }
              console.log(this.accessToken);

            }).catch((err) => {
              if (err.response && err.response.data) {
                this.validation_msg = err.response.data.message;
              }
            });

        }

    }
  }


</script>
