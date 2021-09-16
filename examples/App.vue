<template>
  <div class="vue3_step">
    <Vue3Step
      :step="state.step"
      :stepOption="state.stepOption"
      @handleCheck="handleCheck"
      @handleDetails="handleDetails"
      @handleStep="handleStep"
      >
    </Vue3Step>
  </div>
</template>

<script>
import { reactive, defineComponent } from 'vue'
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
      state.step = '1-2'
      state.stepOption[0][0].status = 1
    }
    const handleDetails = (item) => {
      console.log(item)
    }
    const handleStep = (index) => {
      state.step = `${index+1}-1`
      console.log(index)
    }
    return {
      state,
      handleCheck,
      handleDetails,
      handleStep
    }
  }
});
</script>

<style lang="scss" scoped>
  .vue3_step {
    padding: 30px
  }
</style>
