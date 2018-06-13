<template>
  <div id="app">
    <div @click="calendarShow=true">按钮按钮</div>
    <ow-calendar v-model="calendarShow" @confirm="fn" :multiple="true"></ow-calendar>
  </div>
</template>

<script>
// 基本逻辑已经搭好,还剩下不可选日子的逻辑

/**
 * API设计:
 * props
 * showMonthNumbers:要展示多少个月份,默认12
 * startDate:开始的日期,默认今天,格式 '2018-06-02',
 * disabledDate:不可选的日期 数组:['2018-06-20']
 * multiple: 开启多选模式,默认为单选模式
 * transition:过渡效果 默认pop-fade
 * Event:
 * @confirm:点击保存,回调方法
 * params:(starDate,EndDate) 开始时间,结束时间
 */

export default {
  name: 'app',
  data() {
    return {
      calendarShow: false,
    };
  },
  methods: {
    fn(starDate, EndDate) {
      console.log(starDate, EndDate);
    },
  },
};
</script>

<style lang="scss">
</style>
