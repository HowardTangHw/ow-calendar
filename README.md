# ow-calendar

[![Build Status](https://travis-ci.org/HowardTangHw/ow-calendar.svg?branch=master)](https://travis-ci.org/HowardTangHw/ow-calendar)
[![npm version](https://img.shields.io/npm/v/ow-calendar.svg?style=flat)](https://www.npmjs.com/package/ow-calendar)



##  安装

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
         owCalendar
    }
}
```



## Api

### props

| 属性               | 说明                              | 类型           | 默认值   |
| :----------------- | --------------------------------- | -------------- | -------- |
| show-month-numbers | 要展示多少个月份                  | Number, String | 12       |
| start-date         | 开始的日期                        | Date           | 今天     |
| disabled-date      | 不可选的日期                      | Array          | 无       |
| multiple           | 开启多选模式                      | Boolean        | false    |
| transition         | 过渡效果                          | String         | pop-fade |
| need-choice-days   | 至少选择的天数,与multiple配合使用 | Number,String  | 0        |

### Event:

| 事件名  | 说明           | 返回值                                                       |
| ------- | -------------- | ------------------------------------------------------------ |
| confirm | 点击保存时触发 | 单选模式下:只有一个Date;<br />多选模式下: 开始时间,结束时间,选择的天数 |



## [DEMO演示](http://118.24.147.117/ow-calendar/)

## 本地预览

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```


