<template>
    <el-dialog :visible.sync="showUserInfo" :append-to-body="true"  width="400px":close-on-click-modal="false" custom-class="login-dialog">
        <div  class="login-body" >
            <div style="margin: 20px;float: left">
                <img :src="userInfo.profile.avatarUrl" width="150px" height="150px"/>
            </div>
            <div style="float: left;margin-left: 20px">
                <p  style="font-size: 20px">{{userInfo.profile.nickname}}</p>
                <p >个人介绍:<span style="margin-left: 10px">{{userInfo.profile.signature?userInfo.profile.signature : '暂无个人介绍'}}</span></p>
            </div>
        </div>
            <div style="clear:both;text-align: center;">
                <el-button type="danger"  @click="loginout"  class="text-button">退出登录</el-button>
            </div>
    </el-dialog>
</template>
<script>
    import locs from '../../utils/locs'
    export default {
        data() {
            return {
                showUserInfo: false,
                userInfo: {}
            }
        },
        mounted() {
            this.$bus.$on('userInfo', res => {
                this.showUserInfo = true
                this.init()
            })
        },
        methods: {
            init: function () {
                this.userInfo = this.$store.state.user
            },
            loginout: function () {
                this.userInfo.is_login = false;
                this.$store.dispatch('SET_LOGINOUT', this.userInfo)
                this.showUserInfo = false
            },
        },
    }
</script>

<style lang="scss" scoped>
    .login-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            color: #f56c6c;
            font-size: 80px;
        }
        /deep/ .from {
            width: 260px;
            margin-top: 30px;
            .input-items {
                background: white;
                border: 1px solid #f0f0f0;
                border-radius: 2px;
                overflow: hidden;
            }
            .input-box {
                display: flex;
                align-items: center;
                margin-top: 10px;
                .l-icon {
                    width: 40px;
                    height: 40px;
                    i {
                        font-size: 20px;
                        color: #999;
                    }
                }
                .el-input__inner {
                    border: none;
                    padding: 10px;
                }
            }
            .border-t {
                border-top: 1px solid #f0f0f0;
            }
            .btns {
                margin-top: 30px;

                button {
                    width: 100%;
                }
            }
        }
        .text-input{
            margin-top: 10px;
        }
        .text-button{
            margin-top: 20px;
        }
    }
</style>
