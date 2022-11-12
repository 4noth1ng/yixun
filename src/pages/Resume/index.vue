<template>
  <div class="resume_outside">
    <Tab />
    <div class="resume" ref="pdfPage">
      <div class="top">
        <span>我的在线简历</span>

      </div>
      <User />
      <Club />
      <Project />
      <Award></Award>
      <Judge />
      <div class="localresume_btn">
      </div>
    </div>
  </div>
</template>

<script>
import Club from './club/index.vue'
import Project from './project/index.vue'
import Award from './award/index.vue';
import Judge from './judge/index.vue';
import User from './user/index.vue';
import Tab from './tab/index.vue';
export default {
  data() {
    return {
      load: true
    };
  },
  methods: {

  },
  components: { Club, Project, Award, Judge, User, Tab },
  mounted() {
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

    this.$bus.$on('download', () => {
      this.$pdf(this.$refs.pdfPage)
    })

  },
  beforeDestroy(){
  }

}

</script>

<style scoped>
.resume_outside {
  position: relative;
  width: 1180px;
  margin: 30px auto 0 auto;
}


/*个人简历部分*/
.resume {

  width: 942px;
  overflow: hidden;
  margin: 0 0 0 238px;
  border: 1px solid black;
  background-color: #fafafa;
}

.resume .top {
  position: relative;
  width: 100%;
  height: 40px;
  font: 16px Microsoft Yahei;
  font-weight: 700;

  line-height: 40px;
  border-bottom: 1px solid #b2b2b2;
}

.resume .top button {
  display: inline-block;
  position: absolute;
  left: 849px;
  top: 5px;
  width: 60px;
  height: 30px;
  font: 16px Microsoft Yahei;
}

.resume .top span {
  display: inline-block;
  padding-left: 33px;
}

.resume .user {
  width: 100%;
  height: 160px;

  border-bottom: 1px solid #b2b2b2;
}

.resume .user .usericon {
  float: left;
  width: 110px;
  height: 110px;
  margin-left: 33px;
  margin-top: 25px;
  border-radius: 65px;
}

.resume .user .usericon img {
  width: 100%;
  height: 100%;
}

.resume .user .userinfo {
  width: 757px;
  height: 110px;

  float: left;
  margin-top: 25px;
  margin-left: 40px;
}

.resume .user .userinfo_top {
  width: 100%;
  height: 55px;

}

.resume .user .userinfo_top .username {
  height: 55px;
  width: 15%;
  float: left;
  font: 20px Microsoft Yahei;
  line-height: 55px;
}

.resume .user .userinfo_top .usersex1 {
  height: 38px;
  width: 38px;
  float: left;
  margin-top: 8.5px;
}

.resume .user .userinfo_top .usersex2 {
  height: 38px;
  width: 38px;
  float: left;
  margin-top: 8.5px;
}

.usersex1 img {
  width: 100%;
  height: 100%;
}

.usersex2 img {
  width: 100%;
  height: 100%;
}

.userinfo_bottom {
  height: 55px;
  width: 100%;

}

.userinfo_bottom .userphone {
  height: 100%;
  width: 150px;
  float: left;
  font: 18px Microsoft Yahei;
  line-height: 55px;
}

.userinfo_bottom .userphone .userphone_icon {
  margin-top: 6px;
  width: 24px;
  height: 24px;
  float: left;
}

.userphone_icon img {
  width: 100%;
  height: 100%;
}

.userphone .userphone_num {
  float: left;
  width: 86px;

}

.userinfo_bottom .usermail {
  height: 100%;
  width: 150px;
  float: left;
  font: 18px Microsoft Yahei;
  line-height: 55px;
  margin-left: 50px;
}

.userinfo_bottom .usermail .usermail_icon {
  margin-top: 6px;
  width: 24px;
  height: 24px;
  float: left;
}

.usermail_icon img {
  width: 100%;
  height: 100%;
}

.usermail .usermail_num {
  float: left;
  width: 86px;
}

.club {
  position: relative;
  min-height: 130px;
  width: 850px;
  overflow: hidden;
  margin: 0px auto 0 auto;
  border-bottom: 1px solid #b2b2b2;
}

.club .club_add {
  height: 35px;
  color: #6aa2e4;
  font: 500 16px Mircosoft Yahei;
  line-height: 35px;
  margin-left: 815px;
}

.club .title {
  height: 35px;
  width: 100%;
  margin-top: 30px;
}

.club .title .rec {
  float: left;
  width: 7px;
  height: 23px;
  background-color: #6aa2e4;
  margin-top: 6px;
}

.club .title .club_title {
  float: left;
  width: 170px;
  height: 35px;
  margin-left: 11px;
  font: 23px Microsoft Yahei;
  line-height: 35px;
  font-weight: 700;
}

.club .detail {
  width: 839px;
  word-break: break-word;
  height: auto;
  margin-top: 30px;
  margin-left: 18px;
}

.club .detail:hover {
  background-color: #d2d2d2;
  cursor: pointer;
}

.club .detail .topper {
  height: 32px;
  width: 100%;

}

.detail .topper .clubname {
  float: left;
  width: 166px;
  height: 32px;
  font: 18px Mircosoft;
  font-weight: 500;
  line-height: 32px;
}

.detail .topper .clubtime {
  float: left;
  width: 200px;
  height: 32px;
  font: 500 16px Mircosoft Yahei;
  line-height: 32px;
}

.detail .topper .clubdelete {
  float: right;
  margin-right: 50px;
  height: 32px;
  font: 500 16px Mircosoft Yahei;
  line-height: 32px;
  color: #6aa2e4;
}

.detail .topper .clubedit {
  float: right;
  margin-right: 15px;
  height: 32px;
  font: 500 16px Mircosoft Yahei;
  line-height: 32px;
  color: #6aa2e4;
}

.detail .mid {
  width: 100%;
  height: 32px;

  margin-top: 11px;
  font: 500 18px Mircosoft Yahei;
  line-height: 32px;
}

.detail .foot {
  height: 60px;
  width: 100%;
  margin-top: 20px;
  font: 500 16px Mircosoft Yahei;
}

.award {
  height: 240px;
}

.localresume_btn {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.localresume_btn button {
  width: 120px;
  height: 60px;
  font: 500 16px Mircosoft Yahei;
  border: 1px solid black;
}

.localresume_btn button:hover {
  color: #6aa2e4;
  cursor: pointer;
}

.detail1 {
  position: absolute;
  top: 230px;
}
</style>