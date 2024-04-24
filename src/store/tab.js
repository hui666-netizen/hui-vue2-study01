import Cookies from "js-cookie"
export default{
    state:{
        isCollapse:false,
        tabList:[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],
        menu:[]
    },
    mutations:{
        CollapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        SelectMenu(state,val){
              if(val.name!== 'home'){
                  const index = state.tabList.findIndex(item => item.name==val.name)
                  if(index===-1)
                  {
                    state.tabList.push(val)
                  }
              }
        },
        closeTag(state,item)
        {
            const index = state.tabList.findIndex(val=>val.name===item.name)
            state.tabList.splice(index,1)
        },
        setMenu(state,val){
            state.menu = val
            Cookies.set('menu',JSON.stringify(val))
        },
        addMenu(state,router){
            if(!Cookies.get('menu')) return
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children.map(item=>{
                        item.component = () =>import(`@/views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () =>import(`@/views/${item.url}`)
                    menuArray.push(item)
                }
            })
                menuArray.forEach(item =>{
                    router.addRoute('Main',item)
                })
        }
    }
}