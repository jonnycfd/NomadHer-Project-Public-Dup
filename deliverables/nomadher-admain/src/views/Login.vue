<template>
  <div class="login">
    <div id="input1">
      <p>Username:</p>
  		<input v-model="message1" >
	  </div>
	  <div id="input2">
		  <p>Password:</p>
		  <input v-model="message2">
	  </div>
    <button id="loginButton" v-on:click="verifyLogin()">Login</button>

    <div id="errormsg">
      
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import router from '../router'

export default {
  name: 'login',
  data: function(){
    return {
      message1: null,
      message2: null,
    }

  },
  methods: {
    ...mapActions(['setLogin']),
    verifyLogin() {
      // TODO: verify the Username and Password
      if (this.message1 == "admin@gmail.com" && this.message2 == "123456") { 
        this.setLogin();
        router.push({ name: "home" });
      }
    }
  }
}


</script>

<style scoped>
.login{
  /*border: solid rgb(169, 247, 159) 5px; */
  
  background-color:ivory;
  font-size: 18px;
  border: solid ivory 1px;
  background-image: url("NomadHer-main.jpg");
  background-repeat: no-repeat;
  background-position: center;
  width:100%;
  height:100vh;
  background-size:100%, 100%;
  border-radius: 10px;
  background-position:top;
}

#loginButton {
  border-radius: 5px;
  background-color: ivory;
  border: none;
  
  text-align: center;
  font-size: 20px;
  padding: 5px;
  width: 80px;
  height: 48px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

#loginButton:hover {
  box-shadow: 0 6px 8px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  background-color: rgb(169, 247, 159);
}
</style>
