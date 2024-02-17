<template>
  <main>
    <div class="">
        <h2 class="title is-2" style="margin: 10px 150px;">Chat App</h2>
        <div class="chat-box">
            <div>
                <div class="chat" v-for="m in msgs">
                  <div :class="{'text-left d1' : m.type == 'l', 'text-right d1': m.type=='r'}">
                    <span :class="{'message-left' : m.type == 'l', 'message-right': m.type=='r'}">{{m.msg}}</span>
                  </div>
                </div>
                <div class="clr"></div>
            </div>
        </div>
    </div>   
    <div class="text-part">
      <div class="row">
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

export default {
    data() {
      return {
        messageVal : "",
        msgs : [],
        socket : io('http://localhost:9000', {path: '/chat/socket.io'})
      }
    },
    mounted() {
      console.log("Mounted");
      this.socket.on('message', (data) => {
        this.getMessage(data)
      });
      
    },
    updated() {
        this.updateScroll()
    },
    methods: {
        sendMessage() {
            this.socket.emit('user-message', {
              message: { message: this.messageVal, id: this.socket.id }
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
        }
    }
  }


</script>
