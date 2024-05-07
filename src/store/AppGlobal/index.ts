import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;

const route = useRoute()

const state = () => {
  return {
    // 分页选择项
    pageChance: 0,

    selectedDeviceIndex: -1,
    // 侧边展开
    isDrawerState: true,

  }
}

/**
 * 提供可视窗口的公共状态
 */
export const useAppGlobal = defineStore('AppGlobal', {
  state,
  actions: {

    updatePageChance(newpageChance: number) {
      this.pageChance = newpageChance;
    },
    updateDrawerState(newDrawerState: boolean) {
      this.isDrawerState = newDrawerState;
    }

  },
});
