<template>
  <div
    class="w-full h-screen rounded-[15px] flex absolute z-10 bg-gradient-to-r from-[#C9D6FF] via-[#E2E2E2] to-[#E9E4F0] "
    style="background: linear-gradient(90deg, #C9D6FF 0%, #E9E4F0 100%), radial-gradient(85.89% 47.61% at 442.62% 78.80%, rgba(89.85, 125.68, 217.81, 0.50) 0%, rgba(81, 253, 211.72, 0) 100%);">
    <!-- 左侧样式 -->
    <!-- 'w-1/5' 意味着当抽屉可见时，其占据 1/5 的屏幕宽度。'w-0' 意味着当抽屉不可见时，其宽度为 0 -->
    <div
      class="drawer h-full   relative rounded-[15px] flex items-center pl-[0.3rem] pt-[0.2rem] pb-[0.2rem] overflow-hidden transition-all duration-300 ease-in-out"
      v-bind:class="{ 'w-[15rem]': isDrawerVisible.visible, 'w-0': !isDrawerVisible.visible }">

      <!-- 根据计算设置元素的宽度和高度，并设置元素的背景颜色，同时定义了元素的类名 -->
      <div :style="{ width: 'calc(100% )', height: 'calc(100% - 0.3rem)' }"
           class="box-border  shadow bg-white   rounded-[15px] flex flex-col p-[0.5rem] justify-center items-center gap-6 inline-flex bg-opacity-80">
        <!-- 创建一个用户卡片组件 -->
        <!-- 定义一个导航区域，标明其角色为"Sidebar" -->
        <nav v-if="isDrawerVisible.visible" aria-label="Sidebar"
             class="flex flex-1 flex-col w-[100%]  relative      ">
          <NavigationView/>
        </nav>
      </div>

    </div>


    <!-- 右侧样式 -->
    <!-- 'w-4/5' 意味着当抽屉可见时，右侧样式占据 4/5 的屏幕宽度。'w-full' 和 'ml-[-0.3rem]' 意味着当抽屉不可见时，右侧样式占据全屏，且左侧有 0.3rem 的间隙 -->
    <div
      :class="{ 'w-[calc(100%-15rem)]': isDrawerVisible.visible, 'w-full': !isDrawerVisible.visible, 'ml-[-0.3rem]': !isDrawerVisible.visible }"
      class="right-side h-full relative flex flex-col justify-start items-start pl-[0.3rem] pt-[0.3rem] transition-all duration-300 ease-in-out "
      @contextmenu="toggleDrawer">
      <!-- 右侧白底 -->
      <div :style="{ width: 'calc(100% - 0.3rem)', height: 'calc(100% - 0.3rem)' }"
           class="box-border shadow bg-white bg-opacity-80 rounded-[15px] flex flex-col justify-center items-center gap-6 inline-flex transform-origin: left">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="move">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>

      </div>
    </div>
  </div>


</template>
<script lang="js" setup>
import {onMounted, onUnmounted, reactive} from 'vue';
import NavigationView from '../components/NavigationView.vue';
import {useAppGlobal} from '@/store/AppGlobal'

const AppGlobal = useAppGlobal();
// 使用 Vue3 的 reactive 函数来创建一个响应式对象，用于控制抽屉的显示状态
const isDrawerVisible = reactive({
  visible: true

});

// 定义一个函数，用于切换抽屉的显示状态
const toggleDrawer = () => {
  isDrawerVisible.visible = !isDrawerVisible.visible;
  AppGlobal.updateDrawerState(isDrawerVisible.visible)
}

// 定义一个函数，用于更新抽屉的显示状态，当窗口宽度小于等于600px时，抽屉会自动隐藏
const updateWindowSize = () => {
  if (window.innerWidth / window.innerHeight <= 1.5 || window.innerWidth <= 900) {
    isDrawerVisible.visible = false;

    AppGlobal.updateDrawerState(isDrawerVisible.visible)

  } else {
    isDrawerVisible.visible = true;

    AppGlobal.updateDrawerState(isDrawerVisible.visible)
  }


}





// 使用 Vue3 的生命周期钩子函数 onUnmounted，在组件卸载之前移除窗口大小变化的监听事件
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);


});


</script>



