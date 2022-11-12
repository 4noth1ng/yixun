<template>
  <div class="divd">
    <div class="usercenter">
      <div class="user">
        <div class="usericon"><img :src="userImg" alt="" /></div>
        <div class="username">{{ userName }}</div>
      </div>
      <div class="choicebox">
        <div class="choice" @click="goResume">个人简历</div>
        <div class="choice" @click="goTabPublish">投递记录</div>
        <div class="choice" @click="goTabMsg">发布记录</div>
        <div class="choice" @click="goTabContact">接收简历</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetUserInfo } from "@/api";
export default {
  data() {
    return {
      userImg: "",
      userName: "",
    };
  },
  methods: {
    goTabMsg() {
      this.$router.push("/tabnav/publish");
    },
    goTabContact() {
      this.$router.push("/tabnav/receive");
    },
    goTabPublish() {
      this.$router.push("/tabnav/deliver");
    },
    goResume() {
      this.$router.push("/resume");
    },
  },
  beforeMount() {},
  async mounted() {
    this.$axios.post("http://119.91.219.167:517/yiban/getTokenInfo",{
            access_token:localStorage.getItem('access_token')
        }).then(res=>{
            if(res.data.data.status==='404'){
                this.$message.error("账户信息过期，请重新登陆")
                localStorage.removeItem("access_token")
                localStorage.removeItem("userid")
                let t = setTimeout(() => {
                    window.location = "http://43.138.210.224:9081/yixun/users/login"
                }, 500);
            }
        })
    try {
      const result = await this.$axios.get(
        "http://119.91.219.167:517/yiban/getUserInfo",
        {
          params: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      if (result.data.data.status === "success") {
        this.userImg = result.data.data.info.yb_userhead;
        this.userName = result.data.data.info.yb_username;
      }
    } catch (e) {}
  },
  beforeDestroy(){
    clearTimeout(t)
  }
};
</script>

<style scoped>
.divd {
  width: 1440px;
  margin: 0 auto;
  overflow: hidden;
}
.usercenter {
  width: 965px;
  height: 707px;
  background-color: white;
  margin: 30px auto 0 auto;
  border: 3px solid #eaeaea;
}

.choicebox {
  width: 600px;
  height: 400px;
  margin: 50px auto 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.choicebox .choice {
  width: 49%;
  height: 198px;
  border: 1px solid #eaeaea;
  font: 24px Microsoft Yahei;
  text-align: center;
  line-height: 198px;
  transition: background-color 0.2s linear;
}

.choicebox .choice:hover {
  background-color: #6aa2e4;
  cursor: pointer;
}

/* .choicebox .choice .choiceone {
  float: left;
  width: 299px;
  height: 100%;
  border-right: 1px solid #eaeaea;
  font: 24px Microsoft Yahei;
  line-height: 198px;
  text-align: center;
}

.choicebox .choice .choiceone:hover {
  background-color: #6aa2e4;
  box-shadow: 2px 2px 2px 2px #eaeaea;
  cursor: pointer;
}


.choicebox .choice .choicetwo {
  float: left;
  width: 298px;
  height: 100%;
  font: 24px Microsoft Yahei;
  line-height: 198px;
  text-align: center;
  border-left: 2px solid #eaeaea;
}

.choicebox .choice .choicetwo:hover {
  background-color: #6aa2e4;
  box-shadow: 2px 2px 2px 2px #eaeaea;
  cursor: pointer;
} */

.usercenter .user {
  overflow: hidden;
  width: 100%;
  height: 170px;
  border-bottom: 2px solid #eaeaea;
}

.usercenter .user .usericon {
  width: 100px;
  height: 100px;
  margin: 20px auto 10px auto;
}

.usercenter .user .usericon img {
  width: 100%;
  height: 100%;
}

.usercenter .user .username {
  width: 100%;
  font: 24px Microsoft Yahei;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>