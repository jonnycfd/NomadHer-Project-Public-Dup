<template>
  <div class="user-list">
    <li v-for="user in userList">
      <button v-on:click="setUserId(user.userID)">{{ user.userID }}</button>
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
  border: solid black 1px;
}
</style>
