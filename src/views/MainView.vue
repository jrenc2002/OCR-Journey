<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]">
    <div class="rounded-2xl bg-white w-full h-full bottom-0 shadow p-4 overflow-auto">
      <div class="flex flex-col w-full h-full ">
        <!-- Your header and nav content here -->

        <main class="flex  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-1">
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <!-- Iterate over sensor boards -->
            <template v-for="(sensorsBoard, index) in sensorBoards" :key="index">
              <template v-if="index<4">
                <div class="border text-card-foreground bg-white  shadow-md rounded-lg overflow-hidden ">

                  <div class="flex flex-row items-center justify-between space-y-0 bg-[rgb(26,133,211)] dark:bg-gray-600 p-4"
                       @dblclick="enableDeviceEdit(index)">
                    <h3 class="tracking-tight text-sm font-medium text-white dark:text-gray-100">


                      <template v-if="DeviceId == index">
                        <input v-model="DeviceName[index]"
                               class="text-lg font-bold w-full border-indigo-500 border-2 rounded-md text-gray-900 dark:text-gray-100"
                               @keyup.enter="changeDeviceName(DeviceName[index], AppGlobal.pageChance)"/>
                      </template>
                      <template v-else>
                        {{ DeviceName[index] }}
                      </template>
                    </h3>

                  </div>
                  <div class="px-4 py-2">
                    <!-- Display each sensor in the current board -->
                    <div v-for="(sensor, sensorIndex) in sensorsBoard" :key="sensor.device_id"
                         :class="{'border-b': sensorIndex < sensorsBoard.length - 1, 'border-gray-300': sensorIndex < sensorsBoard.length - 1}"
                         class="flex justify-between py-1 ">
                      <h2 class="text-lg font-bold text-gray-900  w-[40%] relative"
                          @dblclick="enableEditing(sensor)">
                        <template v-if="editingSensorId === sensor.device_id">
                          <input v-model="sensor.newName"
                                 class="text-lg font-bold w-full border-indigo-500 border-2 rounded-md text-gray-900 dark:text-gray-100"
                                 @keyup.enter="changeSensorName(sensor, AppGlobal.pageChance+1)"/>
                        </template>
                        <template v-else>
                          {{ sensor.device_name }}
                        </template>
                      </h2>
                      <p class="text-lg text-gray-700 dark:text-gray-300 flex-col flex w-[50%] relative ">

                                        <span class="font-bold">振动值:
                                          <span :key="sensor.current_data?.vibration_data"
                                                :class="sensor.current_data.is_alerted?'text-orange-500':'text-black'"
                                                class="animate-flip inline-block">
                                            {{ sensor.current_data?.vibration_data }}
                                          </span>  mm/s
                                        </span>
                        <span class="font-bold">温度值:
                                          <span :key="sensor.current_data?.temperature_data"
                                                :class="sensor.current_data.is_alerted?'text-orange-500':'text-black'"
                                                class="animate-flip inline-block">
                                            {{
                                              parseFloat(sensor.current_data?.temperature_data) > 0.3 || parseFloat(sensor.current_data?.temperature_data) < -0.3 ? sensor.current_data?.temperature_data : 0
                                            }}
                                          </span>  °C
                                        </span>
                      </p>
                    </div>
                  </div>


                </div>
              </template>
            </template>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue';
import {useAppGlobal} from "@/store/AppGlobal";

const DeviceName = ref(["1号采集器", "2号采集器", "3号采集器", "4号采集器", "5号采集器", "6号采集器"])
const DeviceId = ref(-1)
const AppGlobal = useAppGlobal();
const sensorBoardsRef = ref<any>([]);
const sensorBoards = computed(() => sensorBoardsRef.value);





onMounted(() => {

});


onUnmounted(() => {

});

</script>

<style>
@keyframes flip {
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

.animate-flip {
  animation: flip 0.5s ease-in-out; /* Reduced the duration to 0.5s for a quicker animation */
}
</style>
