<template>
    <div class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10 space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-lg font-bold text-gray-900 bg-gray-300 text-center py-1">AI Assistant</h2>
          <div class="mt-4 px-6">
              <div class="col-span-full mt-4">
                  <label for="final-description" class="block text-sm/6 font-medium text-gray-900">Ask AI Assistant a question:</label>
                  <div class="mt-2">
                  <textarea type="text" v-model="inputData" rows="3" 
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                  </div>
              </div>
              <div class="col-span-full">
                <div class="mt-6 flex items-center justify-start gap-x-6">
                    <button type="submit" @click="submit()"
                        class="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Submit question to assistant
                    </button>
                 </div>
                <div>Response:<br> {{data}}</div>
              </div>
          </div>
      </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'

const data = ref()
const inputData = ref()
const connection = new WebSocket("ws://localhost:8000/ai_assistant/chat")

onMounted(() => {
  connection.onmessage = function(e){
    data.value = e.data
  }
})

function submit()  {
  connection.send(inputData.value)
}


</script>
