<template>
  <main>
    <div class="">
        <h2 class="title is-2" style="margin: 10px 150px;">Chat App</h2>
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-2">
            <div class="chat-box">
              <div class="user-list" v-for="single in userList" :key="single._id" 
              @click="getUserId(single._id, single.username)" >{{single.username}} <span>online</span></div>
            </div>
          </div>
          
          <div class="col-md-8">
            <div class="chat-box">
              <div class="user-list" v-if="user_name" >{{user_name}}</div>
                <div>
                    <div class="chat" v-for="m in msgs" :key="m.type">
                      <div :class="{'text-left d1' : m.to==toUser, 'text-right d1': m.from == fromUser}">
                        <span :class="{'message-left' : m.to==toUser, 'message-right': m.from == fromUser}">{{m.message}}</span>
                      </div>
                    </div>
                    <div class="clr"></div>
                </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>

    </div>   
    <div class="text-part">
      <div class="row" v-if="user_name">
        <div class="col-md-10">
          <input type="text"  class="form-control" v-model="messageVal" id="chatinput">
        </div>
        <div class="col-md-2">
          <button class="btn btn-button btn-success btn-block" @click="sendMessage" >Send</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import io from 'socket.io-client';
import axios from 'axios'

export default {
    data() {
      return {
        messageVal : "",
        fromUser : "65d0fcb73fa6d7f605f3323b",
        toUser : "",
        user_name : "",
        form_data : {
            from : '',
            to : ''
        },
        msgs : [],
        chatList: [],
        userList : [],
        socket : io('http://localhost:9000', {path: '/chat/socket.io'})
      }
    },
    mounted() {
      this.socket.on('message', (data) => {
        this.getMessage(data)
      });
      this.getList();
      
    },
    updated() {
        this.updateScroll();
    },
    methods: {
        sendMessage() {
            this.socket.emit('user-message', {
              message: { message: this.messageVal, to: this.toUser, from: this.fromUser }
            });
            this.msgs.push({
                type: "r",
                msg: this.messageVal
            });
            this.messageVal = "";
        },
        getMessage(Data) {
          if(Data.msg.id != this.socket.id){
            this.msgs.push({
                type: 'l',
                msg: Data.msg.message
            });
          }
        },
        updateScroll: function() {
          window.scrollTo(0,document.body.scrollHeight)
        },
        async getList() {
            this.userList = await axios.get(`http://localhost:9000/api/users/`)
            this.userList = this.userList.data;
        },
        async getUserId(id, user_name){
          this.toUser = id;
          this.user_name = user_name;
          this.form_data = {
            from : this.fromUser,
            to : this.toUser
          },
          console.log(this.form_data);
          this.msgs = await axios.get(`http://localhost:9000/api/users/messageList`, {
            params: {
              from : this.fromUser,
              to : this.toUser
            }
          })
          this.msgs = this.msgs.data;
          console.log(this.msgs);
        }
    }
  }


</script>
