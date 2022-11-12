<template>
    <div class="tabs">
        <ul>
            <li :class="{ active: active === 0 }" @click="scrollTo(0)">个人信息</li>
            <li :class="{ active: active === 1 }" @click="scrollTo(1)">社团和组织经历</li>
            <li :class="{ active: active === 2 }" @click="scrollTo(2)">项目经历</li>
            <li :class="{ active: active === 3 }" @click="scrollTo(3)">获奖经历</li>
            <li :class="{ active: active === 4 }" @click="scrollTo(4)">个人总结</li>
        </ul>
        <div class="upload">
            <el-button style="width:100%" type="primary" @click="download">生成简历</el-button>
            <span
                style="margin-left:16px;font-weigth:300;color:grey;font-size: 14px;display: block;margin-top: 16px;">生成格式为.pdf的个人简历</span>
            <span
                style="margin-left:16px;font-weigth:300;color:grey;font-size: 14px;display: block;margin-top: 16px;">加载速度较慢，请耐心等候</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            awardOT: 0,
            clubOT: 0,
            judgeOT: 0,
            projectOT: 0,
            userOT: 0,

        }
    },
    methods: {
        download() {
            this.$bus.$emit('download')
        },
        onScroll() {
            const tabs = document.querySelector('.tabs')
            var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (scrollT >= 95) {
                tabs.style.position = 'fixed'
            } else {
                tabs.style.position = 'absolute'
            }
            const offsetTopArr = []
            offsetTopArr.push(this.userOT, this.clubOT, this.projectOT, this.awardOT, this.judgeOT)
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 定义当前点亮的导航下标
            let navIndex = 0;
            for (let n = 0; n < offsetTopArr.length; n++) {
                // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
                // 那么此时导航索引就应该是n了
                if (scrollTop >= offsetTopArr[n]) {
                    navIndex = n;
                }

                if (
                    scrollTop + document.documentElement.clientHeight ===
                    document.documentElement.scrollHeight
                ) {
                    navIndex = offsetTopArr.length - 1;
                }
            }
            this.active = navIndex;

        },
        scrollTo(index) {
            // 获取目标的 offsetTop
            // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
            // 获取当前 offsetTop
            let offsetTopArr = []
            offsetTopArr.push(this.userOT, this.clubOT, this.projectOT, this.awardOT, this.judgeOT)
            let targetOffsetTop = offsetTopArr[index]
            let scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
            const STEP = 50;
            // 判断是往下滑还是往上滑
            if (scrollTop > targetOffsetTop) {
                // 往上滑
                smoothUp();
            } else {
                // 往下滑
                smoothDown();
            }
            // 定义往下滑函数
            function smoothDown() {
                // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
                if (scrollTop < targetOffsetTop) {
                    // 如果和目标相差距离大于等于 STEP 就跳 STEP
                    // 否则直接跳到目标点，目标是为了防止跳过了。
                    if (targetOffsetTop - scrollTop >= STEP) {
                        scrollTop += STEP;
                    } else {
                        scrollTop = targetOffsetTop+1;
                    }
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
                    requestAnimationFrame(smoothDown);
                }
            }
            // 定义往上滑函数
            function smoothUp() {
                if (scrollTop > targetOffsetTop) {
                    if (scrollTop - targetOffsetTop >= STEP) {
                        scrollTop -= STEP;
                    } else {
                        scrollTop = targetOffsetTop;
                    }
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    requestAnimationFrame(smoothUp);
                }
            }
        },

    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
        this.$bus.$on('update1', awardOT => {
            this.awardOT = awardOT
        })
        this.$bus.$on('update2', clubOT => {
            this.clubOT = clubOT

        })
        this.$bus.$on('update3', judgeOT => {
            this.judgeOT = judgeOT

        })
        this.$bus.$on('update4', projectOT => {
            this.projectOT = projectOT
        })
        this.$bus.$on('update5', userOT => {
            this.userOT = userOT
        })
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll)
        this.$bus.$off('update1')
        this.$bus.$off('update2')
        this.$bus.$off('update3')
        this.$bus.$off('update4')
        this.$bus.$off('update5')
    },
}
</script>

<style scoped>
.tabs {
    position: absolute;
    top: 0px;
    width: 198px;
    height: 500px;

}

.tabs ul li {
    background-color: #eaeaea;
    width: 100%;
    height: 40px;
    font: 500 20px Mircosoft Yahei;
    line-height: 40px;
    text-align: center;
    list-style: none;
}

.tabs .active {
    background-color: #b2b2b2;

}

.upload {
    height: 140px;
    width: 100%;
    margin-top: 30px;
    background-color: #eaeaea;
}

.upload-demo button {
    width: 198px;
}
</style>