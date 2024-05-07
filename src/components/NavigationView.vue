<template>
    <div class="flex grow flex-col gap-y-5 overflow-y-auto  px-6  pt-4">

        <nav class="flex flex-1 flex-col ">
            <ul class="flex flex-1 flex-col gap-y-4" role="list">
                <li>
                    <ul class="-mx-2 space-y-1" role="list">
                        <li v-for="item in navigation" :key="item.name">
                            <router-link
                                    :class="[item.current ? 'bg-white text-[#1EA5FC] shadow' : 'text-gray-700 hover:text-[#1EA5FC] hover:bg-white hover:shadow', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
                                    :to="item.href">
                                <component :is="item.icon"
                                           :class="[item.current ? 'text-[#1EA5FC]' : 'text-gray-400 group-hover:text-[#1EA5FC]', 'h-6 w-6 shrink-0']"
                                           aria-hidden="true"/>
                                {{ item.name }}
                                <span v-if="item.count"
                                      aria-hidden="true"
                                      class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200">{{
                                        item.count
                                    }}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="relative">
                        <div aria-hidden="true" class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"/>
                        </div>
                    </div>
                    <!-- 页面列表部分 -->
                    <div class="w-full h-[34rem]  overflow-y-auto ">
                        <ul class=" mt-4 space-y-1" role="list">
                            <li v-for="team in pages" :key="team.name">
                                <div
                                        :class="[team.current ? 'bg-white rounded-md shadow text-[#1EA5FC]' : 'text-gray-700 hover:text-gray-600 hover:bg-white hover:shadow', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer']"
                                        :href="team.href" @click.prevent="changebindPage(team.id)"
                                        @dblclick.stop="changePageName(team.id)"
                                        @contextmenu.prevent="showMenu($event, team.id)"
                                >
                                    <!-- 指示灯 -->


                                    <span v-if="team.id !== editID" class="truncate">{{ team.name }}</span>
                                    <span v-else>
										<input v-model="updateName" :placeholder="team.name"
                                               class="border border-gray-200 text-black w-full"
                                               @keyup.enter="enterEdit(team.id)"></span>
                                </div>



                            </li>
                        </ul>
                    </div>
                </li>

            </ul>
        </nav>

        <!-- 添加按钮   -->
        <div>
            <Transition name="fade">
                <div v-if="isExpanded" class="
              w-[12rem] h-[16rem] border-[2px] border-[#1EA5FC] rounded-[14px] fixed bottom-4  bg-white left-6">
                    <div class="absolute right-0 p-2 cursor-pointer" @click="toggle">
                        <svg fill="none" height="18" viewBox="0 0 15 15" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"
                                  fill="#828282"/>
                        </svg>
                    </div>
                    <div class="flex-col items-center justify-center">
                        <div class="w-[100%] h-9 flex items-center justify-center">
                            新增设备
                        </div>

                        <!--            <div class="w-[96%] h-px m-2 bg-zinc-300"></div>-->

                        <div class="isolate -space-y-px rounded-md ">

                            <div
                                    class="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                                <div class="flex w-full mb-1">
                                    <label class="block text-xs font-medium text-gray-900 w-2/3 mr-1"
                                           for="name">IP地址</label>
                                    <label class="block text-xs font-medium text-gray-900 " for="name">端口</label>
                                </div>
                                <div class="flex">
                                    <input id="name"
                                           v-model="ipAddress"
                                           class="block w-2/3 border p-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-1 mr-1"
                                           name="name" placeholder="192.168.1.2"
                                           type="text"/>
                                    <input id="name"
                                           v-model="port"
                                           class="block w-1/3 border p-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-1"
                                           name="name" placeholder="2000"
                                           type="text"/>
                                </div>
                            </div>
                            <div
                                    class="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                                <label class="block text-xs font-medium text-gray-900 mb-1"
                                       for="job-title">设备名称</label>
                                <input id="job-title"
                                       v-model="nameDevice"
                                       class="block w-full border p-0 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6 pl-1 "
                                       name="job-title" placeholder="F1"
                                       type="text"/>

                            </div>

                        </div>
                        <div class="w-[100%] h-9 flex items-center justify-begin">

                            <button
                                    className="flex items-center justify-begin w-20 mt-6 ml-2 inline-flex items-center rounded-md bg-[#1EA5FC] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1E8ED9]   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    type="button"
                                    @click="newDevice"
                            >
                                <div class="ml-1">确定</div>
                                <svg class="ml-1.5" fill="none" height="12" viewBox="0 0 12 12" width="12"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd"
                                          d="M6 10.375C8.41625 10.375 10.375 8.41625 10.375 6C10.375 3.58375 8.41625 1.625 6 1.625C3.58375 1.625 1.625 3.58375 1.625 6C1.625 8.41625 3.58375 10.375 6 10.375ZM6 11.25C8.89949 11.25 11.25 8.89949 11.25 6C11.25 3.10051 8.89949 0.75 6 0.75C3.10051 0.75 0.75 3.10051 0.75 6C0.75 8.89949 3.10051 11.25 6 11.25Z"
                                          fill="white"
                                          fill-rule="evenodd"/>
                                </svg>

                            </button>
                        </div>
                        <div class="ml-2 mt-5 text-green-600 ">

                            {{ message }}
                        </div>
                    </div>


                </div>
                <div v-else class=" transition hover:bg-[#1EA5FC] hover:text-white  hover:stroke-white duration-150  cursor-pointer
              bg-white rounded-[50px] border-[2px] border-[#1EA5FC] justify-center flex items-center w-10 h-10
           items-center flex fixed bottom-4  " @click="toggle">
                    <div class="w-4 h-4 relative justify-center flex items-center">
                        <svg fill="none" height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 4.5V0H4.5V4.5H0V5.5H4.5V10H5.5V5.5H10V4.5H5.5Z" fill="#19161D"/>
                        </svg>


                    </div>

                </div>

            </Transition>

        </div>

    </div>
</template>

<script lang="js" setup>
import {useRoute} from 'vue-router'
import {computed, onMounted, ref, watch} from 'vue'
import {ChartBarIcon, Cog8ToothIcon, ServerStackIcon, TvIcon} from '@heroicons/vue/24/outline'
import {useAppGlobal} from '@/store/AppGlobal'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const AppGlobal = useAppGlobal()
const ChancePage = ref(AppGlobal.pageChance)
const editID = ref(-1)
const updateName = ref('')
const route = useRoute()

// 分页名称
const basePages = ref([]);


const initPagesValue = () => {
    pagesValue.value = basePages.value.map((page) => ({
        ...page
    }))
}

const navigation = computed(() => [
    {name: '显示界面', href: '/mainview', icon: TvIcon, current: route.path === '/mainview'},
    {name: '分析界面', href: '/analysisview', icon: ChartBarIcon, current: route.path === '/analysisview'},
    {name: '设置界面', href: '/setiew', icon: Cog8ToothIcon, current: route.path === '/setiew'},
    {name: '报警数据', href: '/alarmview', icon: ServerStackIcon, current: route.path === '/alarmview'}

])
const showMenu = (event, deviceId) => {
    if (AppGlobal.selectedDeviceIndex == deviceId) {
        AppGlobal.selectedDeviceIndex = -1
    } else AppGlobal.selectedDeviceIndex = deviceId;


}


const pages = computed(() => {
    return basePages.value.map(page => ({
        ...page,
        current: page.id === ChancePage.value
    }))
})

// 切换绑定的分页
const changebindPage = (id) => {
    ChancePage.value = id;
    AppGlobal.updatePageChance(id);

}
// 改变分页名称
const changePageName = (id) => {
    editID.value = id

}
const isExpanded = ref(false);

const ipAddress = ref('');
const port = ref('');
const message = ref('');
const nameDevice = ref('');

const toggle = () => {
    isExpanded.value = !isExpanded.value;
};

// 监听分页名称输入框
const enterEdit = (id) => {
    basePages.value[id].name = updateName.value;
    editID.value = -1;
    updateName.value = ''
}


</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}

.fade-enter-from {
    transform-origin: left bottom;
    transform: scale(0.5);
    opacity: 0;
}

.fade-leave-to {
    transform-origin: left bottom;
    transform: scale(0.5);
    opacity: 0;
}

/* 初始状态 */
.fadeRight-enter-from {
    transform-origin: center center;
    transform: scale(0.5);
    opacity: 0;
}

.fadeRight-enter, .fadeRight-leave-to /* .fadeRight-leave-active in <2.1.8 */
{
    opacity: 0;
    transform-origin: center center;
    transform: scale(0.5);

}

/* 过渡状态 */
.fadeRight-enter-active, .fadeRight-leave-active {
    transition: opacity 0.5s, transform 0.2s;

}

/* 结束状态 */
.fadeRight-enter-to /* .fadeRight-enter-active in <2.1.8 */, .fadeRight-leave {
    opacity: 1;


}


</style>
