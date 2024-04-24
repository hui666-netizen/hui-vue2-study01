<template>
    <div class="tabs">
        <el-tag v-for="(item,index) in tags" 
        :key="item.label" 
        :type="item.type" 
        :effect="$route.name===item.name?'dark':'plain'" 
        :closable="item.name!=='home'"
        @click="changeMenu(item)"
        @close="handleClose(item,index)"
        size="small"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name:'comTag',
    data(){
        return{}
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tabList
        })
    },
    methods:{
        ...mapMutations(['closeTag']),
        changeMenu(item){
            this.$router.push({ name: item.name })
        },
        handleClose(item,index){
            console.log(index);
            this.closeTag(item)
            const length = this.tags.length
            if(item.name!==this.$route.name)
            {
                return
            }
            if(index===length)
            {
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag {
                cursor: pointer;
                margin-right: 15px;
            }
    }
</style>