<template>
  <div class="user-data">
    <div>{{this.userName}}</div>
    <!-- TODO: (Step3) Write HTML to display six images -->

    <!-- TODO: Create buttons to trigger functions to edit database -->
    <!-- Example: start -->
    <button v-if="userName != 'null'" v-on:click="deletePhotoId('user98')">deletePhotoId</button>
    <button v-if="userName != 'null'" v-on:click="deletePose('user301', 1)">deletePose</button>
    <button v-if="userName != 'null'" v-on:click="modifyUserState('user100true', true)">modifyUserState</button>
    <!-- Example: end -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { deletePhotoId, deletePose, modifyUserState } from '@/js/modifyDatabase.js';
import { db } from '@/js/firebase.js';

export default {
  name: 'UserList',
  data: function() {
      return {
          userName: null,
        // TODO: (Step2) Create variables and store image data here
      }
  },
  methods: {
      deletePhotoId,
      deletePose,
      modifyUserState,
  },
  computed: {
      ...mapGetters(['getCurrentUser']),
  },
  watch:{
      getCurrentUser(user) {
          this.userName = user;
          // TODO (Step1)
          // 1.连接数据库，获取当前用户信息（三组照片和身份证照片）
          // 2.将六张照片显示在页面上 (在这个function中创建<img>元素然后appendChild()到HTML中)
          // 3.断开database connection
      }
  },
  mounted: function() {
      this.userName = this.getCurrentUser
  }
}
</script>

<style scoped>
.user-data {
  border: solid black 1px;
}
</style>
