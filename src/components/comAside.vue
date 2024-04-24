<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
        <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
        <el-menu-item @click="clickMenu(item)" :index="item.name" v-for="item in noChildren" :key="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in haveChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="items in item.children" :key="items.path" :index="items.path"
                    @click="clickMenu(items)">{{
                    items.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

    </el-menu>

</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;

    h3 {
        color: white;
        line-height: 48px;
        text-align: center;
        font-size: 16px;
        font-weight: 400px;
    }

}
</style>

<script>
import Cookies from 'js-cookie';
export default {
    data() {
        return {

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            this.$store.commit('SelectMenu', item)
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
                this.$router.push({ name: item.name })
            }

        },

    },
    computed: {
        MenuData() {
            return JSON.parse(Cookies.get('menu')) || this.$store.state.tab.menu
        },
        noChildren() {
            return this.MenuData.filter(item => !item.children)
        },
        haveChildren() {
            return this.MenuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
    }
}
</script>
