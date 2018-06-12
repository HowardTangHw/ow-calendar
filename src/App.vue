<template>
  <div id="app">
    <ow-calendar :confirm="fn" :multiple="true"></ow-calendar>
  </div>
</template>

<script>
// 基本逻辑已经搭好,还剩下不可选日子的逻辑

/**
 * API设计:
 * showMonthNumbers:要展示多少个月份,默认12
 * startDate:开始的日期,默认今天,格式 '2018-06-02',
 * disabledDate:不可选的日期 数组:['2018-06-20']
 * confirm:点击保存,回调方法
 * @params:Array,Array[0]为开始日期,Array[1]为结束日期
 * multiple: 开启多选模式,默认为单选模式
 */

export default {
  name: 'app',
  data() {
    return {};
  },
  methods: {
    fn(data) {
      console.log('外部数组');
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
</style>
