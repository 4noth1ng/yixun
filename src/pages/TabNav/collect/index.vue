<template>
    <div class="divd" style="overflow: visible;">
        <div class="tabnav">
            <el-backtop :right="300" :bottom="500">
                <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
                    TOP
                </div>
            </el-backtop>
            <div class="tabnav_header">
                <div class="tabheader" @click="goPublish">发布记录</div>
                <div class="tabheader" @click="goreceive">接收简历</div>
                <div class="tabheader" @click="goDeliver">投递记录</div>
                <div class="tabheader" @click="goCollect" style="border-bottom: 3px solid #6aa2e4;color:#6aa2e4;">我的收藏
                </div>
            </div>
            <div class="tabnav_footer">
                <div class="footer_title">我的收藏</div>
                <div class="footer_detail">
                    <div class="footerdetail" v-for="(item,index) in collcet" :key="index"
                        @click="goProjectDetail(item.projectId)" @mouseenter="nowIndex=index" @mouseleave="nowIndex=-1">
                        <a>
                            <div class="footerdetail_title" :class="{activeTitle:nowIndex===index}">{{ item.projectTitle }}</div>
                            <div class="footerdetail_introduce">{{ item.projectMessage }}</div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { reqCollectDetail } from '@/api'
import requests from '@/api/request'
export default {
    name: 'collect',
    data() {
        return {
            collcet: [],
            nowIndex:-1
        }
    },
    methods: {
        goPublish() {
            this.$router.push('/tabnav/publish')
        },
        goDeliver() {
            this.$router.push('/tabnav/deliver')
        },
        goreceive() {
            this.$router.push('/tabnav/receive')
        },
        goSurf() {
            this.$router.push('/tabnav/surf')
        },
        goCollect() {
            this.$router.push('/tabnav/collect')
        },
        goProjectDetail(id) {
            this.$router.push({
                name: 'projectdetail',
                query: {
                    projectId: id
                }
            })
        }
    },
    mounted() {

        reqCollectDetail().then(res => {
            this.collcet = res.data

        })
        // requests.get(`/getCollectDetail/${localStorage.getItem('userid')}`,{
        // }).then(res => {
        //     this.collcet = res.data
        //     let idx = 0
        //     for (let i = 0; i < this.collcet.length; i++) {
        //         if (this.collcet[i].status === 2) {
        //             idx = i
        //         }
        //     }
        //     this.collcet.splice(idx, 1)
        // })
    },
}
</script>

<style scoped>
/*TabNav 开始*/
a {
    color: black;
}
.divd{
    width: 1440px;
    margin: 0 auto;
    overflow: visible;
}
.activeTitle{
    color:#6aa2e4;
    text-decoration: underline;
}
.tabnav {
    width: 1000px;
    min-height: 800px;
    height: auto;
    margin: 20px auto -20px auto;
    border: 1px solid grey;
}

.tabnav_header {
    width: 100%;
    background-color: #fff;
    height: 60px;
}

.tabnav_header .tabheader {
    float: left;
    width: 250px;
    font: 500 24px Mircosoft Yahei;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

.tabnav_header .tabheader {
    color: black;
}

.tabnav_header .tabheader:hover {
    cursor: pointer;
}

.tabnav_header .tabheader:nth-child(4) {
    border-bottom: 3px solid #6aa2e4;

}

.tabnav_header .tabheader:nth-child(4) a {
    color: #6aa2e4;
}

.tabnav_footer {
    min-height: 200px;
    height: auto;
    width: 100%;
    margin-top: 3px;
}

.tabnav_footer .footer_title {
    width: 900px;
    margin-left: 50px;
    height: 70px;
    font: 700 28px Microsoft Yahei;
    line-height: 70px;
    text-align: center;
    border-bottom: 1px solid #eaeaea;
}

.tabnav_footer .footer_detail {
    width: 900px;
    margin-left: 50px;
    height: auto;
}

.footer_detail .footerdetail {
    width: 900px;
    height: 150px;
    border-bottom: 1px solid #000;
    margin-top: 40px;
}



.footer_detail .footerdetail:hover {
    cursor: pointer;
}

.footer_detail .footerdetail .footerdetail_title {
    width: 100%;
    font: 500 20px Mircosoft Yahei;
    height: 40px;
    line-height: 40px;
}

.footer_detail .footerdetail .footerdetail_introduce {
    width: 100%;
    font: 500 18px Mircosoft Yahei;
    height: 100px;
    margin-top: 10px;
    word-break: break-word;
}
</style>