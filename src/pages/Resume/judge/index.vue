<template>
    <div class="judge club" ref="judge">
        <div class="title">
            <div class="rec"></div>
            <div class="club_title">个人总结</div>
            <div class="club_add" @click="awardDetailEdit">编辑</div>
        </div>
        <div class="detail_outside" v-if="!award_ifAdd">
            <div class="detail">
                {{exp}}
            </div>
        </div>
        <div class="club_addDetail" v-if="award_ifAdd">
            <div class="addDetail_title">填写个人总结</div>
            <div class="rowthree">
                <label for="" class="clubdetail_exp"
                    style="margin:0 10px 0 27px;height:133px;line-height:133px;">经历描述</label>
                <el-input type="textarea" :rows="6" placeholder="请输入内容" resize="none" v-model="expchange"
                    style="width:650px">
                </el-input>
            </div>
            <div class="rowfour" style="height:50px;margin-top: 10px;">
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
            exp: '',
            expchange: '',
            award_ifAdd: false,
            judgeOT: '',
            isFirstTime:false
        }
    },
    methods: {
        awardDetailEdit() {
            this.award_ifAdd = true
            this.expchange = this.exp
            if (this.expchange === '') {
                this.isFirstTime = true
            } else {
                this.isFirstTime = false
            }
        },
        quitDetailChange() {
            this.expchange = ''
            this.award_ifAdd = false
        },
        awardDetailSave() {
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            this.exp = this.expchange
            if (localStorage.getItem('isFirstTime')===null) {
                requests.post('/yixun/biography/insertusersummary', JSON.stringify({
                    editAnddelete: 0,
                    personnalSummary: this.exp,
                    publicTime: '',
                    updateTime: '',
                    biographyId: parseInt(localStorage.getItem('biographyId'))
                }), config).then(
                    localStorage.setItem('isFirstTime', 'no')
                ).catch()
            } else {
                requests.post(`/yixun/biography/updateusersummary`, JSON.stringify({
                    biographyId: parseInt(localStorage.getItem('biographyId')),
                    personnalSummary: this.exp,
                    updateTime: '',
                    editAnddelete: 0,
                    publicTime: ''
                }),config).then().catch()
            }
            this.award_ifAdd = false
        },
        
    },
    watch: {
        exp: {
            handler(newval, oldval) {
                this.$nextTick(() => {   //此处使用这个可以等节点渲染后再获取节点
                    this.judgeOT = this.$refs.judge.offsetTop
                })
            //    let t= setTimeout(() => {
            //         this.judgeOT = this.$refs.judge.offsetTop
            //     }, 1000);
            },
            immediate: true,
            deep: true
        }
    },
    beforeMount() {
        requests.get(`/yixun/biography/getusersummaryById/${localStorage.getItem('userid')}`)
            .then(res => {
                if (res.data !== null) {
                    this.exp = res.data.personnalSummary
                }
        }).catch()
    },
    mounted() {
        this.judgeOT = this.$refs.judge.offsetTop
        this.$bus.$emit('update3', this.judgeOT)
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