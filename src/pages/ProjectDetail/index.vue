<template>
    <div class="divd">
        <div class="border">
            <div class="detail">
                <div class="top">
                    <div class="info">
                        <div class="info_name">{{ projectTitle }}</div>
                        <div class="info_type">
                            <div class="infotype">
                                <el-tag
                                    style="width: auto;text-align: center;height: 40px;font-size: 16px;line-height: 40px;">
                                    {{ categoryName }}</el-tag>
                            </div>
                        </div>
                    </div>
                    <div class="btns">
                        <el-button :icon="icon" style="margin-left:50px;font-weight: 500;"
                            :class="{ 'active': isActive }" @click="collectProject">收藏</el-button>
                        <el-button icon="el-icon-folder" style="margin-left:20px" @click='selectFile'>投递简历</el-button>
                        <input type="file" accept="application/pdf,application/msword" ref="selectFile" name="file"
                            @change="checkFile($event)" hidden />
                    </div>
                </div>
                <div class="bottom">
                    <div class="projectdetail">
                        <div class="pd_title">项目详情：</div>
                        <div class="pd_content">{{ projectMessage }}</div>
                    </div>
                    <div class="projectdetail">
                        <div class="pd_title">成员介绍：</div>
                        <div class="pd_content">{{ memberIntroduce }}</div>
                    </div>
                    <div class="projectdetail">
                        <div class="pd_title">招募要求：</div>
                        <div class="pd_content">{{ projectRequirement }}</div>
                    </div>
                    <div class="contact">
                        <span class="ct_title">联系方式:</span>
                        <span class="ct_detail">{{ contactDetail }}</span>
                    </div>
                </div>
                <div class="ftinft">
                    <el-button icon="el-icon-folder" style="margin-right:10px" @click='selectFile'>投递简历</el-button>
                    <input type="file" accept="application/pdf,application/msword" ref="selectFile" name="file"
                        @change="checkFile($event)" hidden />

                    <el-button icon="el-icon-folder-delete" @click="deleteProject" style="margin-left:10px">删除项目
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reqProjectDetail } from '@/api'
import { reqCollectDetail } from '@/api'
import requests from '@/api/request'
import QS from 'qs'
export default {
    data() {
        return {
            projectTitle: '',
            categoryName: '',
            project_content: '',
            memberIntroduce: '',
            projectRequirement: '',
            contactDetail: '',
            projectMessage: '',
            isActive: false,
            userId: 123,
            collectAll: [],
            icon:"el-icon-star-off"
        }
    },
    methods: {
        deleteProject() {
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(this.$route.query.projectId);
                if (this.userId !== parseInt(localStorage.getItem('userid'))) {
                    // this.$message.error('无权限')
                    this.$message({
                        duration: 1000,
                        type: 'error',
                        message: '无权限',
                        showClose: true
                    })
                } else {
                    requests.post(`/yixun/project/updateProject/${this.$route.query.projectId}`).then(res => {
                        if (res.code === 10000) {
                            // this.$message.success('删除成功')
                            this.$message({
                                duration: 1000,
                                type: 'success',
                                message: '删除成功',
                                showClose: true
                            })
                            setTimeout(() => {
                                this.$router.push('/home')
                            }, 500);
                        } else {
                            // this.$message.error('删除失败，请检查网络后重试')
                            this.$message({
                                duration: 1000,
                                type: 'error',
                                message: '删除失败，请检查网络后重试',
                                showClose: true
                            })
                        }
                    })
                }
            }).catch(() => {
                this.$message({
                    duration: 1000,
                    showClose: true,
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        selectFile() {
            this.$refs.selectFile.click()  // 这样就会触发 文件的选择
        },
        checkFile(e) {
            const file = e.target.files[0]
            const fileName = file.name
            const fileExt = file.name.split('.').pop().toLocaleLowerCase()
            const userid = this.userId
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const localid = parseInt(localStorage.getItem('userid'))
            const config2 = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            let formdata = new FormData()
            formdata.append('file', file)
            formdata.append('userid',userid)
            console.log(formdata);
            if (fileExt !== 'pdf') {
                // this.$message.error('格式错误，请上传格式为pdf的文件')
                this.$message({
                    duration: 1000,
                    showClose: true,
                    type: 'error',
                    message: '格式错误，请上传格式为pdf的文件'
                })
            } else if (localid===userid) {
                // this.$message.error('无法向自己的项目投递简历')
                this.$message({
                    duration: 1000,
                    showClose: true,
                    type: 'error',
                    message: '无法向自己的项目投递简历'
                })
            }else {
                requests.post('/yixun/file/biography/upload', formdata, config).then(
                    // this.$message.success('上传成功！')
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        type: 'success',
                        message: '上传成功！'
                    })
                )
                requests.post('/yixun/delivery/insertdelivery', JSON.stringify({
                    userId: parseInt(localStorage.getItem('userid')),
                    projectId:parseInt(this.$route.query.projectId)
                }),config2).then().catch()
            }
        },
        collectProject() {
            this.isActive = !this.isActive
            if (this.isActive == true) {
                // this.$message.success('已成功收藏')
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: '已成功收藏',
                    showClose:true
                })
                this.icon = "el-icon-star-on"
                requests.post(`/yixun/collection/postColleDetail/${parseInt(localStorage.getItem('userid'))}/${parseInt(this.$route.query.projectId)}`)
            } else {
                // this.$message.warning('已取消收藏')
                this.$message({
                    duration: 1000,
                    type: 'warning',
                    message: '已取消收藏',
                    showClose: true
                })
                this.icon = "el-icon-star-off"
                requests.post(`/yixun/collection/updateColleDetail/${parseInt(localStorage.getItem('userid'))}/${parseInt(this.$route.query.projectId)}`)
            }
        },
        goMsgBoard() {
            this.$router.push({
                name: 'msgboard',
                query: {
                    projectId: this.$route.query.projectId
                }
            })
        }
    },
    beforeMount() {
        requests.get(`/yixun/project/getProject_details/${parseInt(this.$route.query.projectId)}`).then(res => {
            if (res.code === 10000) {
                console.log(res.data);
                this.projectTitle = res.data[0].projectTitle
                this.categoryName = res.data[0].categoryName
                this.contactDetail = res.data[0].contactDetail
                this.projectRequirement = res.data[0].projectRequirement
                this.memberIntroduce = res.data[0].memberIntroduce,
                this.projectMessage = res.data[0].projectMessage,
                this.userId = res.data[0].userId
            }
        })
        reqCollectDetail().then(res => {
            this.collectAll = res.data
            if (this.collectAll != null) {
                for (let i = 0, length = this.collectAll.length, projectid = this.$route.query.projectId; i < length; i++) {
                    if (projectid == this.collectAll[i].projectId) {
                        this.isActive = true
                        this.icon = "el-icon-star-on"
                        return
                    } else {
                        this.isActive = false
                    }
                }
            }
        })
    },
    mounted(){
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
        clearTimeout(t)
    }
}
</script>

<style scoped>
.divd{
    width: 1440px;
    margin: 0 auto;
    overflow:visible;
}

.active {
    background-color: rgb(236, 245, 255);
    border: 1px solid #6aa2e4;
    color: #6aa2e4;
}

.border {
    width: 1260px;
    height: 1100px;
    margin: 30px auto -10px auto;
    overflow: hidden;  
}

.detail {
    width: 1000px;
    height: 1000px;
    margin: 0px auto 0 auto;
    border: 50px solid #b2b2b2;
}

.detail .top {
    width: 100%;
    height: 130px;
    background-color: #eaeaea;
    border-bottom: 1px solid #b2b2b2;
}

.info {
    float: left;
    height: 100%;
    width: 50%;
    margin-left: 100px;
}

.info .info_name {
    width: 100%;
    height: 65px;
    font: 600 28px Mircosoft Yahei;
    line-height: 65px;

}

.info .info_type {
    width: 100%;
    height: 50%;
}

.btns {
    float: left;
    width: 30%;
    height: 130px;
    line-height: 130px;
}

.btn_collect {
    width: 60px;
    height: 60px;
}

.btn_collect .el-icon-star-off {
    width: 80%;
    height: 80%;
}

.bottom {
    width: 100%;
    height: 769px;
}

.bottom .projectdetail {
    width: 90%;
    height: 200px;
    margin: 0 auto 0 auto;
    border-bottom: 1px solid #eaeaea;
}

.pd_title {
    font: 600 20px Mircosoft Yahei;
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.pd_content {
    width: 100%;
    word-wrap: break-word;
}

.contact {
    width: 90%;
    margin: 0 auto 0 auto;
    height: 80px;
    line-height: 80px;
}

.ct_title {
    font: 600 20px Mircosoft Yahei;
    margin-right: 30px;
}

.ftinft {
    width: 60%;
    height: 100px;
    margin: 0 auto 0 auto;
    text-align: center;
    line-height: 100px;
}
</style>