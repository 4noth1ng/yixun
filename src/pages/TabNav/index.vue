<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$axios.post("http://119.91.219.167:517/yiban/getTokenInfo",{
            access_token:localStorage.getItem('access_token')
        }).then(res=>{
            if(res.data.data.status==='404'){
                this.$message.error("账户信息过期，请重新登陆")
                localStorage.removeItem("access_token")
                localStorage.removeItem("userid")
                setTimeout(() => {
                    window.location = "http://43.138.210.224:9081/yixun/users/login"
                }, 500);
            }
        })
  },
  beforeDestroy(){
  }
}
</script>

<style>

</style>