<template>
    <div class="header">
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handeleMenu" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="../assets/images/user.png" alt="" class="user">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>


        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapState } from 'vuex';
export default {
    methods: {
        handeleMenu() {
            this.$store.commit('CollapseMenu')
        },
        handleCommand(command){
            if(command==='exit'){
                Cookies.remove('token')
                Cookies.remove('menu')
                this.$router.push({name:'login'})
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    }
}
</script>

<style lang="less" scoped>
.header {
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.text {
    color: white;
    margin-left: 14px;
    font-size: 14px;
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.l-content {
    display: flex;
    align-items: center;

    :deep(.el-breadcrumb__item) {
        .el-breadcrumb__inner {
            font-weight: normal;

            &.is-link {
                color: #666;
            }
        }

        &:last-child {
            .el-breadcrumb__inner {
                color: white;
                cursor: pointer;
            }
        }
    }
}
</style>