<template>
  <div>
    <ProjectSearch />
    <div class="divd" ref="divd">
      <div class="outside">
        <div class="top">
          <div class="top-student">
            <span class="title">本科生类</span>
            <div class="student-area">
              <ul>
                <li v-for="(item, index) in student" :key="index" @click="goProject(item)">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <div class="top-teacher">
            <span class="title">教师、研究生类</span>
            <div class="student-area">
              <ul>
                <li v-for="(item, index) in teacher" :key="index" @click="goProject(item)">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="white"></div>
        <div class="bottom">
          <div class="projects" :key="render">
            <div class="project" v-for="item in project" :key="item.projectId" @click="goProjectDetail(item.projectId)">
              <div class="project-top">
                <span>项目名称：</span>{{ item.projectTitle }}
              </div>
              <div class="project-mid">
                <span>项目简介：</span>
                <div class="project-introduce">{{ item.projectMessage }}</div>
              </div>
              <div class="project-bottom">
                <span>项目类别:</span>
                <el-tag style="
                    width: 100px;
                    height: 40px;
                    font-size: 14px;
                    text-align: center;
                  " size="medium">
                  {{ item.categoryName }}</el-tag>
              </div>
            </div>
          </div>
          <div class="pagination" style="">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectSearch from "../Home/ProjectSearch/index.vue";
import { reqGetAllProject } from "@/api";
import requests from "@/api/request";
import { mapState } from "vuex";
export default {
  data() {
    return {
      total: 0,
      pagesize: 6,
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
      teacher: ["实验室招募", "实验室项目类", "实验室比赛类", "实验室打杂"],
      projects: [],
      project: [],
      projectFilter: [],
      projectid: 0,
      keyword: "",
      category: "",
      upload: 1,
      render: 1
    };
  },
  methods: {
    handleCurrentChange(newPage) {
      let start = (newPage - 1) * this.pagesize;
      let end = newPage * this.pagesize;
      this.project = this.projectFilter.slice(start, end);
    },
    filterList() {
      return this.projects.filter((item) => {
        return item.name.indexOf(this.$route.query.keyword) !== -1;
      });
    },
    goProject(index) {
      this.$router.push({
        name: "project",
        query: {
          keyword: "",
          category: index,
        },
      });
    },
    goProjectDetail(id) {
      this.$router.push({
        name: "projectdetail",
        query: {
          projectId: id,
        },
      });
    },
  },
  components: { ProjectSearch },
  created() {
    if (this.$route.query.category != "" && this.$route.query.keyword == "") {
      requests
        .get(`/yixun/project/listProject_keyword/${this.$route.query.category}`)
        .then((res) => {
          if (res.code === 10000) {
            this.projectFilter = res.data;
            this.total = this.projectFilter.length;

            for (
              let i = 0, length = this.projectFilter.length;
              i < length;
              i++
            ) {
              let a = parseInt(this.projectFilter[i].categoryId);
              let b = "";
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
                  break;
                default:
                  b = "";
              }
              this.projectFilter[i].categoryName = b;
            }

            this.handleCurrentChange(1);
          }
          console.log(res);
          console.log(res.code);
        })
        .catch();
    }
  },
  async beforeMount() {
    if (this.$route.query.category == "") {

      const result = await reqGetAllProject(); // result = res

      this.projects = result.data;
      this.$store.dispatch("storeAllProjects", result.data)



      this.projectFilter = this.projects.filter((item) => {
        return item.projectTitle.indexOf(this.$route.query.keyword) !== -1;
      });

      for (let i = 0, length = this.projectFilter.length; i < length; i++) {
        let a = parseInt(this.projectFilter[i].categoryId);
        let b = "";
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
            break;
          default:
            b = "";
        }
        this.projectFilter[i].categoryName = b;
      }

      this.total = this.projectFilter.length;
      console.log(String(this.$route.query.keyword) === 11);
      this.handleCurrentChange(1);

    }
  },
  mounted() {
    document.documentElement.scrollTop = 0
  },
  beforeDestroy() {
    (this.$route.query.keyword = ""), (this.$route.query.category = "");
  },
  computed: {
    ...mapState(["allProjects"]),
  },
  watch: {
    "$route.query.keyword": {
      handler(newval, oldval) {
        this.$router.go(0);
      },
    },
    "$route.query.category": {
      async handler(newval, oldval) {
        this.total = 0
        if (newval) {
          requests
            .get(
              `/yixun/project/listProject_keyword/${this.$route.query.category}`
            )
            .then((res) => {
              if (res.code === 10000) {
                this.projectFilter = res.data;
                this.total = this.project.length;
                this.handleCurrentChange(1);
              }
            })
            .then(() => {
              if (this.total) {
                this.render = 0
                this.$nextTick(() => {
                  this.render = 1
                })
              } else {
                this.$router.go(0);
              }
            })
            .catch();
        } else {
          const result = await reqGetAllProject(); // result = res
          this.projects = result.data;
          this.projectFilter = this.projects
          for (let i = 0, length = this.projectFilter.length; i < length; i++) {
            let a = parseInt(this.projectFilter[i].categoryId);
            let b = "";
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
                break;
              default:
                b = "";
            }
            this.projectFilter[i].categoryName = b;
          }
          this.total = this.projectFilter.length;
          console.log(String(this.$route.query.keyword) === 11);
          this.handleCurrentChange(1);
        }


      },
    },
  },
};
</script>

<style scoped>
.pagination {
  width: 100%;
  text-align: center;
  height: 50px;
  margin-top: 20px;
}

.white {
  width: 100%;
  height: 30px;
  background-color: #fff;
}

.divd {
  width: 1440px;
  margin: 0 auto;
  overflow: hidden;
}

.outside {
  width: 1000px;
  height: 1700px;
  margin: 20px auto 0 auto;
}

.outside .top {
  width: 100%;
  height: 159px;
  border: 1px solid #b2b2b2;
}

.top .top-student {
  width: 100%;
  height: 79px;

  border-bottom: 1px solid #eaeaea;
}

.top .top-teacher {
  height: 79px;
}

.title {
  margin-left: 10px;
  height: 79px;
  width: 50px;
  font: 550 20px Mircosoft Yahei;
  line-height: 79px;
}

.student-area {
  display: inline-block;
  margin-left: 20px;
}

.student-area ul li {
  display: inline-block;
  height: 79px;
  font: 400 16px Mircosoft Yahei;
  line-height: 79px;
  text-align: center;
  margin: 0 10px 0 10px;
}

.student-area ul li:hover {
  color: #6aa2e4;
  cursor: pointer;
}

.bottom {
  width: 100%;
  height: 1541px;
  background-color: #eaeaea;
  margin: 0 auto;
}

.bottom .projects {
  width: 100%;
  overflow: hidden;
  height: 1441px;
}

.bottom .projects .project {
  width: 80%;
  height: 205px;
  margin: 30px auto 0 auto;
  background-color: #fff;
  border-radius: 10px;

  transition: all linear .2s;
}

.bottom .projects .project:hover {
  cursor: pointer;
  box-shadow: #6aa2e4 3px 3px 10px 0;
}

.projects .project span {
  width: 50px;
  height: 42px;
  font: 500 20px Mircosoft Yahei;
  line-height: 42px;
  margin-left: 5px;
}

.project .project-top {
  width: 100%;
  height: 42px;
  line-height: 42px;
}

.project .project-bottom {
  width: 100%;
  height: 42px;
  line-height: 42px;
}

.project .project-mid {
  width: 100%;
  height: 116px;
}

.project-introduce {
  word-wrap: break-word;
  display: inline-block;
  height: 80%;
  width: 690px;
  margin-top: 20px;
}
</style>