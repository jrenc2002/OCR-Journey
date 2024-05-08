import {defineStore} from "pinia";
import {useRoute} from "vue-router";

// 给开发人员使用的debug
const debug = false;

const route = useRoute()

const state = () => {
  return {
    // 分页选择项
    // 侧边展开
    isDrawerState: true,
    // 上传文件
    file: {
      fileName: '',
      fileType: '',
      uploadStatus: 0, //0是未上传，1是上传成功，2是上传未知格式
      fileContent: null,
    },
    returnKind:''

  }
}

/**
 * 提供可视窗口的公共状态
 */
export const useAppGlobal = defineStore('AppGlobal', {
  state,
  actions: {


    updateDrawerState(newDrawerState: boolean) {
      this.isDrawerState = newDrawerState;
    }

  },
});
