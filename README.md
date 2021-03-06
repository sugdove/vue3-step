# vue3-step

![CocoaPods](https://img.shields.io/npm/dt/vue3-step.svg)
![CocoaPods](https://img.shields.io/npm/v/vue3-step.svg)

这是一个二维步骤条, 每个大步骤下面有复数个小步骤
[demo](http://www.githubs.cloud/vue3-step/)

## 项目地址

- github : https://github.com/sugdove/vue3-step

- github 项目启动: 1.yarn install 2.yarn serve

## 依赖

- Vue 3.0.0+

## 安装方式

```
npm install vue3-step
```

## 全局引入方式

```javascript
//前置配置
import { createApp } from 'vue'
import App from './App.vue'
//全局引入
import Vue3Step from 'vue3-step'
import 'vue3-step/lib/vue3Step.css' // 引入样式
const app = createApp(App)
app.use(Vue3Step).mount('#app') //使用方式：<Vue3Step></Vue3Step>
```

## 局部引入方式

```javascript
//局部引入
import { Vue3Step } from 'vue3-step'
import 'vue3-step/lib/vue3Step.css' // 引入样式
export default {
  template: '<Vue3Step/>',
  components: { Vue3Step },
}
```

## 示例

```vue
<template>
  <Vue3Step
    :step="state.step"
    :stepOption="state.stepOption"
    @handleCheck="handleCheck"
    @handleDetails="handleDetails"
    @handleStep="handleStep"
  >
  </Vue3Step>
</template>

<script>
import { reactive, defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      step: '1-1',
      // status：0 未检查, 1 通过, 2 待完善 3. 未通过
      stepOption: [
        [
          { label: 'step1-1', status: 0 },
          { label: 'step1-2', status: 0 },
        ],
        [
          { label: 'step2-1', status: 0 },
          { label: 'step2-2', status: 0 },
          { label: 'step2-3', status: 0 },
        ],
      ],
    })
    const handleCheck = () => {
      state.step = '1-2'
      state.stepOption[0][0].status = 1
    }
    const handleDetails = (item) => {
      console.log(item)
    }
    const handleStep = (index) => {
      state.step = `${index + 1}-1`
      console.log(index)
    }
    return {
      state,
      handleCheck,
      handleDetails,
      handleStep,
    }
  },
})
</script>
```

在示例中我使用了 es6(es2015)语法,你可能需要引入 babel-polyfill 才能正常运行,或者你也可以用 es5 的写法

## 参数

- step

  - 参数 String `${n}-${m}`

  当前在第 n 大步里的第 m 小步

- stepOption
  - 参数 Array 二维数组
    标识步骤条的整体信息,其中 label 为步骤文案,status 为步骤状态, 0-未检查 1-检查通过 2-建议完善 3-未通过

## 事件

- handleCheck()

  - 参数：无

  点击启动检查时的钩子函数

- handleDetails( item, index, index2 )

  - 参数 Object：

  点击某一详情的钩子函数 item 为改 step 对象, index 为 stepOptions 下标, index2 为 stepOptions 二维下标

- handleStep( index )

  - 参数 index：

  点击某一大步骤的钩子函数 index 为二维数组第一层下标

## 联系方式

欢迎大家关注我做的网站: http://www.githubs.cloud/

如果对您有帮助, 欢迎 star

有任何问题请发 Issues 或者邮箱联系我-.- 谢谢!
