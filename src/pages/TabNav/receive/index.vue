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
                <div class="tabheader" @click="goreceive" style="border-bottom: 3px solid #6aa2e4;color:#6aa2e4;">接收简历
                </div>
                <div class="tabheader" @click="godeliver">投递记录</div>
                <div class="tabheader" @click="goCollect">我的收藏</div>
            </div>
            <div class="tabnav_footer">
                <div class="footer_title">接收简历</div>
                <div class="footer_detail">
                    <div class="footerdetail">
                        <div class="footerdetail_title">简历</div>
                        <div class="footerdetail_introduce">点击下载：<a :href="url" download="简历.pdf" class="download">{{
                        url }}</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import requests from '@/api/request'
import nprogress from 'nprogress'
export default {
    data() {
        return {
            receive: [],
            url: '',
            nowIndex: -1,
            source: null
        }
    },
    methods: {
        goPublish() {
            this.$router.push('/tabnav/publish')
        },
        godeliver() {
            this.$router.push('/tabnav/deliver')
        },
        goreceive() {
            this.$router.push('/tabnav/receive')
        },
        goCollect() {
            this.$router.push('/tabnav/collect')
        }
    },
    async mounted() {
        const controller = new AbortController();
        requests.get('/yixun/file/biography/download', {
            params: {
                userid: parseInt(localStorage.getItem('userid'))
            },
            responseType: 'blob'
        }).then(res => {
            console.log(res);
            const blobURL = `http://43.138.210.224:9081/yixun/file/biography/download?userid=${parseInt(localStorage.getItem('userid'))}`	// 将文件对象转换成URL链接
            this.url = blobURL
        }).catch(error => {
            this.$message.error('您没有接收到的简历')
            nprogress.done()
        })
        // try {
        //     const result = await requests.get('/yixun/file/biography/download', {
        //         params: {
        //             userid: parseInt(localStorage.getItem('userid'))
        //         },
        //         responseType: 'blob'
        //     })
        //     result.then(() => {
        //         const blobURL = `http://43.138.210.224:9081/yixun/file/biography/download?userid=${parseInt(localStorage.getItem('userid'))}`	// 将文件对象转换成URL链接
        //         this.url = blobURL
        //     })

        // } catch (error) {
        //     this.$message.error('您没有接收到的简历')
        // }
    }
}
</script>

<style scoped>
/*TabNav 开始*/

a {
    color: black;
}

.divd {
    width: 1440px;
    margin: 0 auto;
}

.activeTitle {
    color: #6aa2e4;
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

.tabnav_header .tabheader:nth-child(2) {
    border-bottom: 3px solid #6aa2e4;

}

.tabnav_header .tabheader:nth-child(2) a {
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

.footerdetail .download:hover {
    color: #6aa2e4;
    text-decoration: underline;
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