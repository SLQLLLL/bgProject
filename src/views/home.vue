<template>
  <div>
      <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    //组件一加载就调用echarts数据图表
    //初始化
    let myChart = this.$Echarts.init(document.getElementById("container"));

    //初始化配置项
    let options = {
      xAxis: {
        //横轴
        //"Error: Component xAxis.分类 not exists. Load it first."
        //category
        type: "category",
        data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "放假"]
      },
      yAxis: {
        //纵轴
        type: "value"
      },
      series: [
        {
          //数据列
          data: [32, 66, 78, 123, 288, 18, 5],
          type: "line"
        }
      ]
    };
    //给图表设置配置项
    myChart.setOption(options);
  }
};
</script>

<style lang="" scoped>
#container {
  width: 1600px;
  height: 800px;
}
</style>
