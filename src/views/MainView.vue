<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]">
    <div class="rounded-2xl bg-white w-full h-full bottom-0 shadow p-4 overflow-auto">
      <div class="flex flex-col w-full h-full">

      </div>
    </div>
  </div>
</template>

<script setup>

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

.drop-zone {
  transition: background-color 0.3s;
}

.drop-zone.dragover {
  background-color: #f3f4f6; /* 淡灰色背景 */
}

</style>
