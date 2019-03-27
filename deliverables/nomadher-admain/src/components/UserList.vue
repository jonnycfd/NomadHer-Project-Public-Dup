<template>
  <div class="user-list">
    UserList
    <!-- TODO: 写一个for loop (google 搜索vue forloop)创建一个用户列表的网页界面。 -->
    <!-- 在网页上点击列表中某个用户名称时会, 把store.js里面的“currentUser”变量改为当前选中的用户的名称 -->
    <!-- 以下三行代码是一个例子，需要用一个for loop将其替换。 -->
    <!-- start -->
    <button v-on:click="setUserId('user98')">user98</button>
    <button v-on:click="setUserId('user301')">user301</button>
    <button v-on:click="setUserId('user100true')">user100true</button>
    <!-- end -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserList',
  data: function () {
    return {
      userList: null,
    }
  },
  methods: {
    ...mapActions(['setCurrentUser']),
    setUserId(id) {
      this.setCurrentUser(id);
    }

  },
  mounted: function () {
    // 这部分code会在页面生成之前运行
    // TODO 
    // 1.连接数据库，获取完整用户名列表（这一步只需要获取所有用户的用户名，不需要照片信息）
    // 2.从数据库获取用户信息后，把信息储存到userList中(第16行代码)
    // 3.断开database connection
  }
}
</script>

<style scoped>
.user-list {
  border: solid black 1px;
}
</style>
