import { mount, shallow, shallowMount } from '@vue/test-utils';
import owCalendar from '../src/lib/ow-calendar.vue';
import util from '../src/lib/date.js';

describe('owCalendar radio', () => {
  let wrapper, vm;
  beforeEach(() => {
    const multiple = false,
      startDate = util.format(new Date(), 'yyyy/MM/dd'),
      value = true,
      showMonthNumbers = 2;
    wrapper = shallowMount(owCalendar, {
      propsData: { startDate, multiple, value, showMonthNumbers },
    });
    vm = wrapper.vm;
  });
  it('mixins test', () => {
    wrapper.setProps({ value: false });
  });
  it('computed resultDate test', () => {
    // 单选模式
    vm.checkInDate.day = {
      isCheckInDate: true,
      date: util.format(new Date(), 'yyyy/MM/dd'),
    };
    expect(wrapper.vm.resultDate).toEqual([util.format(new Date(), 'yyyy/MM/dd')]);

    // 空模式
    vm.checkInDate.day = {};
    vm.checkOutDate.day = {};
    expect(wrapper.vm.resultDate).toEqual([]);
    wrapper.find('.can-select').trigger('click');

    // 多选模式
    let now = new Date();
    let end = new Date().setHours(24);
    let startDay = util.format(now, 'yyyy/MM/dd');
    let endDay = util.format(new Date(end), 'yyyy/MM/dd');
    let resultArr = [startDay, endDay, 2];
    wrapper.setProps({ multiple: true });
    vm.checkInDate.day = {
      isCheckInDate: true,
      date: startDay,
    };
    vm.checkOutDate.day = {
      isCheckOutDate: true,
      date: endDay,
    };
    expect(wrapper.vm.resultDate).toEqual(resultArr);
  });

  it('confirm btn click', () => {
    wrapper.find('.btn').trigger('click');
    wrapper.setProps({ multiple: false });
    vm.checkInDate.day = {
      isCheckInDate: true,
      date: util.format(new Date(), 'yyyy/MM/dd'),
    };
    wrapper.find('.btn').trigger('click');
  });
  // it('matches snapshot', () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });
});

describe('owCalendar multiple', () => {
  let wrapper, vm;
  beforeEach(() => {
    const multiple = true,
      startDate = util.format(new Date(), 'yyyy/MM/dd'),
      disabledDate = [util.format(new Date(new Date().setHours(72)), 'yyyy/MM/dd')],
      value = true,
      showMonthNumbers = 2,
      needChoiceDays = 3;
    wrapper = shallowMount(owCalendar, {
      propsData: { startDate, multiple, value, showMonthNumbers, disabledDate, needChoiceDays },
    });
    vm = wrapper.vm;
  });

  it('disabledDate', () => {
    wrapper.find('.disable').trigger('click');
  });

  it('selectDate', () => {
    let now = new Date();
    let end = new Date().setHours(24);
    let startDay = util.format(now, 'yyyy/MM/dd');
    let disableDay = util.format(new Date(new Date().setHours(100)), 'yyyy/MM/dd');
    let endDay = util.format(new Date(end), 'yyyy/MM/dd');
    vm.checkInDate.day = {
      isCheckInDate: true,
      date: startDay,
    };
    vm.checkOutDate.day = {
      isCheckOutDate: true,
      date: endDay,
    };
    expect(vm.choiceInfo).toBe('请至少选择3天2晚');

    wrapper.findAll('.can-select').trigger('click');

    vm.checkInDate.day = {
      isCheckInDate: true,
      date: startDay,
    };
    vm.checkOutDate.day = {};

    wrapper.find('.can-select').trigger('click');

    vm.checkInDate.day = {
      isCheckInDate: true,
      date: endDay,
    };
    vm.checkOutDate.day = {
      isCheckOutDate: true,
      date: startDay,
    };
    wrapper.find('.can-select').trigger('click');
  });
});

describe('getAllowMonth', () => {
  let wrapper, vm;
  beforeEach(() => {
    const multiple = true,
      startDate = '2018/12/01',
      value = true,
      showMonthNumbers = 2;
    wrapper = shallowMount(owCalendar, {
      propsData: { startDate, multiple, value, showMonthNumbers },
    });
    vm = wrapper.vm;
  });

  it('cick', () => {
    wrapper.find('.can-select').trigger('click');
    // wrapper.setProps({ value: false });
    // wrapper.setProps({ value: true });
  });
});
