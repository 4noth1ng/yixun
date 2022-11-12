<template>
  <div class="header_outside">
    <div class="header">
      <router-link class="header_logo" to="/home"></router-link>
      <div class="one">
        <router-link to="/home">首页</router-link>
      </div>
      <div class="two">
        <a @click="goProject">项目</a>
      </div>
      <div class="three"><a @click="goResume">我的简历</a></div>
      <div class="four"><a @click="goCollect">我的收藏</a></div>
      <div class="user">
        <div class="user" :key="render">
          <div
            class="userIcon"
            ref="userIcon"
            :style="{ backgroundImage: `url(${userImg})` }"
          ></div>
          <div class="username" style="margin-left: 10px">
            {{ this.username }}
          </div>
          <el-tooltip content="退出登录" placement="bottom" effect="dark">
            <div class="userout" @click="loginOut"></div>
          </el-tooltip>
        </div>
      </div>
      <button class="header_personal" @click="goUserCenter">个人中心</button>
      <button class="header_publish" @click="goProjectPost">发布项目</button>
    </div>
  </div>
</template>

<script>
import { reqLogOut } from "@/api";
import { reqGetUserInfo } from "@/api";
import requests from "@/api/request";

import QS from "qs";

export default {
  name: "",
  data() {
    return {
      username: "",
      userImg: "",
      render: 0,
    };
  },
  methods: {
    async test() {
      const res = await this.$axios.get(
        "http://119.91.219.167:517/yiban/getUserInfo",
        {
          params: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      console.log(res);
    },
    loginOut() {
      reqLogOut();
      localStorage.removeItem("access_token");
      localStorage.removeItem("userid");
      if (localStorage.getItem("biographyId") !== null) {
        localStorage.removeItem("biographyId");
      }
      if (localStorage.getItem("isFirstTime" !== null)) {
        localStorage.removeItem("isFirstTime");
      }
      setTimeout(() => {
        this.$router.go(0);
      }, 50);
    },
    goUserCenter() {
      this.$router.push("/usercenter");
    },
    goResume() {
      this.$router.push("/resume");
    },
    goProject() {
      this.$router.push({
        name: "project",
        query: {
          keyword: "",
          category: "",
        },
      });
    },
    goCollect() {
      this.$router.push("/tabnav/collect");
    },
    goProjectPost() {
      this.$router.push("/projectpost");
    },
  },
  async mounted() {
    var access_token = localStorage.getItem("access_token");
    var userid = localStorage.getItem("userid");
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
        this.username = result.data.data.info.yb_username;
      }
    } catch (e) {}
  },
};
</script>

<style scoped>
/*消除浏览器默认部分*/
* {
  margin: 0;
  padding: 0;
}

input {
  border: none;
  box-shadow: none;
  outline: none;
}

button {
  outline: none;
}

/*头部导航栏header部分*/
/*最外层DIV部分*/
* {
  margin: 0;
  padding: 0;
}

input {
  border: none;
  box-shadow: none;
  outline: none;
}

button {
  outline: none;
}

/*最外层DIV部分*/
.header_outside {
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #e0e0e0;
}

/*头部导航栏header部分*/
.header {
  position: relative;
  margin: 0 auto;
  width: 1440px;
  height: 65px;
  line-height: 20px;
  background-color: white;
  color: #4c4c4e;
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
}

.header .header_logo {
  display: inline-block;
  position: absolute;
  left: 124px;
  top: 9px;
  width: 87px;
  height: 50px;
  background: url(./images/logo.png);
  background-size: 100% 100%;
  background-position: center center;
}

.header img:hover {
  cursor: pointer;
}

.header .one {
  position: absolute;
  left: 306px;
  top: 22px;
  width: 40px;
  height: 29px;
  color: #4c4c4e;
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.header .one a {
  color: #4c4c4e;
}
.header .one a:hover {
  cursor: pointer;
  color: #6aa2e4;
}

.header .two {
  position: absolute;
  left: 438px;
  top: 22px;
  width: 40px;
  height: 29px;
  color: #4c4c4e;
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.header .two a:hover {
  cursor: pointer;
  color: #6aa2e4;
}

.header .three {
  position: absolute;
  left: 586px;
  top: 22px;
  width: 80px;
  height: 29px;
  color: #4c4c4e;
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.header .three a:hover {
  cursor: pointer;
  color: #6aa2e4;
}

.header .four {
  position: absolute;
  left: 750px;
  top: 22px;
  width: 80px;
  height: 29px;
  color: #4c4c4e;
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.header .four a:hover {
  cursor: pointer;
  color: #6aa2e4;
}

.header .header_personal {
  position: absolute;
  left: 1150px;
  top: 18px;
  width: 80px;
  height: 32px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid #6aa2e4;
}

.header .header_personal:hover {
  color: #6aa2e4;
  cursor: pointer;
}

.header .header_publish {
  position: absolute;
  left: 1238px;
  top: 18px;
  width: 80px;
  height: 32px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  font-family: Microsoft Yahei;
  border: 1px solid #6aa2e4;
}

.header .header_publish:hover {
  cursor: pointer;
  color: #6aa2e4;
}

.header .user .userIcon {
  height: 30px;
  width: 30px;
  position: absolute;
  left: 910px;
  top: 18px;
  background-size: 100% 100%;
  background-position: center center;
}

.header .user .username {
  height: 30px;
  min-width: 60px;
  width: auto;
  line-height: 30px;
  position: absolute;
  left: 940px;
  top: 18px;
}

.header .user .userout {
  height: 20px;
  width: 20px;
  position: absolute;
  left: 1105px;
  top: 22.5px;
  background: url(./images/logout.png);
  background-size: 100% 100%;
  background-position: center center;
}

.header .user .userout:hover {
  cursor: pointer;
}

/*头部导航栏header部分结束*/
</style>