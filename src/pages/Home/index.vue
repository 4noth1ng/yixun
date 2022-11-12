<template>
  <div>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" class="maindetail1">
        <ProjectSearch />
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20" >
        <TabSwiper />
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="18" class="maindetail">
        <ProjectRecommend />
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectSearch from './ProjectSearch/index.vue';
import TabSwiper from './TabSwiper/index.vue';
import ProjectRecommend from './ProjectRecommend/index.vue';
import requests from '@/api/request';
export default {
  components: { ProjectSearch, TabSwiper, ProjectRecommend },
  mounted() {
    let token = localStorage.getItem('access_token')
    if (token == null) {
      let url = decodeURI(window.location.href)
      console.log(url);
      if (url.length > 28) {
        let reg = new RegExp("%3A", "g")
        let a = url.replace(reg, ":")
        let url1 = a.split("?")
        console.log(url1[1])
        let url2 = JSON.parse(url1[1])
        localStorage.setItem('access_token', url2.access_token)
        this.$store.commit("storeAccessToken", url2.access_token)
        localStorage.setItem('userid', url2.userid)
        this.$store.commit("storeUserId", url2.userid)
        const config = {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        };
        requests.post('http://43.138.210.224:9081/yixun/token/one', JSON.stringify({
          userid: parseInt(localStorage.getItem('userid')),
          token: localStorage.getItem('access_token')
        }), config).then(() => {
          this.$router.push('/home')
          this.$router.go(0)
        })


      }
    }

  },
}
</script>

<style scoped lang="scss">
.el-col {
  border: 1px solid transparent;
}

.maindetail1 {
  display: flex;
  justify-content: center;
}
</style>