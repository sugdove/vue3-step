
import Step_ from './Step';
const components = [
  Step_
  // ...如果还有的话继续添加
]
const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export const Vue3Step = Step_

export default {
  install
}
