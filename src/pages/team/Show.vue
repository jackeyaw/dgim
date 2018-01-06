<template>
  <f7-page>
    <!-- For Material theme we use navbar-fixed layout so the navbar should be a child of the Page -->
    <f7-navbar title="DGChat" back-link="Back">
      <f7-nav-right>
        <f7-link @click="chooseUser"><i class="icon iconfont icon-fasongfankui toolbar-icon"></i></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <!-- Page content -->
    <f7-messages>
      <f7-message v-for="message in messages" key="m" :date="message.date" :name="message.msgType=='sent'?'':message.sourceClientId" :text="message.msgContent" :type="message.msgType"></f7-message>
    </f7-messages>

    <f7-toolbar bottom>
      <f7-link><i class="icon iconfont icon-yuyin toolbar-icon"></i></f7-link>
      <f7-input type="text" placeholder="Messages" class="tool-bar-input" v-model="msgText"/>
      <f7-link class="float-right"><i class="icon iconfont icon-fasong1 toolbar-icon" @click="clickButton"></i></f7-link>
      <f7-link><i class="icon iconfont icon-fasongbiaoqing toolbar-icon"></i></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
    export default {
      name: 'show',
      data(){
        return{
          id:'',
          msgText:'',
          messages:[],
          toUser:''
        }
      },
      sockets:{
        connect: function(){  //这里是监听connect事件
          console.log("connected");
        },
        messageevent: function(val){
          this.messages.push(val);
        }
      },
      mounted(){
        this.id=this.$socket.id
      },
      methods: {
        clickButton: function(){
          if(this.msgText == ''){
            return;
          }
          if(this.toUser == ''){
            return;
          }
          var now = new Date();
          var message = {
            sourceClientId: "ddd",
            targetClientId: this.toUser,
            msgType: 'sent',
            date:this.parseDate(now,"yyyy-MM-dd hh:mm"),
            msgContent: this.msgText
          };
          this.messages.push(message);
          // $socket is socket.io-client instance
          this.$socket.emit('messageevent', message);
          this.msgText = '';
        },
        parseDate(date,fmt){
          var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        },
        chooseUser(){
          this.$f7.prompt("对方用户名：",function(value){
            if(value != '') {
              this.toUser = value;
            }
          })
        }
      }
    }
</script>
<style>
  i.toolbar-icon{
    font-size:1.6rem;
  }
  .float-right{
    float:right;
  }
  .tool-bar-input input{
    width: 13rem;
    height: 1.4rem;
  }
  </style>
