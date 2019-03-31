<template>
  <div class="home">
    <UserList class="user-list"/>
    <UserData class="user-data"/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserList from '@/components/UserList.vue'
import UserData from '@/components/UserData.vue'

export default {
  name: 'home',
  components: {
    UserList,
    UserData,
  }
}
</script>

<style scoped>
.user-list {
  width: calc(30vh - 2px);
  height: 90vh;
  float: left;
}
.user-data {
  width: 70%;
  height: 90vh;
  float: left;
  position:relative;
}
</style>