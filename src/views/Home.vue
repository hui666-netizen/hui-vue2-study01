<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-left: 10px;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="user">
              <img src="../assets/images/user.png" alt="">
              <div class="userLogin">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>

            </div>
            <div class="loginInfo">
              <p>上次登录时间：<span>2024/03/28</span></p>
              <p>上次登陆地点：<span>武汉</span></p>
            </div>
          </el-card>
          <el-card style="margin-top: 20px; height: 480px;">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column v-for="(val, key) in TableData" :prop="key" :label="val" :key="val">
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" style="padding-left: 10px;">
        <div class="grid-content bg-purple-light">
          <div class="nums">
            <el-card v-for="item in countData" :key="item.name" body-style="{ display: flex, padding:0}">
              <div class="num">
                <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                <div class="content">
                  <p class="top">${{ item.value }}</p>
                  <p class="bot">{{ item.name }}</p>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <el-card style="height: 280px;">
          <div ref="echarts1" style="height: 280px;">

          </div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px;">
            <div ref="echarts2" style="height: 260px;"></div>
          </el-card>
          <el-card style="height: 260px;">
            <div ref="echarts3" style="height: 240px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getData } from '../api'
import *as echarts from 'echarts'
export default {
  name: 'HOME',
  data() {
    return {
      tableData: [
        
      ],
      TableData: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总共购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  mounted() {
    getData().then(({data}) => {
      const {tableData,userData,videoData} =data.data
       this.tableData = tableData
      const echarts1 = echarts.init(this.$refs.echarts1)
      var echarts1option = {}
      
      const { orderData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData={data:xAxis}
      echarts1option.xAxis = xAxisData
      echarts1option.yAxis = {}
      echarts1option.legend = xAxisData
      echarts1option.series = []
      xAxis.forEach(key=>{
        echarts1option.series.push({
          name:key,
          data:orderData.data.map(item =>item[key]),
          type:'line'
        })
      })
      echarts1.setOption(echarts1option)   
      const echarts2 = echarts.init(this.$refs.echarts2)   
      const echarts2Option={
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:'新增用户',
              data: userData.map(item => item.new),
              type:'bar'
            },
            {
              name: '活跃用户',
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ],

      }
      echarts2.setOption(echarts2Option)
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option={
        tooltip: {
          trigger: "item",
          },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
          series: [
            {
              data:videoData,
              type:'pie'
            }
          ],
      }
      echarts3.setOption(echarts3Option) 
    })
    
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userLogin {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.loginInfo {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
  }

  span {
    color: #666666;
    margin-left: 60px;
  }

}

.num {
  display: flex;

  .content {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: white;
    font-size: 30px;
  }

  .top {
    font-size: 30px;
    line-height: 30px;
    height: 30px;
  }

  .bot {
    margin-top: 5px;
    font-size: 14px;
    color: #999;
    text-align: center;
    ;
  }
}

.nums {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
}

</style>