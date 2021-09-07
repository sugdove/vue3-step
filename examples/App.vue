<template>
  <div class="vue3_step">
    <Vue3Step
    :step="state.step"
    :stepOption="state.stepOption"
    @handleCheck="handleCheck"
    @handleDetails="handleDetails"
    >

    </Vue3Step>
  </div>
</template>

<script>
import { reactive,defineComponent } from 'vue'
export default defineComponent ({
  name: "App",
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

<style lang="scss" scoped>
  .vue3_step {
    padding: 30px
  }
</style>
