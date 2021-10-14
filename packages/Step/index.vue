<!--
 * @Author: suge
 * @LastEditors: suge
 * @Description: 步骤条组件
 * @FilePath: \vue3-step\packages\Step\index.vue
-->

<template>
  <div class="step_content">
    <!-- 遍历stepOption步骤配置数据 -->
    <template v-for="(item, index) in stepOption" :key="index">
      <div
        class="step_box"
        :class="getActiveClass('step_now', item, index)"
        @click="handleStep(index)"
      >
        <div class="header">
          <div
            class="step_num"
            :class="getActiveClass('step_num', item, index)"
          >
            {{ `Step${index + 1}` }}
          </div>
          <div
            class="step_status"
            :class="getActiveClass('step_status', item, index)"
          >
            {{ getActiveClass("step_status_text", item) }}
          </div>
        </div>
        <div class="content">
          <div
            v-for="(item2, index2) in item"
            :key="index2"
            :class="getActiveClass('step_content', item2)"
          >
            {{ `${index + 1}.${index2 + 1}${item2.label}` }}
            <i
              class="iconfont"
              :class="getActiveClass('content_icon', item2)"
            ></i>
            <div
              class="details"
              v-if="item2.status !== 0"
              @click.stop="handleDetails(item2, index, index2)"
            >
              <span>详情 ></span>
              <!-- <i class="iconfont icon-Right"></i> -->
            </div>
          </div>
        </div>
      </div>
      <img
        src="./img/link_line.jpg"
        v-if="index !== stepOption.length - 1"
        alt="link_line"
      />
    </template>

    <!-- <div class="step_box is_active box2"></div> -->
    <div class="check_box" @click="handleCheck" v-if="submitIf">
      <div class="content">
        <i class="iconfont icon-jiancha startSearch"></i>
        <span>启动检查</span>
      </div>
    </div>
  </div>
  <div class="bottom_line"></div>
</template>
<script>
import { defineComponent, toRefs, reactive, watch } from "vue";
import './iconfont/iconfont.css'
export default defineComponent({
  name: "Vue3Step",
  props: {
    step: {
      type: String,
      default: "1-1",
    },
    stepOption: {
      type: Array,
      default: () => [
        [
          { label: "连通性检查", status: 0 },
          { label: "必填字段检查", status: 0 },
        ],
        [
          { label: "必填内容检查", status: 0 },
          { label: "数据格式检查", status: 0 },
          { label: "匹配率检查", status: 0 },
        ],
      ],
    },
    submitIf: {
      type: Boolean,
      default: true
    },
    // stepOption 二维数组,
    // 0 待检查, 1 检查通过, 2 建议完善, 3 未通过
    /**
     * @description:
     * stepOption : [
     * [{label: '连通性检查', status: 0 }, {label: '必填字段检查', status: 0 }],
     * [{label: '必填内容检查', status: 0}, {label: '数据格式检查', status: 0} , {label: '匹配率检查', status: 0}]
     * ]
     * @param {*}
     * @return {*}
     */
  },
  setup(props, { emit }) {
    let { step, stepOption } = toRefs(props);

    const state = reactive({
      stepNow: step.value,
      stepOptionNow: stepOption.value,
    });
    watch(
      () => step.value,
      (val) => {
        state.stepNow = val;
      }
    );
    watch(
      () => stepOption.value,
      (val) => {
        state.stepOptionNow.value = val;
      }
    );
    const goNext = () => {
      let stepArr = step.value.split("-");
      const stepOptionArr = stepOption.value.map((item) => item.length);
      const lengthLimit = stepOptionArr[stepArr[0] - 1];
      if (lengthLimit > stepArr[1]) {
        stepArr[1]++;
      } else {
        if (stepOptionArr.length > stepArr[0]) {
          stepArr = [Number(stepArr[0]) + 1, 1];
        } else {
          console.log("已经到达最后一步");
        }
      }
      emit("update:step", stepArr.join("-"));
    };
    const handleCheck = () => {
      emit("handleCheck");
    };
    /**
     * @description: 确定某一步骤的整体状态
     * @param {*} optionArray
     * @return {*}  status
     */

    const getBoxStatus = (item) => {
      const dangerBol = item.findIndex((el) => el.status === 3) > -1;
      if (dangerBol) return 3;
      const warningBol = item.findIndex((el) => el.status === 2) > -1;
      if (warningBol) return 2;
      const passBol =
        item.filter((el) => el.status === 1).length === item.length;
      if (passBol) return 1;
      return 0;
    };
    const getActiveClass = (type, item, index) => {
      const enum_status = {
        0: {
          label: "待检查",
          class: "", // 此处还需要当前步骤在此步骤上才能赋予is_active
          iconClass: "icon-shijian",
        },
        1: {
          label: "检查通过",
          class: "is_success",
          iconClass: "icon-wancheng is_success",
        },
        2: {
          label: "建议完善",
          class: "is_warning",
          iconClass: "icon-jingshi is_warning",
        },
        3: {
          label: "未通过",
          class: "is_danger",
          iconClass: "icon-shibai is_danger",
        },
      };
      const stepArr = state.stepNow.split("-");
      let status;
      switch (type) {
        case "step_now":
          return stepArr[0] == index + 1 ? "is_active_border" : "";
        case "step_num":
          return stepArr[0] == index + 1 ? "is_active" : "";
        case "step_status":
          // 遍历json数组,如果数组下有status为3未通过情况则为未通过, 在没有3有2的情况下为建议完善 优先级3>2>1
          status = getBoxStatus(item);
          status =
            status === 0 && stepArr[0] == index + 1
              ? "is_active"
              : enum_status[status].class;
          return status;
        case "step_status_text":
          status = getBoxStatus(item);
          return enum_status[status].label;
        case "step_content":
          return enum_status[item.status].class;
        case "content_icon":
          return enum_status[item.status].iconClass;
        default:
          break;
      }
    };
    const handleDetails = (item, index, index2) => {
      emit("handleDetails", item, index, index2);
    };
    const handleStep = (index) => {
      emit("handleStep", index);
    };
    // 挂载默认钩子函数
    return {
      state,
      handleCheck,
      getActiveClass,
      handleDetails,
      goNext,
      handleStep,
    };
  },
});
</script>
<style lang="scss" scoped>
.step_content {
  display: flex;
  align-items: center;
  .step_box {
    height: 65px;
    border-radius: 4px;
    border-width: 1px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 2px rgba(58, 120, 201, 0.15);
    min-width: 264px;
    // padding: 20px;
    color: rgba(0, 0, 0, 0.45);
    font-family: PingFangSC-Medium;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &.is_active_border {
      border: 1px solid rgba(58, 120, 201, 1);
    }
    &.box2 {
      min-width: 428px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      padding: 10px;
      .step_num {
      }
      .step_status {
      }
    }
    .content {
      font-size: 14px;
      padding: 0 10px 10px 10px;
      flex: 1;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        .details {
          span {
            margin-left: 3px;
            color: rgba(0, 0, 0, 0.45);
            &:hover {
              color: #409eff;
            }
          }
        }
      }
      div:nth-of-type(n + 2) {
        margin-left: 10px;
      }
      i {
        font-size: 13px;
        margin-left: 1px;
      }
    }
  }
  img {
    height: 3px;
    margin: 0 10px;
  }
  .check_box {
    height: 65px;
    border-radius: 4px;
    border-width: 1px;
    border: 1px solid rgba(191, 216, 249, 1);
    background-color: rgba(229, 239, 252, 1);
    width: 65px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    display: flex;
    color: rgba(58, 120, 201, 1);
    cursor: pointer;
    &:hover {
      background: #eff5fc;
    }
    .content {
      width: 48px;
      height: 37px;
      display: flex;
      flex-direction: column;
      i {
        width:18px;
        font-size: 16px;
        height: 18px;
        align-self: center;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .is_active {
    color: rgba(58, 120, 201, 1);
  }
  .is_warning {
    color: rgba(250, 173, 20, 1);
  }
  .is_danger {
    color: rgba(254, 61, 60, 1);
  }
  .is_success {
    color: #67c23a;
  }
}
.bottom_line {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 15px 0;
}
</style>
