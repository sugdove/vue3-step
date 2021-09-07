# vue3-step

![CocoaPods](https://img.shields.io/npm/dt/vue3-step.svg)
![CocoaPods](https://img.shields.io/npm/v/vue3-step.svg)


这是一个二维步骤条, 每个大步骤下面有复数个小步骤
<!-- [demo](https://githubs.club/demo/) -->

## 项目地址
- github : https://github.com/sugdove/vue3-step
- github项目启动: 1.yarn install 2.yarn serve

## 依赖
- Vue 3.0.0+

## 安装方式
```
npm install vue3-step
```

## 引入方式
```javascript
//前置配置
import { createApp } from 'vue'
import App from './App.vue'
//全局引入
import Vue3Step from 'vue3-step' 
import 'vue3-step/lib/Vue3Step.css' // 引入样式
const app = createApp(App)
app.use(Vue3Step).mount('#app') //使用方式：<Vue3Step></Vue3Step>


//局部引入
import { MyStep } from 'vue3-step'
import 'vue3-step/lib/Vue3Step.css' // 引入样式
export default {
    template: '<MyStep/>',
    components: { MyStep }
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
  >

  </Vue3Step>
</template>

<script>
import { reactive,defineComponent } from 'vue'
export default defineComponent ({
  setup(){
    const state = reactive({
      step: '1-1',
      stepOption: [
        [{label: '连通性检查', status: 0 }, {label: '必填字段检查', status: 0 }],
        [{label: '必填内容检查', status: 0}, {label: '数据格式检查', status: 0} , {label: '匹配率检查', status: 0}]
      ]
    })
    const handleCheck = () => {
      alert('点击check')
    }
    const handleDetails = (item) => {
      console.log(item)
    }
    
    return {
      state,
      handleCheck,
      handleDetails
    }
  }
});
</script>

```

在示例中我使用了es6(es2015)语法,你可能需要引入babel-polyfill才能正常运行,或者你也可以用es5的写法

## 参数

- step

    - 参数String `${n}=${m}` 
    
    当前在第n大步里的第m小步

- stepOption
    - 参数Array 二维数组
      标识步骤条的整体信息,其中label为步骤文案,status为步骤状态, 0-未检查 1-检查通过 2-建议完善 3-未通过

## 事件

- handleCheck()
    
    - 参数：无

    点击启动检查时的钩子函数
    
- handleDetails( item, index, index2 )

    - 参数Object：
    
    点击某一详情的钩子函数 item为改step对象, index为stepOptions下标, index2为stepOptions二维下标
    
## 联系方式

邮箱 : 849809724@qq.com

有任何问题请发Issues或者邮箱联系我-.-  谢谢!