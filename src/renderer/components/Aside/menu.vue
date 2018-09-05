<template>
    <el-scrollbar class="menu-view scroll-page">
        <div class="menu-group">
            <div class="menu-title">推荐</div>
            <div class="menu-item active">
                <div class="left"><i class="iconfont icon-yinyue"></i>发现音乐</div>
            </div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-diantai"></i>私人FM</div>
            </div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-MV"></i>MV</div>
            </div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-duihuakuang"></i>动态</div>
            </div>
        </div>

        <div class="menu-group">
            <div class="menu-title">我的音乐</div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-bendi"></i>本地音乐</div>
            </div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-download"></i>下载管理</div>
            </div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-yunpan1"></i>我的音乐云盘</div>
            </div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-wodeshoucang"></i>我的收藏</div>
            </div>
        </div>

        <div class="menu-group">
            <div class="menu-title">
                <div class="left">创建的歌单</div>
                <div class="right"><i class="iconfont icon-jia-copy"></i><i class="iconfont icon-xiangxia"></i></div>
            </div>
            <template v-for="(item,index) in playList " >
                <div class="menu-item" >
                    <div class="left" v-if="index==0" ><i class="iconfont icon-woxihuande"></i>我喜欢的音乐</div>
                    <div class="left" v-else><i class="iconfont icon-yinleliebiao"></i>{{item.name}}</div>
                </div>
            </template>


        </div>

    <!--    <div class="menu-group">
            <div class="menu-title">
                <div class="left">收藏的歌单</div>
                <div class="right"><i class="iconfont icon-xiangxia"></i></div>
            </div>
            <div class="menu-item">
                <div class="left"><i class="iconfont icon-yinyue"></i>Convoy</div>
            </div>
        </div>-->


    </el-scrollbar>
</template>

<script>
    import http from '../../utils/http'
    export default {
        data(){
            return{
                userInfo:{},
                playList:[],
                
            }
        },
        methods:{
            init:function () {
                this.userInfo = this.$store.state.user
                console.log(this.userInfo)
                this.getPlayList()
            },
            getPlayList:function () {
                let vm = this
                http.get('/user/playList',{
                    params:{
                        uid: vm.$store.state.user.profile.userId
                    }
                }).then(res => {
                    vm.playList.push.apply(vm.playList,res.playlist)
                }).catch(function (error) {
                    
                })
            }
        },
       created(){
           this.init()
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

    .menu-view {
        flex: 1;
        overflow: hidden;

        .menu-group {
            margin-bottom: 25px;
            padding: 0 20px;
            .menu-title {
                margin-bottom: 10px;
                font-size: 12px;
                padding-left: 10px;
                display: flex;
                align-items: center;
                color: #666;
                .left {
                    flex: 1;
                }
                .right {
                    width: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .iconfont {
                        font-size: 14px;
                        color: #888;
                        margin-left: 10px;
                    }

                }
            }
            .menu-item {
                padding: 5px 10px;
                font-size: 13px;
                border-radius: 2px;
                margin-bottom: 5px;
                cursor: pointer;
                .left {
                    .iconfont {
                        margin-right: 10px;
                    }
                    .iconfont.hot {
                        color: #ff4400;
                    }
                }
            }
            .menu-item:hover {
                background: #E6E7E7;
            }

            .menu-item.active {
                background: #31C27C;
                color: #fff;
            }
        }

    }
</style>
