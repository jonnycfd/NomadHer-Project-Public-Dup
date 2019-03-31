<template>
  <div class="user-list">
    <li style="list-style: none" v-for="user in userList">
      <button class="userbutton" v-on:click="setUserId(user.userID)">{{ user.userID }}</button>
    </li>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { db } from '@/js/firebase.js';

export default {
  name: 'UserList',
  data: function () {
    return {
      userList: [{name:"1"},{name:"2"}],
    }
  },
  methods: {
    ...mapActions(['setCurrentUser']),
    setUserId(id) {
      this.setCurrentUser(id);
    }

  },
  mounted: function () {
      let vm = this;
      const users_ref = db.collection("users").onSnapshot(function(snapshot){
          let jsonarr = [];
          const myObject = snapshot;
          const userListLen = myObject.docs.length;
          for (var i = 0; i < userListLen; i++){
              var newID = {"userID":myObject.docs[i].id}
              jsonarr.push(newID)

          }
          vm.userList = jsonarr
      });
  }
}
</script>

<style scoped>
.user-list {
  float: left;
  width: 10vh;
  height: 100vh;
  overflow-y: scroll;

}

.userbutton {
  border:solid #ff7675 6px;
  border-bottom: solid #ff7675 3px;
  border-top: solid #ff7675 3px;
  background: white;
  width:100%;
  height: 8vh;
  font-size: 20px;
  color: #636e72;
  transition: all 0.5s;
  overflow:auto;
  text-align:center;
}

.userbutton:hover{
  background:#fab1a0;
  font-size: 22px;

}
.userbutton:focus {
  background:#fab1a0; 
  color:white;
  font-size: 22px;
}
</style>
