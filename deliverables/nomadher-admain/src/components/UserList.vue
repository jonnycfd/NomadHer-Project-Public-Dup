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
      var jsonstr = "[]"
      var jsonarr = eval('('+jsonstr+')')
      const users_ref = db.collection("users").onSnapshot(function(snapshot){
      const userListLen = snapshot.docs.length;
      for (var i = 0; i < userListLen; i++){
          var newID = {"userID":snapshot.docs[i].id}
          jsonarr.push(newID)

      }
      });

      this.userList = jsonarr
      console.log(this.userList)
  }
}
</script>

<style scoped>
.user-list {
  border: solid black 1px;
}
</style>
