ow-calendar

[![Build Status](https://travis-ci.org/HowardTangHw/ow-calendar.svg?branch=master)](https://travis-ci.org/HowardTangHw/ow-calendar)
[![npm version](https://img.shields.io/npm/v/ow-calendar.svg?style=flat)](https://www.npmjs.com/package/ow-calendar)
[![Coverage Status](https://img.shields.io/codecov/c/github/HowardTangHw/ow-calendar/master.svg)](https://codecov.io/gh/HowardTangHw/ow-calendar/branch/master)

## 安装

**NPM**

```bash
npm i ow-calendar -S
```

**YARN**

```bash
yarn add ow-calendear
```

## 使用方法

### 全局引用

```javascript
import Vue from 'vue';
import owCalendar from 'ow-calendar';

Vue.use(owCalendar);
```

### 组件内引用

在组件内

```javascript
import owCalendar from 'ow-calendar/src/lib/ow-calendar';
```

```javascript
export default {
  components: {
    owCalendar,
  },
};
```

## Api

### props

| 属性               | 说明                                  | 类型           | 默认值                                                                                                                                                                  |
| :----------------- | ------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show-month-numbers | 要展示多少个月份                      | Number, String | 12                                                                                                                                                                      |
| start-date         | 开始的日期                            | Date           | 今天                                                                                                                                                                    |
| disabled-date      | 不可选的日期                          | Array          | 无                                                                                                                                                                      |
| multiple           | 开启多选模式                          | Boolean        | false                                                                                                                                                                   |
| transition         | 过渡效果                              | String         | pop-fade                                                                                                                                                                |
| need-choice-days   | 至少选择的天数,与 multiple 配合使用   | Number,String  | 0                                                                                                                                                                       |
| info-text          | 提示文案,与 need-choice-days 配合使用 | String         | 当选择的日期小于 need-choice-days 所设置时:<br />文案显示:请至少选择 needChoiceDays 天 needChoiceDays - 1 晚<br />当选择的日期大于等于 need-choice-days 所设置时:无文案 |
| format-type        | 显示的日期格式                        |                | `yyyy/MM/dd` ps:月份需要大写                                                                                                                                            |

### Event:

| 事件名              | 说明                                         | 返回值                                                                  |
| ------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| confirm             | 点击保存时触发                               | 单选模式下:只有一个 Date;<br />多选模式下: 开始时间,结束时间,选择的天数 |
| multiple-choice-end | 选完第二个日期时触发(可在此处修改 info-text) | 同上                                                                    |
| close               | 弹窗关闭时触发                               | 无                                                                      |

## [DEMO 演示](http://118.24.147.117/ow-calendar/)

## 本地预览

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
