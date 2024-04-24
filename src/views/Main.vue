<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <comAside></comAside>
            </el-aside>
            <el-container>
                <el-header>
                    <comHeader></comHeader>
                </el-header>
                <comTag></comTag>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import comHeader from '@/components/comHeader.vue'
import comAside from '../components/comAside.vue'
import comTag from '../components/comTag.vue'
export default {
    components: {
        comAside,
        comHeader,
        comTag
    },
    name: 'MAIN'
}
</script>

<style lang="less" scoped>
        .el-header{
            padding: 0;
        }
        .el-menu{
            border: 0;
        }
</style>
