<template>
    <div class="footer_outside">
        <div class="div">
            <div class="footer">
                <a @click="goProject">找项目</a>
                <a @click="goProjectPost">发布项目</a>
                <router-link to="/usercenter">个人中心</router-link>
                <a @click="goBackTop">返回顶部</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    methods: {
        goBackTop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            // 实现滚动效果 
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 20);
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
        goProjectPost() {
            this.$router.push('/projectpost')
        }
    },
    mounted() {
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: Mircosoft Yahei;
}

input {
    border: none;
    box-shadow: none;
    outline: none;
}

button {
    outline: none
}

a {
    text-decoration: none;
}

/*底部导航栏*/
.footer_outside {
    height: 105px;
    background-color: rgba(241, 240, 240, 0.734);
    width: 100%px;
}
.div{
    height: 100%;
    width: 1440px;
    margin: 0 auto;

}
.footer {
    margin: 60px auto 0 auto;
    width: 1197px;
    height: 105px;
    display: flex;
    justify-content: space-between;
}

.footer a {
    display: inline-block;
    width: 150px;
    height: 105px;
    line-height: 105px;
    text-align: center;
    color: #000;
    font-size: 28px;
}

.footer a:hover {
    color: #6aa2e4;
    cursor: pointer;
}
</style>