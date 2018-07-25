<template>
  <transition :name="transition">
    <div class="ow-calendar-wrapper" v-show="show" @touchmove.prevent.stop>
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
            <li :class="{disable: day.isDisable,'can-select':!day.isDisable,select: day.isCheckInDate||day.isCheckOutDate,'select-b':selectCss(day.date)}" @click="selectDate(month, day)" v-for="(day,innerIndex) in month.date" :key="innerIndex">
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
  name: 'owCalendar',
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
      util,
    };
  },
  props: {
    showMonthNumbers: {
      type: [Number, String],
      default: 12,
    },
    startDate: {
      type: [String],
      default: util.format(new Date(), 'yyyy/MM/dd'),
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
    formatType: {
      type: String,
      default: 'yyyy/MM/dd',
    },
  },
  created() {
    this.getAllMonthData(this.showMonthNumbers);
  },
  computed: {
    resultDate() {
      // 单选模式
      if (this.checkInDate.day && this.checkInDate.day.isCheckInDate && !this.multiple) {
        return [this.formatFn(this.checkInDate.day.date)];
      }
      if (this.multiple) {
        const startDate =
          this.checkInDate.day && this.checkInDate.day.isCheckInDate ? this.checkInDate.day.date : undefined;
        const endDate =
          this.checkOutDate.day && this.checkOutDate.day.isCheckOutDate ? this.checkOutDate.day.date : undefined;
        return [this.formatFn(startDate), this.formatFn(endDate), this.choiceDaysCount];
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
          return `已选择  ${this.formatFn(this.checkInDate.day.date)}`;
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
    formatFn(date) {
      return util.format(new Date(date), this.formatType);
    },
    getMonthData(year, month) {
      const ret = [];
      const firstDay = new Date(year, month - 1, 1);
      const firstWeekDay = firstDay.getDay();
      const firstDayWeekDay = firstDay.getDay();
      const preMonthDayCount = firstDayWeekDay - 1;
      const lastDay = new Date(year, month, 0);
      const lastDate = lastDay.getDate();
      for (let i = 0; i < 38; i++) {
        const date = i - preMonthDayCount;
        let showDate = date;
        const thatDate = `${year}/${month < 10 ? '0' + month : month}/${showDate < 10 ? '0' + showDate : showDate}`;
        const isDisable = this.disabledDate.findIndex(v => this.formatFn(v) === this.formatFn(thatDate)) !== -1;
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
      this.checkInDate.day.isCheckInDate = false;
      this.checkOutDate.day.isCheckOutDate = false;
      day.isCheckInDate = true;
      this.setCheckInDate(month, day);
      return;
    },
    selectCss(date) {
      if (!this.multiple) return false;
      const now = new Date(date.replace(/-/g, '/'));
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
@import '../css/app';
</style>
