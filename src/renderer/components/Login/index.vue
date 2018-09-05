<template>
    <el-dialog :visible.sync="showLogin" :append-to-body="true" width="340px" :close-on-click-modal="false" custom-class="login-dialog">
        <div class="login-body">
            <i class="icon el-icon-service"></i>
            <el-tabs v-model="loginTypeName" style="margin: 20px auto" @tab-click="handleClick">
                <el-tab-pane label="手机号登录" name="first"></el-tab-pane>
                <el-tab-pane label="邮箱登录" name="second"></el-tab-pane>
            </el-tabs>
            <template class="from" v-if="showPhoneLogin">
                <el-input :autofocus="true" v-model="phone" clearable placeholder="请输入手机号"></el-input>
                <el-input v-model="password" type="password" clearable placeholder="请输入密码" class="text-input"></el-input>
            </template>
            <template class="from" v-else="!showPhoneLogin">
                <el-input :autofocus="true" v-model="email"  clearable placeholder="请输入邮箱">
                    <template slot="append">@163.com</template>
                </el-input>
                <el-input v-model="password" type="password" clearable placeholder="请输入密码" class="text-input"></el-input>
            </template>
            <el-button type="danger"  @click="login" :loading="loading" class="text-button">立即登录</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import ElTabPane from "element-ui/packages/tabs/src/tab-pane";
    import http from '../../utils/http'
    import {Message} from 'element-ui';
    import locs from '../../utils/locs'
    export default {
        data() {
            return {
                showLogin: false,
                phone: '',
                password: '',
                email:'',
                loading: false,
                loginTypeName: 'first',
                showPhoneLogin: true,
            }
        },
        components: {
            ElTabPane
        },
        mounted() {
            this.$bus.$on('login', res => {
                this.showLogin = true
            })
        },
        methods: {
            handleClick:function (tab,event) {
                if(this.loginTypeName == 'first'){
                    this.showPhoneLogin = true
                }else if(this.loginTypeName == 'second'){
                    this.showPhoneLogin = false
                }
            },
            login: function() {
                if(!this.checkInput()){
                    return
                }
                this.loading = true;
                if(this.showPhoneLogin){
                    http.get('/login/cellphone',{
                        params:{
                            phone: this.phone,
                            password: this.password
                        }
                    }).then(res => {
                        this.loading = false;
                        this.showLogin = false;

                        console.log(res)
                        this.$router.go(-1)
                       this.$store.dispatch('SET_LOGIN', res)
                    }).catch(res => {
                        this.loading = false
                    })
                }else{
                    http.get('/login',{
                        params: {
                            email: this.email + '@163.com',
                            password: this.password
                        }
                    }).then(res => {
                        this.loading = false;
                        this.showLogin = false;
                        //this.$store.dispatch('SET_LOGIN', res)
                    }).catch(res => {
                        this.loading = false
                    })
                }

            },
            checkInput:function () {
                if(this.showPhoneLogin){
                    //校验手机号
                    if(!this.phone && !/^1\d{10}$/.test(this.phone)){
                        Message({
                            message: '请输入正确的手机号',
                            type: 'warning',
                            center: true
                        })
                        return false
                    }
                }else{
                    //校验邮箱
                    if(!this.email){
                        Message({
                            message: '请输入邮箱',
                            type: 'warning',
                            center: true
                        })
                        return false
                    }
                }
                if(!this.password){
                    Message({
                        message: '请输入密码',
                        type: 'warning',
                        center: true
                    })
                    return false
                }
                return true
            }
        },
        computed: {
            disabled() {
                //return (this.phone.length === 11|| this.email.length >1) && this.password.length > 1
                return this.checkInput()
            }
        }
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
