<template>
    <div class="club" ref="award" @change="updateTop">
        <div class="title">
            <div class="rec"></div>
            <div class="club_title">获奖经历</div>
            <div class="club_add" @click="addDetail">添加</div>
        </div>
        <div class="detail_outside" v-if="!award_ifAdd">
            <div class="detail" v-for="(item) in award" :key="item.winnerArrNum"
                @mouseover="showEditDelete(item.winnerArrNum)" @mouseleave="hideEditDelete(item.winnerArrNum)">
                <div class="topper">
                    <div class="clubname" style="">{{ item.winnerName }}</div>
                    <div class="clubtime"></div>
                    <div class="clubedit" ref="clubedit" v-show="item.editAnddelete"
                        @click="awardDetailEdit(item.winnerArrNum)">
                        编辑</div>
                    <div class="clubdelete" ref="clubdelete" v-show="item.editAnddelete"
                        @click="awardDetailDelete(item.winnerArrNum)">删除</div>
                </div>
                <div class="mid"></div>
            </div>
        </div>
        <div class="club_addDetail" v-if="award_ifAdd">
            <div class="addDetail_title">填写获奖信息</div>
            <div class="rowone">
                <label for="" style="margin-left: 28px;margin-right: 10px;">奖项名称</label>
                <el-input v-model="awarddetail.name" placeholder="请输入内容"></el-input>
            </div>
            <div class="rowtwo">
            </div>
            <div class="rowfour" style="height:50px;">
                <el-button plain style="margin-left:640px" @click="quitDetailChange">取消</el-button>
                <el-button type="primary" @click="awardDetailSave">保存</el-button>
            </div>
        </div>


    </div>
</template>

<script>
import requests from '@/api/request'
export default {
    data() {
        return {
            awardOT: 1,
            awarddetail: {
                name: '',
                starttime: '',
                endtime: '',
                id: '',
                editAnddelete: false
            },
            award_ifAdd: false,
            award: []
        }
    },
    methods: {
        updateTop() {
            this.awardOT = this.$refs.award.offsetTop
        },
        /*社团或组织部分的crud*/
        showEditDelete(id) {
            this.award[id].editAnddelete = true
            // this.$nextTick(() => {
            //     // this.award[id]["editAnddelete"] = true
            //     this.award[id].editAnddelete = true
            // })
        },
        hideEditDelete(id) {
            this.award[id].editAnddelete = false
            // this.award[id]["editAnddelete"] = false

        },
        addDetail() {
            this.award_ifAdd = true
        },
        awardDetailSave() {
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            var obj = {
                winnerName: this.awarddetail.name,
                winnerstartTime: this.awarddetail.starttime,
                winnerendTime: this.awarddetail.endtime,
                winnerArrNum: this.awarddetail.id === '' ? this.award.length : this.awarddetail.id,
                editAnddelete: this.award.editAnddelete
            }
            if (obj.winnerName==='') {
                // this.$message.error('请完整填写')
                this.$message({
                    duration: 1000,
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
                console.log(this.awarddetail.name+'-------'+obj.winnerName);
                if (this.awarddetail.id !== '') {
                    console.log('编辑运行');
                    this.award.splice(this.awarddetail.id, 1)
                    this.award.splice(this.awarddetail.id, 0, obj)
                    requests.post('/yixun/biography/updateuserwinning', JSON.stringify({
                        biographyId: parseInt(localStorage.getItem('biographyId')),
                        winnerArrNum: obj.winnerArrNum,
                        winnerName: obj.winnerName,
                        winnerstartTime: "2022-2-12",
                        winnerendTime: "2022-2-12",
                        editAnddelete: 0
                    }), config).then()
                } else {
                    console.log(this.awarddetail.id);
                    console.log('添加运行');
                    console.log(this.award.length);
                    this.award.splice(this.award.length, 0, obj)
                    requests.post('/yixun/biography/insertuserwinning', JSON.stringify({
                        biographyId: parseInt(localStorage.getItem('biographyId')),
                        winnerArrNum: obj.winnerArrNum,
                        winnerName: obj.winnerName,
                        winnerstartTime: "2022-2-12",
                        winnerendTime: "2022-2-12",
                        editAnddelete: 0
                    }), config).then()
                }
                console.log(this.award);
                this.awarddetail.name = ''
                this.awarddetail.starttime = ''
                this.awarddetail.endtime = ''
                this.awarddetail.id = ''
                this.awarddetail.editAnddelete = false
                this.award_ifAdd = false
            }
            

        },
        awardDetailDelete(id) {
            this.award.splice(id, 1)
            for (var i = id; i < this.award.length; i++) {
                this.award[i].winnerArrNum = i
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            // requests.post(`/yixun/biography/deleteuserwinning/${parseInt(localStorage.getItem('biographyId'))}/${id}`).then()
        },
        awardDetailEdit(id) {
            console.log(this.award[id]);
            this.award_ifAdd = true
            this.awarddetail.name = this.award[id].winnerName
            this.awarddetail.starttime = this.award[id].winnerstartTime
            this.awarddetail.endtime = this.award[id].winnerendTime
            this.awarddetail.id = id
            this.awarddetail.editAnddelete = this.award[id].editAnddelete
        },
        quitDetailChange() {
            this.awarddetail.name = ''
            this.awarddetail.starttime = ''
            this.awarddetail.endtime = ''
            this.awarddetail.id = ''
            this.awarddetail.editAnddelete = false
            this.award_ifAdd = false
        },
        /*1/end*/

    },
    watch: {
        award: {
            handler(newval, oldval) {
                // let t=setTimeout(() => {
                //     this.awardOT = this.$refs.award.offsetTop
                // }, 1000);
                // this.$nextTick(() => {   //此处使用这个可以等节点渲染后再获取节点
                //     this.awardOT = this.$refs.award.offsetTop
                // })
            },
            immediate: true,
            deep: true
        }
    },
     beforeMount() {
         requests.get(`/yixun/biography/getuserwinning/${parseInt(localStorage.getItem('userid'))}`).then(res => {
             if (res.data !== null) {
                 this.award = res.data
                 for (let i = 0, length = this.award.length; i < length; i++) {
                     this.award[i].editAnddelete = this.award[i].editAnddelete === 1
                 }
            }
        }).catch()
    },
    mounted() {
        this.awardOT = this.$refs.award.offsetTop
        this.$bus.$emit('update1', this.awardOT)
    },
    
}
</script>

<style scoped>
.el-input {
    resize: none;
}

.club_addDetail {
    background-color: #e2e2e2;
    height: 280px;
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
    margin-left: 28px;
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
    width: 366px;
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
