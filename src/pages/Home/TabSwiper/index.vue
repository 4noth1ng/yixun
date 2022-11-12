<template>
    <div class="tabswiper">
        <div class="forms">
            <div class="formsone" @mouseover="showFormsHiddenOne" @mouseleave="hideFormsHiddenOne">
                <div class="forms_one" ref="forms_one">
                    <img src="./images/学生.png" alt="" class="left">
                    <span>本科生招募</span>
                    <img src="./images/向右三角形.png" alt="" class="right">
                </div>
                <div class="forms_hiddenone" ref="forms_hiddenone">
                    <ul>
                        <li>
                            <a v-for="(item,index) in student" :key="index" @click="goProject(item)">{{item}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="formstwo" @mouseover="showFormsHiddenTwo" @mouseleave="hideFormsHiddenTwo">
                <div class="forms_two" ref="forms_two">
                    <img src="./images/老师.png" alt="" class="left">
                    <span>教师、研究生招募</span>
                    <img src="./images/向右三角形.png" alt="" class="right">
                </div>
                <div class="forms_hiddentwo" ref="forms_hiddentwo">
                    <ul>
                        <li>
                            <a v-for="(item,index) in teacher" :key="index" @click="goProject(item)">{{item}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="swiper" @mouseover="changeInterval(true)" @mouseleave="changeInterval(false)">
            <transition-group name="list">
                <img alt="" v-for=" (item) in imgArr" :key="item.imgId" v-show="item.imgId === currentIndex"
                    @click="visitImg(item.detailsUrl)" :data-src="item.imgUrl" ref="tabImg">
            </transition-group>
            <div class="iconDiv iconleft" @click="clickIcon('up')"></div>
            <div class="iconDiv iconright" @click="clickIcon('down')"></div>
            <div class="banner_circle">
                <ul>
                    <li v-for="(item) in imgArr" :key="item.imgId" :class="item.imgId === currentIndex ? 'active' : ''"
                        @click="changeImg(item.imgId)"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { reqSwiper } from '@/api/index'
import pic1 from './images/picture1.png'
import pic2 from './images/picture2.png'
import pic3 from './images/picture3.png'
export default {
    name: 'TabSwiper',
    data() {
        return {
            currentIndex: -1,
            timer: null,
            imgArr: [
                {
                    imgId: 0,
                    imgUrl: pic1,
                    detailsUrl: "https://www.scau.edu.cn/2022/0425/c1577a313343/page.htm"
                },
                {
                    imgId: 1,
                    imgUrl: pic2,
                    detailsUrl: "https://xcb.scau.edu.cn/dsjy/"
                },
                {
                    imgId: 2,
                    imgUrl: pic3,
                    detailsUrl: "https://lyg.scau.edu.cn/"
                }
            ],
            student: ['三下乡', '互联网+', '电子工程', '智能机器人', '艺术类', '数学建模', 'acm', '辩论'],
            teacher: ['实验室招募', '实验室项目类', '实验室比赛类', '实验室打杂'],
            keyword: '',
            category: '',
            imgurl: { pic1, pic2, pic3 }
        }
    },
    methods: {
        goProject(index) {
            this.$router.push({
                name: 'project',
                query: {
                    keyword: '',
                    category: index,
                }
            })
        },
        showFormsHiddenOne() {
            this.$refs.forms_hiddenone.style.display = 'block';
            this.$refs.forms_one.className = 'forms_one forms_one_hover';
        },
        hideFormsHiddenOne() {
            this.$refs.forms_hiddenone.style.display = 'none';
            this.$refs.forms_one.className = 'forms_one';
        },
        showFormsHiddenTwo() {
            this.$refs.forms_hiddentwo.style.display = 'block';
            this.$refs.forms_two.className = 'forms_two forms_two_hover';
        },
        hideFormsHiddenTwo() {
            this.$refs.forms_hiddentwo.style.display = 'none';
            this.$refs.forms_two.className = 'forms_two';
        },
        visitImg(e) {
            window.open(e)
        },
        clickIcon(val) {
            if (val === 'down') {
                this.currentIndex++;
                if (this.currentIndex === this.imgArr.length) {
                    this.currentIndex = 0;
                }
            } else {
                /* 第一种写法
                this.currentIndex--;
                if(this.currentIndex < 0){
                    this.currentIndex = this.imgArr.length-1;
                } */
                // 第二种写法
                if (this.currentIndex === 0) {
                    this.currentIndex = this.imgArr.length;
                }
                this.currentIndex--;
            }
        },
        startInterval() {
            // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.currentIndex++;
                if (this.currentIndex > this.imgArr.length - 1) {
                    this.currentIndex = 0
                }
            }, 5000)
        },
        changeInterval(val) {
            if (val) {
                clearInterval(this.timer)
            } else {
                this.startInterval()
            }
        },
        changeImg(id) {

            this.currentIndex = id
        }

    },
    mounted() {
        this.currentIndex++
        this.startInterval();

    },
    watch: {
        currentIndex: {
            handler(newval, oldval) {
                console.log(this.currentIndex);

                this.$refs.tabImg[newval].src = this.$refs.tabImg[newval].dataset.src
            }
        }
    }
}
</script>

<style scoped lang="scss">
.tabswiper {
   width: 100%;
   display: flex;
   justify-content: center;
}
.list-enter,
.list-leave-to {
    opacity: 0.7;
}

.list-leave-active {
    transition: all .2s ease-out;
}

.list-enter-active {
    transition: all .4s ease-in;
}

li {
    list-style: none;
    text-decoration: none;
}

/*表单部分和轮播图部分*/

 .forms {
    width: 301px;
    height: 440px;
    background-color: rgba(241, 240, 240, 0.734);
    font-family: Microsoft Yahei;
    border-radius: 10px;
    float: left;
}

.formsone {
    position: relative;
    width: 301px;
    height: 60px;

}

.forms_one {
    line-height: 60px;
    width: 301px;
    height: 60px;
    transition: box-shadow linear .3s;

}

.forms_one_hover {
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    background-color: white;
    border: 0.3px solid gainsboro;
}

.forms_two_hover {
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    background-color: white;
    border: 0.3px solid gainsboro;
}

.forms_one .left {
    float: left;
    width: 50px;
    height: 50px;
    margin-top: 5px;
}

.forms_one .right {
    float: right;
    width: 40px;
    height: 40px;
    margin-top: 10px;
}

.forms_one span {
    margin-left: 5px;
    font-size: 20px;
}

.formstwo {
    position: relative;
    width: 301px;
    height: 60px;
}

.forms_two {
    line-height: 60px;
    width: 301px;
    height: 60px;
    transition: box-shadow linear .3s;
}

.forms_two .left {
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-left: 7px;
}

.forms_two .right {
    float: right;
    width: 40px;
    height: 40px;
    margin-top: 10px;
}

.forms_two span {
    margin-left: 5px;
    font-size: 20px;
}

.forms_hiddenone {
    z-index: 200;
    position: absolute;
    left: 303px;
    top: 0px;
    background-color: white;
    width: 200px;
    height: 230px;
    min-height: 200px;
    padding-left: 15px;
    padding-top: 5px;
    border: 1px solid gainsboro;
    display: none;
}

.forms_hiddenone ul li {
    width: 100%;
    height: 28px;
    margin-top: 5px;
    line-height: 28px;
}

.forms_hiddenone ul li:nth-child(1) {
    margin-top: 0;
}

.forms_hiddenone ul li a {
    color: rgba(16, 16, 16, 100);
    display: block;
}

.forms_hiddenone ul li a:hover {
    color: #6aa2e4;
    text-decoration: none;
    cursor: pointer;
}

.forms_hiddentwo {
    z-index: 200;
    position: absolute;
    left: 303px;
    top: 0px;
    background-color: white;
    width: 200px;
    height: auto;
    min-height: 200px;
    padding-left: 15px;
    padding-top: 5px;
    border: 1px solid gainsboro;
    display: none;
}

.forms_hiddentwo ul li {
    width: 100%;
    height: 28px;
    margin-top: 5px;
    line-height: 28px;
}

.forms_hiddentwo ul li:nth-child(1) {
    margin-top: 0;
}

.forms_hiddentwo ul li a {
    color: rgba(16, 16, 16, 100);
    display: block;
}

.forms_hiddentwo ul li a:hover {
    color: #6aa2e4;
    text-decoration: none;
    cursor: pointer;
}

/*表单部分结束*/
/*轮播图部分开始*/
 .swiper {
    position: relative;
    margin-left: 12px;
    float: left;
    width: 880px;
    height: 438px;
    background-color: black;
    overflow: hidden;
}

 .swiper:hover {
    cursor: pointer;
}

 .swiper img {
    width: 100%;
    height: 100%;
}


.iconleft {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;
    background: url(./images/左箭头.png);
    background-size: 100% 100%;
    background-position: center center;
    z-index: 100;
    left: 10px;
}

.iconleft:hover {
    background-color: #e2e2e2;
    cursor: pointer;
}

.iconright {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;
    background: url(./images/右箭头.png);
    background-size: 100% 100%;
    background-position: center center;
    z-index: 100;
    left: 50%;
    margin-left: 390px;
}

.iconright:hover {
    background-color: #e2e2e2;
    cursor: pointer;
}

.banner_circle {
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: 5%;
}

.banner_circle ul {
    text-align: center;
    margin: 0 50px;
    height: 100%;
}

.banner_circle ul li {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 0 5px;
    border-radius: 7px;
    background-color: #cccccc;
    cursor: pointer;
}

.active {
    background-color: #6aa2e4 !important;
}

/*轮播图部分结束*/



.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}
</style>