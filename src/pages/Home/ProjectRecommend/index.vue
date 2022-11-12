<template>
  <div ref="box">
    <span class="h">热门项目</span>
    <ProjectItem></ProjectItem>
    <div class="moreProjects" ref="morebtn">
      <el-button @click="moreProjects">点击查看更多项目</el-button>
    </div>
  </div>
</template>

<script>
import { reqGetAllProject } from "@/api";
import { parse } from "qs";
import { mapState } from "vuex";
import ProjectItem from "../ProjectItem/index.vue"
export default {
  name: "ProjectRecommend",
  data() {
    return {
      projectArr: [],
      start: 0,
      end: 6,
      render: 0,
    };
  },
  components: {
    ProjectItem
  },
  async mounted() {
    const len = this.allProjects.length;
    if (len === 0) {
      const result = await reqGetAllProject();
      this.projectArr = result.data.slice(this.start, this.end);
      this.$store.dispatch("storeAllProjects", result.data);
    } else {
      this.projectArr = this.allProjects.slice(this.start, this.end);
    }
    this.start = this.end;
    this.end += 6;
    if (this.end > this.allProjects.length) this.end = this.allProjects.length;

    for (let i = 0, length = this.projectArr.length; i < length; i++) {
      let a = parseInt(this.projectArr[i].categoryId),
        b = "";
      switch (a) {
        case 1:
          b = "本科生招募类";
          break;
        case 2:
          b = "研究生、老师招募类";
          break;
        case 3:
          b = "三下乡";
          break;
        case 4:
          b = "互联网+";
          break;
        case 5:
          b = "电子工程";
          break;
        case 6:
          b = "智能机器人";
          break;
        case 7:
          b = "艺术类";
          break;
        case 8:
          b = "数学建模";
          break;
        case 9:
          b = "acm";
          break;
        case 10:
          b = "辩论";
          break;
        case 11:
          b = "实验室招募类";
          break;
        case 12:
          b = "实验室项目类";
          break;
        case 13:
          b = "实验室比赛类";
          break;
        case 14:
          b = "实验室打杂类";
        default:
          b = "";
      }
      this.projectArr[i].categoryName = b;
    }
    console.log(this.$refs.box.offsetTop);

  },
  updated() {
  },
  methods: {
    goProjectDetail(id) {
      this.$router.push({
        name: "projectdetail",
        query: {
          projectId: id,
        },
      });
    },
    moreProjects() {
      console.log(this.start, this.end);
      const addBlogs = this.allProjects.slice(this.start, this.end);
      //console.log(addBlogs);
      this.start = this.end;
      this.end += 6;
      if (this.end > this.allProjects.length) {
        this.$router.push({
          name: "project",
          query: {
            keyword: "",
            category: "",
          },
        });

      }
      addBlogs.forEach((element) => {
        let a = parseInt(element.categoryId),
          b = "";
        switch (a) {
          case 1:
            b = "本科生招募类";
            break;
          case 2:
            b = "研究生、老师招募类";
            break;
          case 3:
            b = "三下乡";
            break;
          case 4:
            b = "互联网+";
            break;
          case 5:
            b = "电子工程";
            break;
          case 6:
            b = "智能机器人";
            break;
          case 7:
            b = "艺术类";
            break;
          case 8:
            b = "数学建模";
            break;
          case 9:
            b = "acm";
            break;
          case 10:
            b = "辩论";
            break;
          case 11:
            b = "实验室招募类";
            break;
          case 12:
            b = "实验室项目类";
            break;
          case 13:
            b = "实验室比赛类";
            break;
          case 14:
            b = "实验室打杂类";
          default:
            b = "";
        }
        element.categoryName = b;
        this.projectArr.push(element);
      });
      //console.log(this.projectArr);
      this.render = 1;
      this.$nextTick(() => {
        this.render = 0;
      });
    },
    geth() {
      console.log(1);
    }
  },
  computed: {
    ...mapState(["allProjects"]),

  },
};
</script>

<style>
/*推荐部分开始*/

.moreProjects {
  margin-top: 40px;
  width: 60%;
  margin-left: 20%;
  text-align: center;
}

.el-col {
  border: 1px solid transparent !important
}

.h {
  display: block;
  font-size: 24px;
  font-family: Microsoft Yahei;
  font-weight: 700;
  margin-left: 43px;
}

.infinite-list {
  position: relative;
  overflow: auto;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.recommend {
  margin-top: 35px;
  margin-left: 123px;
  width: 1195px;
  min-height: 450px;
  height: auto;
  background-color: white;
  font-family: Microsoft Yahei;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.recommend .project-item {
  margin-top: 28px;
}

.recommend a:hover {
  cursor: pointer;
}

.recommend span {
  font-size: 18px;
}

.recommend_one {
  overflow: hidden;
  width: 350px;
  height: 200px;
  border: 0.5px solid #eaeaea;
  color: #4c4c4e;
  transition: box-shadow linear 0.2s;
}

.recommend_one:hover {
  box-shadow: 4px 4px 2px 2px #eaeaea;
}

.recommend_one .name {
  height: 35px;
  line-height: 35px;
  width: 100%;
  margin-left: 10px;
  font-size: 18px;
  margin-top: 5px;
}

.recommend_one .name div {
  display: inline-block;
}

.recommend .introduce {
  margin: 10px 0 0 10px;
  width: 330px;
  height: 105px;
  border-bottom: 1px solid #eaeaea;
}

.recommend_one .introduce div {
  display: inline-block;
  word-break: break-all;
  word-wrap: break-word;
}

.recommend_one .type {
  margin: 5px 0 0 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
}

.recommend_one .type div {
  display: inline-block;
  word-break: break-all;
  word-wrap: break-word;
}

/*推荐部分结束*/
</style>