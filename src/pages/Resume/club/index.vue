<template>
    <div class="club" ref="club">
        <div class="title">
            <div class="rec"></div>
            <div class="club_title">社团或组织经历</div>
            <div class="club_add" @click="addDetail">添加</div>
        </div>
        <div class="detail_outside" v-if="!club_ifAdd">
            <div class="detail" @mouseover="showEditDelete(item.organizationArrNum)"
                @mouseleave="hideEditDelete(item.organizationArrNum)" v-for="(item) in club"
                :key="item.organizationArrNum">
                <div class="topper">
                    <div class="clubname">{{ item.organizationName }}</div>
                    <div class="clubtime">{{ item.pisitionName }}</div>
                    <div class="clubedit" ref="clubedit" v-show="item.editAnddelete"
                        @click="clubDetailEdit(item.organizationArrNum)">编辑
                    </div>
                    <div class="clubdelete" ref="clubdelete" v-show="item.editAnddelete"
                        @click="clubDetailDelete(item.organizationArrNum)">删除
                    </div>
                </div>
                <div class="mid">{{ item.organizationstartTime }}/{{ item.organizationendTime }}</div>
                <div class="foot">{{  item.organizationDescription  }}</div>
            </div>
        </div>
        <div class="club_addDetail" v-if="club_ifAdd">
            <div class="addDetail_title">填写社团或组织信息</div>
            <div class="rowone">
                <label for="" style="margin-left: 28px;margin-right: 10px;">社团/组织名称</label>
                <el-input v-model="clubdetail.name" placeholder="请输入内容"></el-input>
                <label for="" class="clubdetail_job">担任职务</label>
                <el-input v-model="clubdetail.job" placeholder="请输入内容"></el-input>
            </div>
            <div class="rowtwo">
                <label for="" class="clubdetail_time">起止时间</label>
                <el-date-picker v-model="clubdetail.starttime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                /
                <el-date-picker v-model="clubdetail.endtime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div class="rowthree">
                <label for="" class="clubdetail_exp"
                    style="margin:0 10px 0 67px;height:133px;line-height:133px;">经历描述</label>
                <el-input type="textarea" :rows="6" placeholder="请输入内容" resize="none" v-model="clubdetail.exp"
                    style="width:650px">
                </el-input>
            </div>
            <div class="rowfour" style="margin-top:40px;height:50px">
                <el-button plain style="margin-left:640px" @click="quitDetailChange">取消</el-button>
                <el-button type="primary" @click="clubDetailSave">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import requests from '@/api/request'
export default {
data() {
        return {
        clubOT:0,
        clubdetail: {
            name: '',
            job: '',
            starttime: '',
            endtime: '',
            exp: '',
            id: '',
            editAnddelete: false
        },
        club_ifAdd: false,
        club: [],
    }
    },
    watch: {
        club: {
            handler(newval, oldval) {
            //    let t=  setTimeout(() => {
            //         this.clubOT = this.$refs.club.offsetTop
            //     }, 1000);
                this.$nextTick(() => {   //此处使用这个可以等节点渲染后再获取节点
                    this.clubOT = this.$refs.club.offsetTop
                })
            },
            immediate: true,
            deep: true
        }
    },
    beforeMount() {
        requests.get(`/yixun/biography/getuserorganization/${parseInt(localStorage.getItem('userid'))}`)
            .then(res => {
                if (res.data !== null) {
                    this.club = res.data
                    for (let i = 0, length = this.club.length; i < length; i++) {
                        this.club[i].editAnddelete = this.club[i].editAnddelete === 1
                        
                    }
                }
        }).catch()
    },
    mounted() {
        this.clubOT = this.$refs.club.offsetTop
        this.$bus.$emit('update2', this.clubOT)
    },
methods: {
    /*社团或组织部分的crud*/
    showEditDelete(id) {
        this.club[id].editAnddelete = true
    },
    hideEditDelete(id) {
        this.club[id].editAnddelete = false
    },
    addDetail() {
        this.club_ifAdd = true
    },
    clubDetailSave() {
        var obj = {
            organizationName: this.clubdetail.name,
            pisitionName: this.clubdetail.job,
            organizationstartTime: this.clubdetail.starttime,
            organizationendTime: this.clubdetail.endtime,
            organizationDescription: this.clubdetail.exp,
            organizationArrNum: this.clubdetail.id === '' ? this.club.length : this.clubdetail.id,
            editAnddelete: false
        }
        if (obj.organizationName === '' || obj.pisitionName === '' || obj.organizationstartTime === '' || obj.organizationendTime === '' || obj.organizationDescription === '') {
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
            if (this.clubdetail.id !== '') {
                this.club.splice(this.clubdetail.id, 1)
                this.club.splice(this.clubdetail.id, 0, obj)
                requests.post('/yixun/biography/updateuserorganization', JSON.stringify({
                    biographyId: parseInt(localStorage.getItem('biographyId')),
                    organizationArrNum: obj.organizationArrNum,
                    organizationName: obj.organizationName,
                    pisitionName: obj.pisitionName,
                    organizationDescription: obj.organizationDescription,
                    organizationstartTime: obj.organizationstartTime,
                    organizationendTime: obj.organizationendTime,
                    editAnddelete: 0,
                }), config).then(
                   
                )
            } else {
                this.club.splice(this.club.length, 0, obj)
                requests.post('/yixun/biography/insertuserorganization', JSON.stringify({
                    biographyId: parseInt(localStorage.getItem('biographyId')),
                    organizationArrNum: obj.organizationArrNum,
                    organizationName: obj.organizationName,
                    pisitionName: obj.pisitionName,
                    organizationDescription: obj.organizationDescription,
                    organizationstartTime: obj.organizationstartTime,
                    organizationendTime: obj.organizationendTime,
                    editAnddelete: 0,
                }), config).then()
            }
            this.clubdetail.name = ''
            this.clubdetail.job = ''
            this.clubdetail.starttime = ''
            this.clubdetail.endtime = ''
            this.clubdetail.exp = ''
            this.clubdetail.id = ''
            this.clubdetail.editAnddelete = false
            this.club_ifAdd = false
        }
        

    },
    clubDetailDelete(id) {
        this.club.splice(id, 1)
        for (var i = id; i < this.club.length; i++) {
            this.club[i].organizationArrNum = i
        }
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
        // requests.post(`/yixun/biography/deleteuserorganization/${parseInt(localStorage.getItem('biographyId'))}/${id}`).then()
    },
    clubDetailEdit(id) {
        this.club_ifAdd = true
        this.clubdetail.name = this.club[id].organizationName
        this.clubdetail.job = this.club[id].pisitionName
        this.clubdetail.starttime = this.club[id].organizationstartTime
        this.clubdetail.endtime = this.club[id].organizationendTime
        this.clubdetail.id = id
        this.clubdetail.exp = this.club[id].organizationDescription
        this.clubdetail.editAnddelete = this.club[id].editAnddelete
    },
    quitDetailChange() {
        this.clubdetail.name = ''
        this.clubdetail.job = ''
        this.clubdetail.starttime = ''
        this.clubdetail.endtime = ''
        this.clubdetail.exp = ''
        this.clubdetail.id = ''
        this.clubdetail.editAnddelete = false
        this.club_ifAdd = false
    },
    /*1/end*/
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
    font: 500 16px Mircosoft Yahei;
    line-height: 32px;
}

.detail .foot {
    height: 60px;
    width: 100%;
    margin-top: 20px;
    font: 500 16px Mircosoft Yahei;
}
</style>