<template>
  <!-- Views -->
  <f7-views>
    <!-- Your teams view, should have "teams" prop -->
    <f7-view main>
      <!-- Pages container, because we use fixed navbar and toolbar, it has additional appropriate props -->
      <f7-pages navbar-fixed toolbar-fixed>
        <!-- Initial Page -->
        <f7-page>
          <!-- Top Navbar-->
          <f7-navbar title="DG Chat"></f7-navbar>
          <!-- Toolbar-->
          <f7-toolbar>
            <f7-link>Link 1</f7-link>
            <f7-link>Link 2</f7-link>
          </f7-toolbar>
          <f7-list form>
          <!-- Page Content -->
            <f7-list-item>
              <f7-label>用户名</f7-label>
              <f7-input type="text" placeholder="聊天用户名" v-model="username"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-button @click="startChat" big fill>GO</f7-button>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-views>
</template>

<script>
    export default {
      name: 'index',
      data: function(){
        return{
          username:'',
          id:''
        }
      },
      sockets:{
        connect: function(){  //这里是监听connect事件
          console.log("connected");
        },
        bindusername: function(val){
          if(val == "SUCCESS"){
            console.log("OK....");
            this.$f7.mainView.router.load({url:"/show"});
          }else{
            console.log("ERROR....");
          }
        }
      },
      mounted(){
        this.id=this.$socket.id
      },
      methods: {
        startChat(){
          if(this.username == ''){
            return;
          }else{
            this.$socket.emit('bindusername', this.username);
          }
        }
      }
    }
</script>
