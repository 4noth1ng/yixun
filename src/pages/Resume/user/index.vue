<template>
    <div class="user" ref="user">
        <div class="usericon"><img :src="imgUrl" alt=""></div>
        <div class="userinfo">
            <div class="div" @mouseover="editshow = true" @mouseleave="editshow = false" v-if="!edit">
                <div class="userinfo_top">
                    <div class="username">{{  user.name  }}</div>
                    <div class="usersex1" v-show="user.male"><img src="./images/男.png" alt=""></div>
                    <div class="usersex2" v-show="!user.male"><img src="./images/女.png" alt=""></div>
                </div>
                <div class="userinfo_bottom">
                    <div class="userphone">
                        <div class="userphone_icon"><img src="./images/手机.png" alt=""></div>
                        <div class="userphone_num">{{  user.phone  }}</div>
                    </div>
                    <div class="usermail">
                        <div class="usermail_icon"><img src="./images/邮箱.png" alt=""></div>
                        <div class="usermail_num">{{  user.email  }}</div>
                    </div>
                    <div class="editchange" v-show="editshow" @click="userinfoEdit">
                        编辑
                    </div>
                </div>
            </div>

            <div class="editUser" v-if="edit" style="background-color: #c2c2c2; height: 130px;line-height: 70px;">
                <div>
                    <span>姓名：</span>
                    <el-input v-model="name" placeholder="姓名" style="width:200px"></el-input>
                    <span style="margin-left:40px">性别：</span>
                    <el-radio v-model="sex" label=1>男</el-radio>
                    <el-radio v-model="sex" label=0>女</el-radio>
                </div>
                <div>
                    <span>手机号码：</span>
                    <el-input v-model="phonenumber" placeholder="手机号码" style="width:200px"></el-input>
                    <span style="margin-left:10px">邮箱地址：</span>
                    <el-input v-model="email" placeholder="邮箱地址" style="width:200px"></el-input>
                    <el-button style="margin-left:10px" @click="quitEdit">取消</el-button>
                    <el-button type="primary" @click="saveEdit">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reqGetUserInfo } from '@/api'
import requests from '@/api/request'
export default {
    data() {
        return {
            userOT: 0,
            user: {
                name: '',
                phone: '',
                email: '',
                male: 3
            },
            editshow: false,
            edit: false,
            phonenumber: '',
            email: '',
            name: '',
            sex: 3,
            isFirstTime: false,
            imgUrl:''
        }
    },
    methods: {
        quitEdit() {
            this.edit = false
            this.phonenumber = this.user.phone
            this.email = this.user.email
            this.name = this.user.name,
                this.sex = this.user.male
        },
        userinfoEdit() {
            this.edit = true
            this.phonenumber = this.user.phone
            this.email = this.user.email
            this.name = this.user.name,
                this.sex = this.user.male
            if (this.phonenumber === '' && this.name === '' && this.email === '') {
                    this.isFirstTime = true
            } else {
                    this.isFirstTime = false
                }
        },
        saveEdit() {
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            if (this.phonenumber.length != 11) {
                this.$message.error('请输入正确的手机号码')
            } else if (this.name === '') {
                this.$message.error('请填写姓名')
            } else {
                this.user.phone = this.phonenumber
                this.user.email = this.email
                this.user.name = this.name,
                    this.user.male = parseInt(this.sex)
                if (this.isFirstTime === true) {
                    requests.post('/yixun/biography/insertBasicBiographyMsg', JSON.stringify({
                        userId: parseInt(localStorage.getItem('userid')),
                        userSex: parseInt(this.user.male),
                        userName: this.user.name,
                        phoneNum: this.user.phone,
                        email: this.user.email
                    }), config).then(
                        setTimeout(() => {
                            this.$router.go(0)
                        }, 50)
                    ).catch()
                } else {
                    requests.post(`/yixun/biography/updateBiographyMsg`, JSON.stringify({
                        userId:parseInt(localStorage.getItem('userid')),
                        userSex: parseInt(this.user.male),
                        userName: this.user.name,
                        phoneNum: this.user.phone,
                        email: this.user.email
                    }),config).then().catch()
                }
                this.edit = false
            }

        }

    },
    watch: {
        user: {
            handler(newval, oldval) {
                this.$nextTick(() => {   //此处使用这个可以等节点渲染后再获取节点
                    this.userOT = this.$refs.user.offsetTop
                })
                // setTimeout(() => {
                //     this.userOT = this.$refs.user.offsetTop
                // }, 1000);
            },
            immediate: true,
            deep: true
        }
    },
    beforeMount() {
        requests.get(`/yixun/biography/getBasicBiographyMsg/${parseInt(localStorage.getItem('userid'))}`)
            .then(res => {
                if (res.data !== null) {
                    
                    this.user.name = res.data[0].userName,
                        this.user.male = res.data[0].userSex === 1,
                        this.user.phone = res.data[0].phoneNum,
                        this.user.email = res.data[0].email,
                        localStorage.setItem('biographyId', res.data[0].biographyId)
                }
            }).catch()
    },
    async mounted() {
        

        this.userOT = this.$refs.user.offsetTop
        this.$bus.$emit('update5', this.userOT)
        const result = await this.$axios.get("http://119.91.219.167:517/yiban/getUserInfo",{
            params:{
                access_token:localStorage.getItem('access_token')
            }
        })
        if(result.data.data.status==="success"){
            this.imgUrl = result.data.data.info.yb_userhead
        }
    },
}
</script>

<style scoped>
.resume .user {
    width: 100%;
    height: 160px;

    border-bottom: 1px solid #b2b2b2;
}

.resume .user .usericon {
    float: left;
    width: 110px;
    height: 110px;
    margin-left: 33px;
    margin-top: 25px;
    border-radius: 65px;
}

.resume .user .usericon img {
    width: 100%;
    height: 100%;
}

.resume .user .userinfo {
    width: 757px;
    height: 110px;

    float: left;
    margin-top: 25px;
    margin-left: 40px;
}

.resume .user .userinfo_top {
    width: 100%;
    height: 55px;

}

.resume .user .userinfo_top .username {
    height: 55px;
    width: 15%;
    float: left;
    font: 20px Microsoft Yahei;
    line-height: 55px;
}

.resume .user .userinfo_top .usersex1 {
    height: 38px;
    width: 38px;
    float: left;
    margin-top: 8.5px;
}

.resume .user .userinfo_top .usersex2 {
    height: 38px;
    width: 38px;
    float: left;
    margin-top: 8.5px;
}

.usersex1 img {
    width: 100%;
    height: 100%;
}

.usersex2 img {
    width: 100%;
    height: 100%;
}

.userinfo_bottom {
    height: 55px;
    width: 100%;
}

.div:hover {
    cursor: pointer;
    background-color: #d2d2d2;
}

.userinfo_bottom .userphone {
    height: 100%;
    width: 150px;
    float: left;
    font: 18px Microsoft Yahei;
    line-height: 55px;
}

.userinfo_bottom .userphone .userphone_icon {
    margin-top: 6px;
    width: 24px;
    height: 24px;
    float: left;
}

.userphone_icon img {
    width: 100%;
    height: 100%;
}

.userphone .userphone_num {
    float: left;
    width: 126px;

}

.userinfo_bottom .usermail {
    height: 100%;
    width: 250px;
    float: left;
    font: 18px Microsoft Yahei;
    line-height: 55px;
    margin-left: 50px;
}

.userinfo_bottom .usermail .usermail_icon {
    margin-top: 6px;
    width: 24px;
    height: 24px;
    float: left;
}

.usermail_icon img {
    width: 100%;
    height: 100%;
}

.usermail .usermail_num {
    float: left;
    width: 226px;
}

.editchange {
    float: left;
    height: 55px;
    line-height: 55px;
    width: 300px;
    text-align: center;
    color: #6aa2e4
}
</style>