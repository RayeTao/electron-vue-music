<template>
    <div class="user-info">
        <div class="avatar no-drag" @click="login">
            <img v-if="user.is_login" :src="user.profile.avatarUrl" />
            <img v-else src="../../assets/images/max.png">
        </div>
        <div class="mt-5">
            <el-button style="color: #555;" type="text" class="no-drag" size="mini" @click="login">
                {{user.is_login?user.profile.nickname:"立即登录"}}
            </el-button>
        </div>
        <div class="font-assist  type-icons">
            <i class="iconfont icon-LV8" style="color: red"></i>
            <i class="iconfont icon-vip"></i>
        </div>
    </div>
</template>
<script>
    import locs from "../../utils/locs";

    export default {

        methods: {
            login() {
                console.log(this.user)
                if (this.user.is_login) {
                    this.$bus.$emit('userInfo')
                    //this.$bus.$emit('login')

                } else {
                    this.$bus.$emit('login')

                }

            }
        },
        computed: {
            user() {
               // console.log(this.$store.state.user)
                return this.$store.state.user
                //return locs.get('userInfo')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .user-info {
        -webkit-app-region: drag;
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .avatar {
            width: 100px;
            height: 100px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                cursor: pointer;
            }
        }
        .type-icons {
            display: flex;
            justify-content: center;
            i {
                font-size: 22px;
                color: #999;
                margin-left: 8px;
            }
            i:first-child{
                margin-left: 0;
            }
        }
    }
</style>
