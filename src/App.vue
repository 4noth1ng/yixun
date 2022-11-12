<template>
  <div>
    <Header v-if="iflogin" ></Header>
    <Header_unlogin v-if="!iflogin" ></Header_unlogin>
    <router-view v-if="isRouterAlive"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import Header_unlogin from './components/Header_unlogin'
import Footer from './components/Footer';
import { reqCheckToken } from './api';
export default {
  name: 'App',
  components: {
    Header,
    Header_unlogin,
    Footer
  },
  data() {
    return {
      iflogin: false,
      isRouterAlive: true,

    }
  },
  provide() {
    return {
      reload:this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  beforeMount() {
    var access_token = localStorage.getItem('access_token')
    var userid = localStorage.getItem('userid')
    if (access_token == null) {
      this.iflogin = false
    } else {
      this.iflogin = true
    }
    if (access_token != null) {
      // reqCheckToken({
      //   access_token: access_token,
      //   userid: userid
      // }).then(res => {
      //   if (res.expire_in == 0) {
      //     localStorage.removeItem('access_token')
      //     localStorage.removeItem('userid')
      //     setTimeout(() => {
      //       this.$router.go(0)
      //     }, 100);
      //   }
      // })
    }
  },
  watch: {
    iflogin: {
      handler(newval, oldval) {
       
      }
    }
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
