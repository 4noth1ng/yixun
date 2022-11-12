<template>
    <div class="search" @keyup.enter="goProject">
        <div class="left">
            <img src="./images/搜索.png" alt="">
            <input v-model="keyword" type="text" placeholder="请输入你想要搜索的项目">
            <button class="search_btn" @click="goProject">搜索</button>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'ProjectSearch',
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        goProject() {
            this.$router.push({
                name: 'project',
                query: {
                    keyword: this.keyword,
                    category: ''
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
 .search {
    width: 823px;
    height: 89px;
    line-height: 20px;
    text-align: center;
}

.search .left {
    position: relative;
    margin-left: 11px;
    margin-top: 16px;
    width: 685px;
    height: 59px;
    line-height: 20px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 100);
    text-align: center;
    border: 1px solid #6aa2e4;
}

.search .left img {
    position: absolute;
    left: 16px;
    top: 11px;
    width: 39px;
    height: 39px;
}

.search .left input {
    position: absolute;
    left: 80px;
    top: 10px;
    padding-left: 10px;
    width: 636px;
    height: 39px;
    color: rgba(136, 136, 136, 100);
    font-size: 20px;
    text-align: left;
    font-family: Microsoft Yahei;
    border: 0;
    border-left: 1px solid #eee;
}

.search .search_btn {
    position: absolute;
    left: 685px;
    top: -1px;
    width: 106px;
    height: 61px;
    border-radius: 4px;
    background-color: #6aa2e4;
    color: white;
    font-size: 20px;
    text-align: center;
    font-family: Microsoft Yahei;
    border: 0;
}

.search .search_btn:hover {
    cursor: pointer;
} 
</style>