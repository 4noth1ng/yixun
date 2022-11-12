<template>
    <div class="infinite-list-container" ref="scrollBox"  @mousewheel="getScrollBoxHeight">
        <div class="infinite-list">
            <div class="infinite-list-item" v-for="(item, index) in projectArr" :key="index">
                1
            </div>
        </div>
    </div>
</template>

<script>
import { reqGetAllProject } from "@/api";
import { parse } from "qs";
import { mapState } from "vuex";

export default {
    name: "ProjectItem",
    data() {
        return {
            projectArr: [],
            boxHeight: 0
        }
    },
    async mounted() {
        const len = this.allProjects.length;
        if (len === 0) {
            const result = await reqGetAllProject();
            this.projectArr = result.data
            this.$store.dispatch("storeAllProjects", result.data);
        } else {
            this.projectArr = this.allProjects
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

    },
    computed: {
        ...mapState(["allProjects"]),
    },
    methods: {
        getScrollBoxHeight() {
            // 获取可视区域的高度
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            var boxOffset = this.$refs.scrollBox.offsetTop
            console.log(boxOffset);
        },
    }
}
</script>

<style lang="scss" scoped>

html,body{
  height:100%
}
.infinite-list-container {
    height: 100%;
    overflow: auto;
}

.infinite-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.infinite-list-item {
    box-sizing: border-box;
    margin: 20px 0;
    width: 90%;
    height: 120px;
    border: 1px solid #eaeaea;
}
</style>