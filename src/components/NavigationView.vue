<template>
  <div class="flex grow flex-col gap-y-5 h-full  px-6  pt-4">

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
        <li >
          <div class="relative py-4">
            <div aria-hidden="true" class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"/>
            </div>
          </div>
          <!-- 页面列表部分 -->
          <div class="  h-[75vh] rounded-xl">
            <!-- 主体内容 -->
            <main class="flex flex-1 flex-col gap-4  md:gap-8  h-full">
              <div v-if="AppGlobal.file.uploadStatus===1" class="absolute z-10 bg-gray-200 p-1 rounded-3xl right-6 m-2 hover:bg-gray-300 hover:cursor-pointer" @click="deleteFile()">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#19161D"/>
                </svg>
              </div>

              <!-- 文件上传区 -->
                <div
                  class="w-full h-full flex-col justify-start items-center gap-1 inline-flex"
                  @dragover.prevent=""
                  @drop.prevent="handleFileDrop"
                >
                  <div
                    :class="[AppGlobal.file.uploadStatus===2?'border-red-800 bg-red-100':'border-blue-800',AppGlobal.file.fileType==='image/jpeg'?'bg-[#D8F1D7]':'',AppGlobal.file.fileType==='image/png'?'bg-[#E1ECFA]':'',AppGlobal.file.fileType==='application/pdf'?'bg-[#FFEFF0]':'',]"
                    class="  w-full relative self-stretch grow shrink transition-colors basis-0 bg-white rounded-lg border border-indigo-50 flex-col justify-center items-center gap-2 flex">
                    <div class="flex-col justify-center items-center gap-1.5 flex">
                      <div v-if="AppGlobal.file.uploadStatus===1">
                        <div class="flex flex-col  justify-center items-center gap-1">
                          <div >
                            <div v-if="AppGlobal.file.fileType==='image/jpeg'">
                              <svg fill="none" height="60" viewBox="0 0 201 240" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.3">
                                  <path
                                    d="M140.1 49.24C134.632 49.2373 129.389 47.0641 125.522 43.1976C121.656 39.3312 119.483 34.0879 119.48 28.62V0H27.3401C23.8054 -2.4406e-07 20.3053 0.696337 17.0398 2.04932C13.7743 3.4023 10.8071 5.38537 8.30811 7.88525C5.80915 10.3851 3.82735 13.3529 2.47559 16.6189C1.12382 19.8849 0.42862 23.3853 0.429933 26.92V189.13C0.42862 192.665 1.12382 196.165 2.47559 199.431C3.82735 202.697 5.80915 205.665 8.30811 208.165C10.8071 210.665 13.7743 212.648 17.0398 214.001C20.3053 215.354 23.8054 216.05 27.3401 216.05H137.94C141.475 216.05 144.975 215.354 148.24 214.001C151.506 212.648 154.473 210.665 156.972 208.165C159.471 205.665 161.453 202.697 162.804 199.431C164.156 196.165 164.851 192.665 164.85 189.13V49.25L140.1 49.24Z"
                                    fill="#00C650"
                                    opacity="0.3"/>
                                </g>
                                <path
                                  d="M164.85 49.24H140.1C134.632 49.2373 129.389 47.0641 125.522 43.1976C121.656 39.3312 119.483 34.0879 119.48 28.62V0L164.85 49.24Z"
                                  fill="#00C650"/>
                                <path
                                  d="M184.37 170.6H59.3301C50.4604 170.6 43.27 177.79 43.27 186.66V223.94C43.27 232.81 50.4604 240 59.3301 240H184.37C193.24 240 200.43 232.81 200.43 223.94V186.66C200.43 177.79 193.24 170.6 184.37 170.6Z"
                                  fill="#00C650"/>
                                <path d="M84.6499 213.37V220.65H77.1201V213.37H84.6499Z" fill="white"/>
                                <path
                                  d="M107 190.58V211.12C107 214.273 106.143 216.697 104.43 218.39C103.474 219.272 102.349 219.952 101.125 220.39C99.8995 220.828 98.5988 221.015 97.3 220.94C95.8776 221.016 94.4541 220.81 93.1118 220.333C91.7696 219.856 90.5351 219.117 89.48 218.16C87.5533 216.3 86.5867 213.633 86.5801 210.16H93.77C93.77 212.97 94.84 214.37 96.96 214.37C98.81 214.37 99.73 213.29 99.73 211.14V190.6L107 190.58Z"
                                  fill="white"/>
                                <path
                                  d="M119.06 210.1V220.65H111.79V190.58H123.57C127.137 190.58 129.857 191.463 131.73 193.23C132.678 194.159 133.419 195.278 133.903 196.514C134.387 197.75 134.604 199.074 134.54 200.4C134.567 202.147 134.136 203.871 133.29 205.4C132.419 206.891 131.124 208.088 129.57 208.84C127.698 209.729 125.642 210.16 123.57 210.1H119.06ZM127.14 200.4C127.14 197.733 125.68 196.4 122.76 196.4H119.06V204.23H122.76C125.68 204.257 127.14 202.98 127.14 200.4Z"
                                  fill="white"/>
                                <path
                                  d="M161.51 193C163.931 194.821 165.56 197.502 166.06 200.49H158.36C157.839 199.444 157.017 198.576 156 198C154.855 197.32 153.542 196.973 152.21 197C151.176 196.958 150.145 197.144 149.191 197.545C148.237 197.946 147.383 198.552 146.69 199.32C145.223 201.069 144.476 203.311 144.6 205.59C144.6 208.45 145.33 210.647 146.79 212.18C147.611 212.976 148.589 213.592 149.662 213.988C150.735 214.384 151.879 214.552 153.02 214.48C154.652 214.51 156.249 214.008 157.57 213.05C158.919 212.042 159.894 210.614 160.34 208.99H151.15V203.76H166.42V210.95C165.837 212.74 164.913 214.4 163.7 215.84C162.386 217.391 160.752 218.64 158.91 219.5C156.827 220.462 154.554 220.941 152.26 220.9C149.47 220.973 146.71 220.307 144.26 218.97C142.019 217.71 140.194 215.822 139.01 213.54C137.738 211.069 137.102 208.319 137.16 205.54C137.11 202.778 137.746 200.046 139.01 197.59C140.192 195.313 142.009 193.427 144.24 192.16C146.654 190.833 149.376 190.167 152.13 190.23C155.478 190.084 158.779 191.059 161.51 193Z"
                                  fill="white"/>
                                <path
                                  d="M104.73 146.41H60.5601C56.236 146.405 52.0905 144.685 49.033 141.627C45.9754 138.57 44.2553 134.424 44.25 130.1V85.9301C44.2553 81.606 45.9754 77.4605 49.033 74.403C52.0905 71.3454 56.236 69.6253 60.5601 69.62H104.73C109.053 69.6253 113.197 71.3457 116.253 74.4036C119.309 77.4614 121.027 81.6069 121.03 85.9301V130.1C121.027 134.423 119.309 138.569 116.253 141.626C113.197 144.684 109.053 146.405 104.73 146.41ZM60.5601 76.83C58.1474 76.8326 55.8342 77.7923 54.1282 79.4983C52.4222 81.2043 51.4626 83.5174 51.46 85.9301V130.1C51.4626 132.513 52.4222 134.826 54.1282 136.532C55.8342 138.238 58.1474 139.197 60.5601 139.2H104.73C107.142 139.197 109.454 138.237 111.158 136.531C112.863 134.825 113.82 132.512 113.82 130.1V85.9301C113.82 83.5183 112.863 81.2052 111.158 79.4989C109.454 77.7926 107.142 76.8326 104.73 76.83H60.5601Z"
                                  fill="#00C650"/>
                                <path
                                  d="M117.43 121.7V130.1C117.427 133.467 116.088 136.696 113.707 139.077C111.326 141.458 108.097 142.797 104.73 142.8H60.5601C57.1918 142.8 53.9615 141.462 51.5798 139.08C49.1981 136.698 47.8601 133.468 47.8601 130.1V116C54.9301 114.48 65.7 114 78.77 119.22L86.8701 111.5L92.3899 125.5C92.3899 125.5 93.8699 120.35 98.6499 121.08C103.43 121.81 111.17 124.4 114.48 122.19C115.372 121.675 116.42 121.501 117.43 121.7Z"
                                  fill="#00C650"/>
                                <path
                                  d="M101.96 94.95C104.672 94.95 106.87 92.7518 106.87 90.04C106.87 87.3283 104.672 85.13 101.96 85.13C99.2482 85.13 97.05 87.3283 97.05 90.04C97.05 92.7518 99.2482 94.95 101.96 94.95Z"
                                  fill="#00C650"/>
                              </svg>
                            </div>
                            <div v-else-if="AppGlobal.file.fileType==='image/png'">
                              <svg fill="none" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.3">
                                  <path
                                    d="M139.67 49.24C134.203 49.2347 128.961 47.0606 125.095 43.1947C121.229 39.3288 119.055 34.0871 119.05 28.62V0H26.91C19.773 0 12.9284 2.83517 7.88177 7.88177C2.83517 12.9284 0 19.773 0 26.91V189.13C0.0105984 196.26 2.85042 203.094 7.89587 208.132C12.9413 213.17 19.7799 216 26.91 216H137.52C144.652 216 151.492 213.169 156.538 208.129C161.583 203.089 164.422 196.252 164.43 189.12V49.24H139.67Z"
                                    fill="#005FAD"
                                    opacity="0.3"/>
                                </g>
                                <path
                                  d="M164.43 49.24H139.67C134.203 49.2347 128.961 47.0606 125.095 43.1947C121.229 39.3288 119.055 34.0871 119.05 28.62V0L164.43 49.24Z"
                                  fill="#005FAD"/>
                                <path
                                  d="M183.94 170.6H58.9C50.0303 170.6 42.84 177.79 42.84 186.66V223.94C42.84 232.81 50.0303 240 58.9 240H183.94C192.81 240 200 232.81 200 223.94V186.66C200 177.79 192.81 170.6 183.94 170.6Z"
                                  fill="#005FAD"/>
                                <path d="M79.06 213.37V220.64H71.53V213.37H79.06Z" fill="white"/>
                                <path
                                  d="M90.12 210.1V220.64H82.84V190.57H94.62C98.2 190.57 100.923 191.457 102.79 193.23C103.738 194.159 104.478 195.279 104.962 196.514C105.446 197.75 105.664 199.074 105.6 200.4C105.631 202.149 105.196 203.875 104.34 205.4C103.472 206.893 102.176 208.091 100.62 208.84C98.7491 209.732 96.6918 210.164 94.62 210.1H90.12ZM98.2 200.4C98.2 197.733 96.74 196.4 93.82 196.4H90.12V204.23H93.82C96.74 204.257 98.2 202.98 98.2 200.4Z"
                                  fill="white"/>
                                <path
                                  d="M135.88 220.64H128.61L116.43 202.18V220.64H109.16V190.57H116.43L128.6 209.2V190.57H135.87L135.88 220.64Z"
                                  fill="white"/>
                                <path
                                  d="M164.29 193C166.716 194.816 168.347 197.5 168.84 200.49H161.14C160.635 199.419 159.824 198.521 158.81 197.91C157.664 197.231 156.352 196.884 155.02 196.91C153.985 196.867 152.954 197.052 151.998 197.451C151.043 197.85 150.187 198.454 149.49 199.22C148.029 200.976 147.286 203.219 147.41 205.5C147.41 208.36 148.14 210.557 149.6 212.09C150.421 212.887 151.399 213.503 152.472 213.899C153.545 214.295 154.689 214.462 155.83 214.39C157.461 214.418 159.058 213.916 160.38 212.96C161.727 211.952 162.698 210.523 163.14 208.9H153.96V203.67H169.23V211C168.639 212.788 167.712 214.448 166.5 215.89C165.191 217.442 163.56 218.691 161.72 219.55C159.634 220.513 157.357 220.992 155.06 220.95C152.269 221.021 149.509 220.351 147.06 219.01C144.819 217.754 142.994 215.87 141.81 213.59C140.542 211.135 139.907 208.403 139.96 205.64C139.9 202.861 140.536 200.111 141.81 197.64C142.993 195.366 144.809 193.483 147.04 192.22C149.453 190.891 152.176 190.225 154.93 190.29C158.265 190.126 161.558 191.08 164.29 193Z"
                                  fill="white"/>
                                <path d="M54.7 66.72H40.95V80.47H54.7V66.72Z" fill="#005FAD"/>
                                <path d="M68.46 80.47H54.71V94.22H68.46V80.47Z" fill="#005FAD"/>
                                <path d="M82.21 66.72H68.46V80.47H82.21V66.72Z" fill="#005FAD"/>
                                <path d="M95.9601 80.47H82.21V94.22H95.9601V80.47Z" fill="#005FAD"/>
                                <path d="M109.73 66.72H95.98V80.47H109.73V66.72Z" fill="#005FAD"/>
                                <path d="M123.48 80.47H109.73V94.22H123.48V80.47Z" fill="#005FAD"/>
                                <path d="M54.7 94.2H40.95V107.95H54.7V94.2Z" fill="#005FAD"/>
                                <path d="M68.46 107.95H54.71V121.7H68.46V107.95Z" fill="#005FAD"/>
                                <path d="M82.21 94.2H68.46V107.95H82.21V94.2Z" fill="#005FAD"/>
                                <path d="M95.9601 107.95H82.21V121.7H95.9601V107.95Z" fill="#005FAD"/>
                                <path d="M109.73 94.2H95.98V107.95H109.73V94.2Z" fill="#005FAD"/>
                                <path d="M123.48 107.95H109.73V121.7H123.48V107.95Z" fill="#005FAD"/>
                                <path d="M54.7 121.81H40.95V135.56H54.7V121.81Z" fill="#005FAD"/>
                                <path d="M68.46 135.56H54.71V149.31H68.46V135.56Z" fill="#005FAD"/>
                                <path d="M82.21 121.81H68.46V135.56H82.21V121.81Z" fill="#005FAD"/>
                                <path d="M95.9601 135.56H82.21V149.31H95.9601V135.56Z" fill="#005FAD"/>
                                <path d="M109.73 121.81H95.98V135.56H109.73V121.81Z" fill="#005FAD"/>
                                <path d="M123.48 135.56H109.73V149.31H123.48V135.56Z" fill="#005FAD"/>
                              </svg>

                            </div>
                            <div v-else-if="AppGlobal.file.fileType==='application/pdf'">
                              <svg fill="none" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.3">
                                  <path
                                    d="M139.67 49.25C134.203 49.2447 128.961 47.0704 125.095 43.2046C121.229 39.3387 119.055 34.097 119.05 28.6299V0H26.91C19.773 0 12.9284 2.83523 7.88177 7.88184C2.83517 12.9284 0 19.7729 0 26.9099V189.13C0.0105984 196.26 2.85042 203.094 7.89587 208.132C12.9413 213.17 19.7799 216 26.91 216H137.52C144.65 216 151.489 213.17 156.534 208.132C161.58 203.094 164.419 196.26 164.43 189.13V49.25H139.67Z"
                                    fill="#FF3E4C"
                                    opacity="0.3"/>
                                </g>
                                <path
                                  d="M164.43 49.25H139.67C134.203 49.2447 128.961 47.0704 125.095 43.2046C121.229 39.3387 119.055 34.097 119.05 28.6299V0L164.43 49.25Z"
                                  fill="#FF3E4C"/>
                                <path
                                  d="M130.6 150.84H27.36C26.3654 150.84 25.4116 150.445 24.7083 149.742C24.0051 149.038 23.61 148.085 23.61 147.09C23.6126 146.097 24.0089 145.146 24.7119 144.445C25.4148 143.744 26.3672 143.35 27.36 143.35H130.6C131.592 143.35 132.543 143.744 133.245 144.445C133.946 145.147 134.34 146.098 134.34 147.09C134.341 147.582 134.246 148.07 134.058 148.524C133.871 148.979 133.596 149.393 133.248 149.741C132.901 150.089 132.488 150.366 132.034 150.554C131.579 150.743 131.092 150.84 130.6 150.84Z"
                                  fill="#FF3E4C"/>
                                <path
                                  d="M130.6 108.6H27.36C26.3672 108.6 25.4148 108.206 24.7119 107.505C24.0089 106.804 23.6126 105.853 23.61 104.86C23.61 103.866 24.0051 102.912 24.7083 102.208C25.4116 101.505 26.3654 101.11 27.36 101.11H130.6C131.092 101.11 131.579 101.207 132.034 101.396C132.488 101.584 132.901 101.861 133.248 102.209C133.596 102.557 133.871 102.971 134.058 103.426C134.246 103.881 134.341 104.368 134.34 104.86C134.34 105.852 133.946 106.803 133.245 107.505C132.543 108.206 131.592 108.6 130.6 108.6Z"
                                  fill="#FF3E4C"/>
                                <path
                                  d="M130.6 129.72H27.36C26.3654 129.72 25.4116 129.325 24.7083 128.622C24.0051 127.918 23.61 126.965 23.61 125.97C23.6126 124.977 24.0089 124.026 24.7119 123.325C25.4148 122.624 26.3672 122.23 27.36 122.23H130.6C131.592 122.23 132.543 122.624 133.245 123.325C133.946 124.027 134.34 124.978 134.34 125.97C134.341 126.462 134.246 126.949 134.058 127.404C133.871 127.859 133.596 128.273 133.248 128.621C132.901 128.969 132.488 129.246 132.034 129.434C131.579 129.623 131.092 129.72 130.6 129.72Z"
                                  fill="#FF3E4C"/>
                                <path
                                  d="M89.88 87.48H27.36C26.3672 87.48 25.4148 87.0864 24.7119 86.3853C24.0089 85.6842 23.6126 84.7328 23.61 83.74C23.61 82.7454 24.0051 81.7916 24.7083 81.0884C25.4116 80.3851 26.3654 79.99 27.36 79.99H89.88C90.8728 79.9926 91.8241 80.3888 92.5252 81.0918C93.2263 81.7948 93.62 82.7472 93.62 83.74C93.6174 84.7311 93.2225 85.6808 92.5217 86.3816C91.8209 87.0824 90.8711 87.4773 89.88 87.48Z"
                                  fill="#FF3E4C"/>
                                <path
                                  d="M89.88 66.3601H27.36C26.3672 66.3601 25.4148 65.9662 24.7119 65.2651C24.0089 64.564 23.6126 63.6129 23.61 62.6201C23.61 61.6256 24.0051 60.6715 24.7083 59.9683C25.4116 59.265 26.3654 58.8701 27.36 58.8701H89.88C90.8728 58.8728 91.8241 59.2689 92.5252 59.9719C93.2263 60.6749 93.62 61.6273 93.62 62.6201C93.6174 63.6112 93.2225 64.5609 92.5217 65.2617C91.8209 65.9625 90.8711 66.3575 89.88 66.3601Z"
                                  fill="#FF3E4C"/>
                                <path
                                  d="M183.94 170.61H58.9001C50.0304 170.61 42.8401 177.8 42.8401 186.67V223.95C42.8401 232.82 50.0304 240.01 58.9001 240.01H183.94C192.81 240.01 200 232.82 200 223.95V186.67C200 177.8 192.81 170.61 183.94 170.61Z"
                                  fill="#FF3E4C"/>
                                <path d="M83.86 213.38V220.65H76.34V213.38H83.86Z" fill="white"/>
                                <path
                                  d="M94.9199 210.1V220.65H87.6499V190.58H99.4299C103 190.58 105.73 191.47 107.6 193.24C108.546 194.17 109.285 195.289 109.767 196.525C110.25 197.761 110.466 199.085 110.4 200.41C110.436 202.158 110.005 203.884 109.15 205.41C108.277 206.901 106.983 208.102 105.43 208.86C103.557 209.745 101.501 210.174 99.4299 210.11L94.9199 210.1ZM103 200.41C103 197.743 101.54 196.41 98.6199 196.41H94.9199V204.24H98.6199C101.54 204.267 103 202.99 103 200.41Z"
                                  fill="white"/>
                                <path
                                  d="M139.13 213.4C137.878 215.674 135.987 217.53 133.69 218.74C131.106 220.063 128.232 220.719 125.33 220.65H113.98V190.58H125.33C128.234 190.507 131.112 191.149 133.71 192.45C136 193.634 137.887 195.471 139.13 197.73C140.431 200.128 141.086 202.823 141.03 205.55C141.084 208.287 140.43 210.991 139.13 213.4ZM131.31 211.89C132.123 211.056 132.753 210.061 133.159 208.969C133.565 207.877 133.739 206.713 133.67 205.55C133.74 204.389 133.566 203.225 133.16 202.135C132.753 201.045 132.123 200.052 131.31 199.22C129.491 197.624 127.115 196.812 124.7 196.96H121.25V214.14H124.7C127.113 214.287 129.487 213.478 131.31 211.89Z"
                                  fill="white"/>
                                <path
                                  d="M164.76 190.58V196.37H152.43V202.96H161.95V208.49H152.43V220.65H145.15V190.58H164.76Z"
                                  fill="white"/>
                                <path
                                  d="M128.77 58.8701H111.09C108.008 58.8701 105.51 61.3684 105.51 64.4501V82.1301C105.51 85.2119 108.008 87.7101 111.09 87.7101H128.77C131.852 87.7101 134.35 85.2119 134.35 82.1301V64.4501C134.35 61.3684 131.852 58.8701 128.77 58.8701Z"
                                  fill="#FF3E4C"/>
                              </svg>
                            </div>
                          </div>
                          <div class="font-bold w-[8rem] flex justify-center items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                            文件名:
                          </div>
                          <div class="w-32 flex justify-center items-center text-center break-all">
                            {{ AppGlobal.file.fileName }}
                          </div>
                          <div  class="font-bold w-[8rem] flex justify-center items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                            文件类型:
                          </div>
                          <div   class="w-[8rem] flex justify-center items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {{ AppGlobal.file.fileType }}
                          </div>
                        </div>

                      </div>
                      <div v-else-if="AppGlobal.file.uploadStatus===0||AppGlobal.file.uploadStatus===2">
                        <div class="text-zinc-900 text-xs font-normal font-['Inter'] leading-none h-[1.5rem] justify-center items-center flex">拖拽文件到这里</div>
                        <div class="text-zinc-500 text-xs font-normal font-['Inter'] leading-none h-[1.5rem] justify-center items-center flex">或</div>
                        <div
                          class="h-7 px-2 py-1 bg-zinc-900 rounded-[7px] justify-center items-center gap-1.5 inline-flex  justify-center items-center ">
                          <div
                            class="text-white text-xs font-normal font-['Inter'] leading-none cursor-pointer"
                            @click="triggerFileInput"
                          >
                            手动选择文件
                            <input
                              ref="fileInput"
                              class="hidden"
                              type="file"
                              @change="handleFileChange"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div :class="[AppGlobal.file.uploadStatus===2?'text-red-800':'']"
                       class="my-1 self-stretch text-zinc-600 text-xs font-normal font-['Inter'] leading-none transition-all" >
                    {{ AppGlobal.file.uploadStatus === 2 ? '请输入正确的文件类型哦！' : ' 支持PNG, JPEG, PDF格式' }}

                  </div>
                </div>
            </main>
          </div>
        </li>

      </ul>
    </nav>


  </div>
</template>

<script lang="js" setup>
import {useRoute} from 'vue-router'
import {computed, ref} from 'vue'
import {ChartBarIcon, TvIcon} from '@heroicons/vue/24/outline'
import {useAppGlobal} from '@/store/AppGlobal'
import {parseInocrTxt, postInocr} from '@/api/textin.js';
import {exportToTxtFile} from '@/export/txt.js';

// 可以在组件中的任意位置访问 `store` 变量 ✨
const AppGlobal = useAppGlobal()
const route = useRoute()

const navigation = computed(() => [
  {name: '显示界面', href: '/mainview', icon: TvIcon, current: route.path === '/mainview'},
  {name: '表格识别', href: '/tableview', icon: ChartBarIcon, current: route.path === '/analysisview'},
])



const fileInput = ref(null);

const postFile = async (file) => {
  try {
    const result = await postInocr(file, 'TXT');
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // 抛出错误以便外部调用处理
  }
};

const parseFile = async (data) => {
  try {
    const parsed = await parseInocrTxt(data);
    return parsed;
  } catch (error) {
    console.error('Error parsing file:', error);
    throw error; // 抛出错误以便外部调用处理
  }
};

const exportFile = (text, filename) => {
  try {
    exportToTxtFile(text, filename);
  } catch (error) {
    console.error('Error exporting file:', error);
    throw error; // 抛出错误以便外部调用处理
  }
};

const handleFileDrop = async (event) => {
  event.preventDefault();
  try {
    const file = event.dataTransfer.files[0];
    await processFile(file);

  } catch (error) {
    console.error('Error handling file drop:', error);
  }
};

const handleFileChange = async (event) => {
  try {
    const file = event.target.files[0];
    await processFile(file);

  } catch (error) {
    console.error('Error handling file change:', error);
  }
};

const processFile = async (file) => {
  if (!isValidFileType(file)) {
    AppGlobal.file.uploadStatus = 2;
    setTimeout(() => {
      AppGlobal.file.uploadStatus = 0;
    }, 2000);
    return;
  }
  try {
    AppGlobal.file.fileName = file.name;
    AppGlobal.file.fileType = file.type;
    AppGlobal.file.uploadStatus = 1;
    AppGlobal.file.fileContent=file;
    // const uploadResult = await postFile(file);
    // const parsedText = await parseFile(uploadResult);
    // const filename = file.name;
    // exportFile(parsedText, filename);
    // AppGlobal.file.uploadSuccess = true;
  } catch (error) {
    console.error('Error processing file:', error);
    AppGlobal.file.uploadSuccess = false;
  }
};
const triggerFileInput = () => {
  fileInput.value.click();  // 触发input的点击事件
};

// 检验文件格式是否是PNG, JPEG, PDF
function isValidFileType(file) {
  const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  return validTypes.includes(file.type);
}


const deleteFile=()=>{
  AppGlobal.file.fileName = '';
  AppGlobal.file.fileType = '';
  AppGlobal.file.uploadStatus = 0;
  AppGlobal.file.fileContent=null;

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
