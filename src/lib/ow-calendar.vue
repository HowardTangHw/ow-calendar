<template>
  <transition :name="transition">
    <div class="ow-calendar-wrapper" v-show="show">
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
        <i class="close" @click="show=false" />
      </header>
      <section class="content">
        <div class="calendar" v-for="(month,index) in allMonthData" :key="index">
          <div class="calendar-tit">
            <span>{{ month.month }}月</span> {{ month.year }}
          </div>
          <ul>
            <li :class="{disable: day.isDisable,select: day.isCheckInDate||day.isCheckOutDate,selectB:selectCss(day.date)}" @click="selectDate(month, day)" v-for="(day,index) in month.date" :key="index">
              <span>{{ day.showDate }}</span>
            </li>
          </ul>
        </div>
      </section>
      <footer class="footer">
        <span class="info">{{ choiceInfo }}</span>
        <span :class="['btn',choiceFlag==true?'':'btn-cancel']" @click="confirm">保存</span>
        <span @click="show=false" class="cancel">取消</span>
      </footer>
    </div>

  </transition>
</template>

<script>
import util from './date.js';
import mixins from './mixins.js';
export default {
  name: 'ow-calendar',
  mixins: [mixins],
  data() {
    return {
      allMonthData: [],
      checkInDate: {
        day: null,
        month: null,
      },
      checkOutDate: {
        day: null,
        month: null,
      },
    };
  },
  props: {
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
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'pop-fade',
    },
    needChoiceDays: {
      type: [Number, String],
      default: 0,
    },
    infoText: {
      type: String,
      default: '',
    },
  },
  created() {
    this.getAllMonthData(this.showMonthNumbers);
  },
  computed: {
    resultDate() {
      // 单选模式
      if (this.checkInDate.day && this.checkInDate.day.isCheckInDate && !this.multiple) {
        return [this.checkInDate.day.date];
      }
      if (this.multiple) {
        const startDate =
          this.checkInDate.day && this.checkInDate.day.isCheckInDate ? this.checkInDate.day.date : undefined;
        const endDate =
          this.checkOutDate.day && this.checkOutDate.day.isCheckOutDate ? this.checkOutDate.day.date : undefined;
        return [startDate, endDate, this.choiceDaysCount];
      }
      return [];
    },
    choiceDaysCount() {
      const left = this.leftDate;
      const right = this.rightDate;
      const iDays = parseInt(Math.abs(left - right) / 1000 / 60 / 60 / 24) + 1;
      return iDays;
    },
    choiceFlag() {
      if (!this.checkInDate.day) return 0;
      if (!this.multiple) return 1;
      if (!this.checkOutDate.day || !this.checkOutDate.day.isCheckOutDate) return 2;

      if (this.choiceDaysCount < this.needChoiceDays) return 3;
      return true;
    },
    choiceInfo() {
      switch (this.choiceFlag) {
        case 0:
          return '未选择';
        case 1:
          return `已选择  ${this.checkInDate.day.date}`;
        case 2:
          return '请选择结束日期';
        case 3:
          let str = `请至少选择${this.needChoiceDays}天${this.needChoiceDays - 1}晚`;
          this.$emit('multiple-choice-end', ...this.resultDate);
          if (this.needChoiceDays > 0 && this.infoText.length > 0) str = this.infoText;
          return str;
        default:
          this.$emit('multiple-choice-end', ...this.resultDate);
          return this.needChoiceDays > 0 && this.infoText.length > 0 ? this.infoText : '';
      }
    },
    leftDate() {
      return new Date(this.checkInDate.day.date.replace(/-/g, '/'));
    },
    rightDate() {
      return new Date(this.checkOutDate.day.date.replace(/-/g, '/'));
    },
  },
  methods: {
    getMonthData(year, month) {
      const ret = [];
      if (!year || !month) {
        const today = new Date(this.startDate.replace(/-/g, '/'));
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }
      const firstDay = new Date(year, month - 1, 1);
      const firstWeekDay = firstDay.getDay();
      const firstDayWeekDay = firstDay.getDay();
      const preMonthDayCount = firstDayWeekDay - 1;
      const lastDay = new Date(year, month, 0);
      const lastDate = lastDay.getDate();
      for (let i = 0; i < 38; i++) {
        const date = i - preMonthDayCount;
        let showDate = date;
        const thatDate = `${year}-${month < 10 ? '0' + month : month}-${showDate < 10 ? '0' + showDate : showDate}`;
        const isDisable = this.disabledDate.findIndex(v => v === thatDate) !== -1;
        if (date <= 0) {
          showDate = '';
        } else if (date > lastDate) {
          continue;
        }
        const isWeekend = (showDate + firstWeekDay) % 7 === 0 || (showDate + firstWeekDay) % 7 === 1;
        ret.push({
          showDate: showDate,
          isWeekend: isWeekend,
          isCheckInDate: false,
          isCheckOutDate: false,
          isDisable,
          date: thatDate,
        });
      }
      return ret;
    },
    getAllMonthData(num) {
      const todayData = new Date(this.startDate.replace(/-/g, '/'));
      let thisYear = todayData.getFullYear();
      let thisMonth = todayData.getMonth() + 1;
      const temp = [];
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
      for (const i of temp[0].date) {
        const today = new Date(this.startDate.replace(/-/g, '/'));
        if (i.showDate >= today.getDate()) {
          break;
        }
        i.isDisable = true;
      }
      this.allMonthData = temp;
    },
    setCheckInDate(month, day) {
      this.checkInDate = {
        day: day,
        month: month,
      };
    },
    setCheckOutDate(month, day) {
      this.checkOutDate = {
        day: day,
        month: month,
      };
    },
    decideSetCheckOutDate(month, day) {
      const dayDate = new Date(day.date.replace(/-/g, '/'));
      const checkInDate = this.leftDate;
      if (dayDate > checkInDate && this.disabledFlag(day.date)) {
        day.isCheckOutDate = true;
        day.isCheckInDate = false;
        this.setCheckOutDate(month, day);
      } else {
        this.checkInDate.day.isCheckInDate = false;
        day.isCheckInDate = true;
        this.setCheckInDate(month, day);
      }
    },

    selectDate(month, day) {
      if (day.isDisable) {
        return;
      }
      // 没有checkInDate 和 单选的情况下
      if (this.checkInDate.day == null || !this.multiple) {
        // 处理单选模式
        if (this.checkInDate.day) this.checkInDate.day.isCheckInDate = false;
        day.isCheckInDate = true;
        this.setCheckInDate(month, day);
        return;
      }
      // 选了checkIn  没有checkOut
      if (this.checkOutDate.day == null || !this.checkOutDate.day.isCheckOutDate) {
        this.decideSetCheckOutDate(month, day);
        return;
      }
      // 都选了情况下再选,
      if (this.checkInDate.day.isCheckInDate && this.checkOutDate.day.isCheckOutDate) {
        this.checkInDate.day.isCheckInDate = false;
        this.checkOutDate.day.isCheckOutDate = false;
        day.isCheckInDate = true;
        this.setCheckInDate(month, day);
        return;
      }
    },
    selectCss(date) {
      if (!this.multiple) return false;
      const now = new Date(date.replace(/-/g, '/'));
      if (!now) return false;
      if (
        this.checkInDate.day == null ||
        this.checkOutDate.day == null ||
        !this.checkInDate.day.isCheckInDate ||
        !this.checkOutDate.day.isCheckOutDate
      ) {
        return false;
      }
      const left = this.leftDate;
      const right = this.rightDate;
      return left <= now && now <= right;
    },
    confirm() {
      if (this.choiceFlag === true || this.choiceFlag === 1) {
        this.show = false;
        this.$emit('confirm', ...this.resultDate);
      }
      return false;
    },
    disabledFlag(checkOutDate) {
      const left = this.leftDate;
      const right = new Date(checkOutDate.replace(/-/g, '/'));
      const disableItemIndex = this.disabledDate.findIndex(v => {
        const vDate = new Date(v.replace(/-/g, '/'));
        return left < vDate && vDate < right;
      });
      if (disableItemIndex === -1) return true;
      return false;
    },
  },
  watch: {
    show(val) {
      if (val === false) {
        this.$emit('close', val);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('../css/rest.css');
@import '../css/iconfont.scss';
.ow-calendar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  -webkit-user-select: none; /*webkit浏览器*/
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent; /* For some Androids */
  z-index: 1010;
  background: #fff;
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
  position: relative;
  .close {
    @extend .iconfont;
    @extend .icon-guanbi;
    position: absolute;
    right: 40px;
    top: 40px;
    font-size: 32px;
  }
}
.content {
  padding: 0px 40px;
  background: #fff;
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.footer {
  // display: flex;
  height: 140px;
  // justify-content: space-between;
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
    float: right;
  }
  .btn-cancel {
    background: #e5e5e5;
  }
  .cancel {
    font-size: 28px;
    color: #209cdf;
    margin-right: 56px;
    float: right;
    line-height: 140px;
  }
}
.pop-fade-enter-active,
.pop-fade-leave-active {
  transition: opacity 0.3s;
}

.pop-fade-enter,
.pop-fade-leave-to {
  opacity: 0;
}
</style>
