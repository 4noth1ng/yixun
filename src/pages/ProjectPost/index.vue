<template>
  <div class="divd">
    <div class="outside">
      <div class="postform">
        <div class="title">
          <div class="rec"></div>
          <div class="word">信息填写请尽量准确，以便为您精准匹配</div>
        </div>
        <div class="person">
          <el-radio-group v-model="personType">
            <el-radio :label="1">本科生</el-radio>
            <el-radio :label="2">研究生</el-radio>
            <el-radio :label="3">教师</el-radio>
          </el-radio-group>
        </div>
        <div class="projects">
          <el-checkbox-group
            v-model="checkedProjects"
            :max="1"
            v-if="personType === 1"
          >
            <el-checkbox v-for="item in student" :label="item" :key="item">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-model="checkedProjects"
            :max="1"
            v-if="personType === 2"
          >
            <el-checkbox v-for="item in graduate" :label="item" :key="item">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-model="checkedProjects"
            :max="1"
            v-if="personType === 3"
          >
            <el-checkbox v-for="item in teacher" :label="item" :key="item">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="project-title">
          <div>
            <span>项目标题：</span>
          <el-input
            v-model="project.title"
            placeholder="请输入内容"
            size="large"
            style="width: 300px"
            @blur="checkDetail('title')"
          ></el-input>
          </div>
          <div class="errorTip" v-show="tips.title">请填写项目标题</div>
        </div>
        <div class="project-detail">
          <div>
            <span>项目内容：</span>
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
            v-model="project.detail"
            resize="none"
            style="width: 800px"
            @blur="checkDetail('detail')"
          >
          </el-input>
          </div>
          <div class="errorTip" v-show="tips.detail">请填写项目内容</div>
        </div>
        <div class="project-member">
          <span>成员介绍：</span>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="project.member"
            resize="none"
            style="width: 800px"
            @blur="checkDetail('member')"
          >
          </el-input>
          <div class="errorTip" v-show="tips.member">请填写成员介绍</div>
        </div>
        <div class="project-demand">
          <span>招募要求：</span>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="project.demand"
            resize="none"
            style="width: 800px"
            @blur="checkDetail('demand')"
          >
          </el-input>
          <div class="errorTip" v-show="tips.demand">请填写招募要求</div>
        </div>
        <div class="project-contact">
          <span>联系方式：</span>
          <el-input
            v-model="project.contact"
            placeholder="请输入内容"
            size="large"
            style="width: 300px"
            @blur="checkDetail('contact')"
          >
          </el-input>
          <div class="errorTip" v-show="tips.contact">请填写联系方式</div>
        </div>
        <div class="publish-btn">
          <el-button type="primary" plain @click="publish">发布内容</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqProjectPost } from "@/api/index";
import requests from "@/api/request";
export default {
  data() {
    return {
      personType: 1,
      tips:{
        title:false,
        detail: false,
        member: false,
        demand: false,
        contact: false,
      },
      checkedProjects: [],
      student: [
        "三下乡",
        "互联网+",
        "电子工程",
        "智能机器人",
        "艺术类",
        "数学建模",
        "acm",
        "辩论",
      ],
      graduate: ["实验室招募", "实验室项目类", "实验室比赛类", "实验室打杂"],
      teacher: ["实验室招募", "实验室项目类", "实验室比赛类", "实验室打杂"],
      project: {
        title: "",
        detail: "",
        member: "",
        demand: "",
        contact: "",
        id: 1,
        cateid: 1,
      },
    };
  },
  methods: {
    async publish() {
      if (this.checkedProjects == "") {
        this.$message.error("项目标签未勾选");
      } else if (this.project.title == "") {
        this.$message.error("项目标题为空");
      } else if (this.project.detail == "") {
        this.$message.error("项目内容为空");
      } else if (this.project.member == "") {
        this.$message.error("成员介绍为空");
      } else if (this.project.demand == "") {
        this.$message.error("招募要求为空");
      } else if (this.project.contact == "") {
        this.$message.error("联系方式为空");
      } else {
        let id = 0;
        const config = {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        };

        let a = this.checkedProjects[0],
          b = 1;
        switch (a) {
          case "本科招募类":
            b = 1;
            break;
          case "研究生教师招募类":
            b = 2;
            break;
          case "三下乡":
            b = 3;
            break;
          case "互联网+":
            b = 4;
            break;
          case "电子工程":
            b = 5;
            break;
          case "智能机器人":
            b = 6;
            break;
          case "艺术类":
            b = 7;
            break;
          case "数学建模":
            b = 8;
            break;
          case "acm":
            b = 9;
            break;
          case "辩论":
            b = 10;
            break;
          case "实验室招募":
            b = 11;
            break;
          case "实验室项目类":
            b = 12;
            break;
          case "实验室比赛类":
            b = 13;
            break;
          case "实验室打杂":
            b = 14;
            break;
          default:
            b = 3;
        }
        this.project.cateid = b;

        requests
          .post(
            "/yixun/project/postProject_details",
            JSON.stringify({
              userType: this.personType,
              projectTitle: this.project.title,
              projectMessage: this.project.detail,
              memberIntroduce: this.project.member,
              projectRequirement: this.project.demand,
              contactDetail: this.project.contact,
              userId: parseInt(localStorage.getItem("userid")),
              categoryId: this.project.cateid,
              wxQrcode: null,
            }),
            config
          )
          .then(
            // this.$message.success('成功发布'),
            this.$message({
              duration: 1000,
              type: "success",
              message: "成功发布",
              showClose: true,
            }),
            setTimeout(() => {
              this.$router.push({
                name: "home",
              });
            }, 1000)
          )
          .catch();
      }
    },
    getTime() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      var dateArr = [date.getMonth() + 1, date.getDate()];
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      return year + "-" + dateArr[0] + "-" + dateArr[1];
    },
    checkDetail(index){
      if(this.project[index].trim()===''){
        this.tips[index] = true
      }else {
        this.tips[index] = false
      }
    }
  },
  mounted() {
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
  },
  beforeDestroy(){
  },
  watch: {
    personType(newval, oldval) {
      this.checkedProjects = [];
    },
  },
};
</script>

<style scoped>
.divd {
  width: 1440px;
  margin: 0 auto;
  overflow: visible;
}
.errorTip{
  margin-left: 80px;
  margin-top: 5px;
  color:red;
  height: 22px;
  line-height: 22px;
}
.outside {
  width: 1000px;
  min-height: 1250px;
  margin: 40px auto -20px auto;
  border: 1px solid #b2b2b2;
  height: auto;
}

.postform {
  width: 940px;
  height: 1140px;
  margin: 30px auto;
}

.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.title .rec {
  width: 20px;
  height: 30px;
  background-color: #6aa2e4;
  float: left;
  line-height: 30px;
}

.title .word {
  float: left;
  height: 30px;
  font: 400 18px Mircosoft Yahei;
  line-height: 30px;
  margin-left: 10px;
}

.person {
  width: 80%;
  height: 60px;
  margin-left: 30px;
  line-height: 60px;
}

.projects {
  margin-top: 10px;
  width: 910px;
  margin-left: 30px;
  height: 60px;
}

.project-title {
  margin-left: 30px;
  width: 910px;
  min-height: 60px;
  height: auto;
}

.project-detail {
  width: 910px;
  margin-left: 30px;
  min-height: 240px;
  line-height: 240px;
  margin-top: 20px;
  height: auto;
}

.project-member {
  width: 910px;
  margin-left: 30px;
  min-height: 180px;
  height: auto;
  line-height: 180px;
  margin-top: 20px;
}

.project-demand {
  width: 910px;
  margin-left: 30px;
  min-height: 180px;
  height: auto;
  line-height: 180px;
  margin-top: 20px;
}

.project-contact {
  margin-left: 30px;
  width: 910px;
  min-height: 60px;
  height: auto;
  margin-top: 40px;
}

.publish-btn {
  margin-left: 814px;
  margin-top: 80px;
}
</style>