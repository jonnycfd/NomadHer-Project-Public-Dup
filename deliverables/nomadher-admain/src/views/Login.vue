<template>
  <div class="login">
    <!-- TODO: Create two input area for Username and Password -->
    <button v-on:click="verifyLogin()">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router'

export default {
  name: 'login',
  methods: {
    ...mapActions(['setLogin']),
    verifyLogin() {
      // TODO: verify the Username and Password

      // If success
      this.setLogin();
      router.push({ name: "home" });
    }
  }
}
</script>

<style scoped>

</style>