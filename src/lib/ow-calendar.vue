<template>
  <div class="ow-calendar-wrapper">
    <header class="header">
      <div class="tit">选择时间</div>
      <div class="days-list">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
      </div>
    </header>
    <section class="content">
      <div class="calendar" v-for="(month,index) in allMonthData" :key="index">
        <div class="calendar-tit">
          <span>{{month.month}}月</span> {{month.year}}</div>
        <ul>
          <li :class="{disable: day.isDisable,select: day.isCheckInDate||day.isCheckOutDate,selectB:selectCss(day.date)}" @click="selectDate(month, day)" v-for="(day,index) in month.date" :key="index">
            <span>{{day.showDate}}</span>
          </li>
        </ul>
      </div>
    </section>
    <footer class="footer">
      <span class="info">共3天2晚</span>
      <span class="btn" @click="confirm">保存</span>
    </footer>
  </div>
</template>

<script>
import util from './data.js';
export default {
  name: 'ow-calendar',
  data() {
    return {
      allMonthData: [],
      checkInDate: {
        date: null,
        month: null,
      },
      checkOutDate: {
        date: null,
        month: null,
      },
    };
  },
  props: {
    value: {
      type: [String, Array],
      default: '0',
    },
    showMonthNumbers: {
      type: [Number, String],
      default: 12,
    },
    startDate: {
      type: [String],
      default: util.format(new Date(), 'yyyy-MM-dd'),
    },
    disabledDate: {
      type: Array,
      default: () => ['2018-06-20'],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.getAllMonthData(this.showMonthNumbers);
  },
  computed: {
    resultDate() {
      // 单选模式
      if (this.checkInDate.date.isCheckInDate && !this.multiple) return [this.checkInDate.date];

      if (this.checkInDate.date.isCheckInDate && this.checkOutDate.date.isCheckOutDate && this.multiple)
        return [this.checkInDate.date.date, this.checkOutDate.date.date];
      return [];
    },
  },
  methods: {
    getMonthData(year, month) {
      let ret = [];
      if (!year || !month) {
        let today = new Date(this.startDate.replace(/-/g, '/'));
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }
      let firstDay = new Date(year, month - 1, 1);
      let firstWeekDay = firstDay.getDay();
      let firstDayWeekDay = firstDay.getDay();
      let preMonthDayCount = firstDayWeekDay - 1;
      let lastDay = new Date(year, month, 0);
      let lastDate = lastDay.getDate();
      for (let i = 0; i < 38; i++) {
        let date = i - preMonthDayCount;
        let showDate = date;
        if (date <= 0) {
          showDate = '';
        } else if (date > lastDate) {
          continue;
        }
        let isWeekend = false;
        if ((showDate + firstWeekDay) % 7 === 0 || (showDate + firstWeekDay) % 7 === 1) {
          isWeekend = true;
        }
        let isRestDay = false;
        ret.push({
          showDate: showDate,
          isWeekend: isWeekend,
          isCheckInDate: false,
          isCheckOutDate: false,
          isRestDay: isRestDay,
          date: `${year}-${month < 10 ? '0' + month : month}-${showDate < 10 ? '0' + showDate : showDate}`,
        });
      }
      return ret;
    },
    getAllMonthData(num) {
      let todayData = new Date(this.startDate.replace(/-/g, '/'));
      let thisYear = todayData.getFullYear();
      let thisMonth = todayData.getMonth() + 1;
      let temp = [];
      for (let i = 0; i < num; i++) {
        if (thisMonth > 12) {
          thisYear += 1;
          thisMonth = 1;
        }
        temp[i] = {
          year: thisYear,
          month: thisMonth,
          date: this.getMonthData(thisYear, thisMonth),
        };
        thisMonth += 1;
      }
      // 第一个月今天之前的日期不可点击
      for (let i of temp[0].date) {
        let today = new Date();
        if (i.showDate >= today.getDate()) {
          break;
        }
        i.isDisable = true;
      }
      this.allMonthData = temp;
    },
    setCheckInDate(month, day) {
      this.checkInDate = {
        date: day,
        month: month,
      };
    },
    setCheckOutDate(month, day) {
      this.checkOutDate = {
        date: day,
        month: month,
      };
    },
    selectDate(month, day) {
      if (day.isDisable) {
        return;
      }

      if (this.checkInDate.date == null) {
        day.isCheckInDate = true;
        this.setCheckInDate(month, day);
        return;
      }

      // 单选模式
      if (!this.multiple) {
        this.checkInDate.date.isCheckInDate = false;
        day.isCheckInDate = true;
        this.setCheckInDate(month, day);
        return;
      }
      if (this.checkOutDate.date == null) {
        let dayDate = new Date(day.date);
        let checkOutDate = new Date(this.checkInDate.date.date);
        if (dayDate > checkOutDate) {
          day.isCheckOutDate = true;
          day.isCheckInDate = false;
          this.setCheckOutDate(month, day);
        } else {
          this.checkInDate.date.isCheckInDate = false;
          day.isCheckInDate = true;
          this.setCheckInDate(month, day);
        }
        return;
      }
      if (this.checkInDate.date.isCheckInDate && this.checkOutDate.date.isCheckOutDate) {
        this.checkInDate.date.isCheckInDate = false;
        this.checkOutDate.date.isCheckOutDate = false;
        day.isCheckInDate = true;
        this.setCheckInDate(month, day);
        return;
      } else if (this.checkInDate.date.isCheckInDate && !this.checkOutDate.date.isCheckOutDate) {
        // 判断点击是改变入住日期还是离店日期，年，年相等判断月，月相等判断日
        let dayDate = new Date(day.date);
        let checkOutDate = new Date(this.checkInDate.date.date);
        if (dayDate > checkOutDate) {
          day.isCheckOutDate = true;
          day.isCheckInDate = false;
          this.setCheckOutDate(month, day);
          return;
        } else {
          this.checkInDate.date.isCheckInDate = false;
          day.isCheckInDate = true;
          this.setCheckInDate(month, day);
          return;
        }
      }
    },
    selectCss(date) {
      if (!this.multiple) return false;
      let now = new Date(date.replace(/-/g, '/'));
      if (!now) return false;
      // alert(now);
      if (
        this.checkInDate.date == null ||
        this.checkOutDate.date == null ||
        !this.checkInDate.date.isCheckInDate ||
        !this.checkOutDate.date.isCheckOutDate
      )
        return false;
      let left = new Date(this.checkInDate.date.date.replace(/-/g, '/'));
      let right = new Date(this.checkOutDate.date.date.replace(/-/g, '/'));
      return left <= now && now <= right;
    },
    confirm() {
      console.log(this.resultDate);
      this.$emit('confirm', this.resultDate);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('../css/rest.css');
.ow-calendar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // padding: 40px 40px 0;
  // overflow: auto;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  -webkit-user-select: none; /*webkit浏览器*/
  user-select: none;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent; /* For some Androids */
}
.tit {
  height: 36px;
  font-size: 36px;
  line-height: 36px;
  color: #0a0a0a;
  font-weight: 500;
  margin-bottom: 67px;
  width: 100%;
}
.days-list {
  border-radius: 10px 10px 0px 0px;
  background: #f5f5f5;
  font-size: 28px;
  display: flex;
  height: 80px;
  line-height: 80px;
  margin-bottom: 10px;
  width: 100%;
  span {
    flex: 1;
    text-align: center;
    display: block;
  }
}
.calendar-tit {
  padding: 25px 0 14px 26px;
  line-height: 40px;
  color: #b8b8b8;

  span {
    font-size: 36px;
    color: #2885a6;
  }
}
.calendar {
  margin-bottom: 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    display: block;
    text-align: center;
    color: #5a4b41;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    margin-bottom: 18px;
    width: 14.2%;
    span {
      width: 80px;
      display: inline-block;
      margin: 0 auto;
    }
  }
  .disable {
    color: #c5c5c5;
  }
  .select {
    span {
      background: #209cdf;
      border-radius: 80px;
      color: #fff;
    }
  }
  .selectB {
    span {
      background: #209cdf;
      border-radius: 80px;
      color: #fff;
    }
  }
}
.header {
  // position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 40px 40px 10px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
}
.content {
  padding: 0px 40px;

  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.footer {
  display: flex;
  height: 140px;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 0 40px;

  .info {
    font-size: 28px;
    line-height: 140px;
    color: #0a0a0a;
  }
  .btn {
    border-radius: 6px;
    background: #209cdf;
    height: 76px;
    width: 170px;
    text-align: center;
    line-height: 76px;
    font-size: 28px;
    color: #fff;
    margin-top: 36px;
  }
}
</style>
