<template>
    <div>
        <div class="header_outside">
            <div class="header">
                <router-link class="header_logo" to="/home"></router-link>
                <div class="one"><a @click="goHome">首页</a></div>
                <div class="two"><a @click="goProject">项目</a></div>
                <div class="three"><a @click="goResume">我的简历</a></div>
                <div class="four"><a @click="goCollect">我的收藏</a></div>
                <button class="header_login" @click="openlogin">易班登录</button>
                <button class="header_publish" @click="goPublish">发布项目</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reqLogin } from '@/api/index'
import axios from 'axios'
import requests from '@/api/request'
export default {
    name: '',
    data() {
        return {
            phone: '',
            password: ''
        }
    },
    methods: {
        goPublish() {
            this.$router.push('/projectpost')
        },
        goHome() {
            this.$router.push('/home')
        },
        goProject() {
            this.$router.push({
                name: 'project',
                query: {
                    keyword: '',
                    category: ''
                }
            })
        },
        goResume() {
            this.$router.push('/resume')
        },
        goCollect() {
            this.$router.push('/tabnav/collect')
        },
        openlogin() {
            // const config = {
            //     headers: {
            //         'Origin': 'https://oauth.yiban.cn'
            //     }
            // }
            // reqLogin(config).then(res => {
            //     localStorage.setItem('access_token', res.access_token)
            //     localStorage.setItem('userid', res.userid)
            // }).catch()
            //     ;
            // requests.get('/yiban/code/html?client_id=927768e0442c8e57&redirect_uri=/api/yixun/users/login&state=login').then(res => {
            //     localStorage.setItem('access_token', res.access_token)
            //     localStorage.setItem('userid', res.userid)
            // }).catch()
            window.location = "http://43.138.210.224:9081/yixun/users/login"
        }

    },
    mounted() {
        
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

input {
    border: none;
    box-shadow: none;
    outline: none;
}

button {
    outline: none
}

/*最外层DIV部分*/
.header_outside {
    width: 100%;
    height: 65px;
    border-bottom: 1px solid #e0e0e0;
}

/*头部导航栏header部分*/
.header {
    position: relative;
    margin: 0 auto;
    width: 1440px;
    height: 65px;
    line-height: 20px;
    background-color: white;
    color: #4c4c4e;
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
}

.header .header_logo {
    display: inline-block;
    position: absolute;
    left: 124px;
    top: 9px;
    width: 87px;
    height: 50px;
    background: url(./images/logo.png);
    background-size: 100% 100%;
    background-position: center center;
}

.header img:hover {
    cursor: pointer;
}

.header .one {
    position: absolute;
    left: 306px;
    top: 22px;
    width: 40px;
    height: 29px;
    color: #4c4c4e;
    font-size: 20px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}

.header .one:hover {
    cursor: pointer;
    color: #6aa2e4;
}

.header .two {
    position: absolute;
    left: 438px;
    top: 22px;
    width: 40px;
    height: 29px;
    color: #4c4c4e;
    font-size: 20px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}

.header .two:hover {
    cursor: pointer;
    color: #6aa2e4;
}

.header .three {
    position: absolute;
    left: 586px;
    top: 22px;
    width: 80px;
    height: 29px;
    color: #4c4c4e;
    font-size: 20px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}

.header .three:hover {
    cursor: pointer;
    color: #6aa2e4;
}

.header .four {
    position: absolute;
    left: 750px;
    top: 22px;
    width: 80px;
    height: 29px;
    color: #4c4c4e;
    font-size: 20px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
}

.header .four:hover {
    cursor: pointer;
    color: #6aa2e4;
}

.header .header_login {
    position: absolute;
    left: 1100px;
    top: 18px;
    width: 80px;
    height: 32px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Microsoft Yahei;
    border: 1px solid #6aa2e4;
}

.header .header_login:hover {
    color: #6aa2e4;
    cursor: pointer;
}

.header .header_publish {
    position: absolute;
    left: 1238px;
    top: 18px;
    width: 80px;
    height: 32px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Microsoft Yahei;
    border: 1px solid #6aa2e4;
}

.header .header_publish:hover {
    cursor: pointer;
    color: #6aa2e4;
}

/*登陆界面*/
.grey {
    z-index: 999;
    display: none;
    opacity: 0.6;
    background: #b2b2b2;
    width: 100%;
    height: 100%;
    position: fixed;
    /*position: absolute;*/
    top: 0px;
    left: 0px;
}

.login {
    z-index: 1000;
    display: none;
    background-color: #fff;
    width: 465px;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -232.5px;
    margin-top: -250px;
    overflow: hidden;
}

.login .close {
    width: 30px;
    height: 30px;
    margin-left: 420px;
    margin-top: 12px;
}

.login .close img {
    width: 100%;
    height: 100%;
}

.login .close img:hover {
    cursor: pointer;
}

.login .top {
    margin: -20px 0 0 40px;
    width: 100%;
    height: 34px;
}

.login .line {
    float: left;
    width: 10px;
    height: 34px;
    background-color: #6aa2e4;
}

.login .word {
    float: left;
    margin-left: 15px;
    width: 400px;
    height: 34px;
    color: #6aa2e4;
    font: 18px Microsoft Yahei;
    line-height: 34px;
}

.login .mid {
    width: 100%;
    height: 120px;
    margin: 30px 0 0 40px;
}

.login .mid input {
    display: block;
    width: 372px;
    height: 45px;
    margin-bottom: 16px;
    padding-left: 10px;
    border: 1px solid #b2b2b2;
    font: 16px Microsoft Yahei;
    line-height: 45px;
}

.login .checkbox {
    width: 100%;
    height: 20px;
    margin: 20px 0 0 40px;
    font: 14px Microsoft Yahei;
}

.login .login_btn {
    display: block;
    margin-top: 50px;
    margin-left: 40px;
    width: 385px;
    height: 43px;
    border-radius: 4px;
    background-color: #00a5ed;
    color: white;
    font: 18px Microsoft Yahei;
    border: 0ch;
}
</style>