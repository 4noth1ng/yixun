<template>
    <div class="project club" ref="project">
        <div class="title">
            <div class="rec"></div>
            <div class="club_title">项目经历</div>
            <div class="club_add" @click="project_addDetail">添加</div>
        </div>
        <div class="detail_outside" v-if="!project_ifAdd">
            <div class="detail" v-for="(item) in project" :key="item.projectArrNum"
                @mouseover="project_showEditDelete(item.projectArrNum)"
                @mouseleave="project_hideEditDelete(item.projectArrNum)">
                <div class="topper">
                    <div class="clubname">{{ item.projectName }}</div>
                    <div class="clubedit" ref="projectdelete" v-show="item.editAnddelete"
                        @click="projectDetailEdit(item.projectArrNum)">编辑</div>
                    <div class="clubdelete" ref="projectdelete" v-show="item.editAnddelete"
                        @click="projectDetailDelete(item.projectArrNum)">删除</div>
                </div>
                <div class="mid">{{ item.projectstartTime }}/{{ item.projectendTime }}</div>
                <div class="foot">{{  item.projectDescription  }}</div>
            </div>
        </div>
        <div class="club_addDetail" v-if="project_ifAdd">
            <div class="addDetail_title">填写项目经历</div>
            <div class="rowone">
                <label for="" style="margin-left:68px;margin-right: 10px;">项目名称</label>
                <el-input v-model="projectdetail.name" placeholder="请输入内容"></el-input>
            </div>
            <div class="rowtwo">
                <label for="" class="clubdetail_time">起止时间</label>
                <el-date-picker v-model="projectdetail.starttime" type="date" placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
                -
                <el-date-picker v-model="projectdetail.endtime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div class="rowthree">
                <label for="" class="clubdetail_exp"
                    style="margin:0 10px 0 67px;height:133px;line-height:133px;">项目描述</label>
                <el-input type="textarea" :rows="6" placeholder="请输入内容" resize="none" v-model="projectdetail.exp"
                    style="width:650px">
                </el-input>
            </div>
            <div class="rowfour" style="margin-top:40px;height:50px">
                <el-button plain style="margin-left:640px" @click="quitDetailChange">取消</el-button>
                <el-button type="primary" @click="projectDetailSave">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import requests from '@/api/request';
export default {
    data() {
        return {
            projectOT:0,
            projectdetail: {
                name: "",
                starttime: "",
                endtime: "",
                exp: "",
                id: "",
                editAnddelete: false
            },
            project_ifAdd: false,
            project: []
        }
    },
    methods: {
        /*项目部分的CRUD*/
        project_showEditDelete(id) {
            this.project[id].editAnddelete = true;
        },
        project_hideEditDelete(id) {
            this.project[id].editAnddelete = false;
        },
        project_addDetail() {
            this.project_ifAdd = true;
        },
        projectDetailSave() {
            var obj = {
                projectName: this.projectdetail.name,
                projectstartTime: this.projectdetail.starttime,
                projectendTime: this.projectdetail.endtime,
                projectDescription: this.projectdetail.exp,
                projectArrNum: this.projectdetail.id === '' ? this.project.length : this.projectdetail.id,
                editAnddelete: 0
            }
            if (obj.projectName === '' || obj.projectstartTime === '' || obj.projectendTime === '' || obj.projectDescription === '') {
                this.$message({
                    duration: 500,
                    type: 'error',
                    message: '请完整填写',
                    showClose: true
                })
            } else {
                const config = {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }
                console.log(this.projectdetail.id);
                if (this.projectdetail.id !== '') {
                    console.log('编辑运行');
                    this.project.splice(this.projectdetail.id, 1)
                    this.project.splice(this.projectdetail.id, 0, obj)
                    requests.post('/yixun/biography/updateuserproject', JSON.stringify({
                        biographyId: parseInt(localStorage.getItem('biographyId')),
                        projectArrNum: obj.projectArrNum,
                        projectName: obj.projectName,
                        projectDescription: obj.projectDescription,
                        projectstartTime: obj.projectstartTime,
                        projectendTime: obj.projectendTime,
                        editAnddelete: 0
                    }), config).then()
                } else {
                    console.log(this.projectdetail.id);
                    console.log('添加运行');
                    console.log(this.project.length);
                    this.project.splice(this.project.length, 0, obj)
                    requests.post('/yixun/biography/insertuserproject', JSON.stringify({
                        biographyId: parseInt(localStorage.getItem('biographyId')),
                        projectArrNum: obj.projectArrNum,
                        projectName: obj.projectName,
                        projectDescription: obj.projectDescription,
                        projectstartTime: obj.projectstartTime,
                        projectendTime: obj.projectendTime,
                        editAnddelete: 0
                    }), config).then()
                }
                console.log(this.project);
                this.projectdetail.name = ''
                this.projectdetail.starttime = ''
                this.projectdetail.endtime = ''
                this.projectdetail.exp = ''
                this.projectdetail.id = ''
                this.projectdetail.editAnddelete = false
                this.project_ifAdd = false
            }
            

        },
        projectDetailDelete(id) {
            this.project.splice(id, 1)
            for (var i = id; i < this.project.length; i++) {
                this.project[i].projectArrNum = i
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            // requests.post(`/yixun/biography/deleteuserproject/${parseInt(localStorage.getItem('biographyId'))}/${id}`).then()
        },
        projectDetailEdit(id) {
            console.log(this.project[id]);
            this.project_ifAdd = true
            this.projectdetail.name = this.project[id].projectName
            this.projectdetail.starttime = this.project[id].projectstartTime
            this.projectdetail.endtime = this.project[id].projectendTime
            this.projectdetail.id = id
            this.projectdetail.exp = this.project[id].projectDescription
            this.projectdetail.editAnddelete = this.project[id].editAnddelete
        },
        quitDetailChange() {
            this.projectdetail.name = ''
            this.projectdetail.job = ''
            this.projectdetail.starttime = ''
            this.projectdetail.endtime = ''
            this.projectdetail.exp = ''
            this.projectdetail.id = ''
            this.projectdetail.editAnddelete = false
            this.project_ifAdd = false
        },
    /*1/end*/
    },
    watch: {
        project: {
            handler(newval, oldval) {
                this.$nextTick(() => {   //此处使用这个可以等节点渲染后再获取节点
                    this.projectOT = this.$refs.project.offsetTop
                })
                // setInterval(() => {
                //     this.projectOT = this.$refs.project.offsetTop
                //     console.log(this.projectOT);
                // }, 1000);

            },
            immediate: true,
            deep: true
        }
    },
    beforeMount() {
        requests.get(`/yixun/biography/getuserproject/${parseInt(localStorage.getItem('userid'))}`)
            .then(res => {
                if (res.data !== null) {
                    this.project = res.data
                    for (let i = 0, length = this.project.length; i < length; i++) {
                        this.project[i].editAnddelete = this.project[i].editAnddelete === 1
                    }
                }
        }).catch()
    },
    mounted() {
        this.projectOT = this.$refs.project.offsetTop
        this.$bus.$emit('update4', this.projectOT)
    },
}
</script>

<style scoped>

.el-input {
    resize: none;
}

.club_addDetail {
    background-color: #e2e2e2;
    height: 450px;
    width: 842px;
    margin-bottom: 20px;
}

.addDetail_title {
    font: 600 16px Mircosoft Yahei;
    height: 71px;
    line-height: 71px;
    width: 100%;
    padding-left: 20px;
}

.el-input {
    width: 200px;
}

.rowone {
    height: 70px;
}



.rowone .clubdetail_job {
    margin-left: 180px;
}

.rowtwo {
    height: 70px;
}

.rowtwo .clubdetail_time {
    margin-left: 68px;
    margin-right: 10px;
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
</style>