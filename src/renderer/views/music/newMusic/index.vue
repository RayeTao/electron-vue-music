<template>
    <el-scrollbar class="choiceness-view scroll-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="1"></el-tab-pane>
        <el-tab-pane label="华语" name="2"></el-tab-pane>
        <el-tab-pane label="欧美" name="3"></el-tab-pane>
        <el-tab-pane label="韩国" name="4"></el-tab-pane>
        <el-tab-pane label="日本" name="5"></el-tab-pane>
    </el-tabs>
    </el-scrollbar>
</template>

<script>
    export default {
        data(){
            return{
                activeName:'1'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .scroll-page {
        overflow: hidden;
        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }
    .choiceness-view {
        flex: 1;
        overflow: hidden;
    }
</style>