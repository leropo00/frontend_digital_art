<template>
     <div v-if="item.identifier_name" class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10">
         <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-lg font-bold text-gray-900 bg-gray-300 text-center py-1">
                {{ item.identifier_name }}
            </h2>
            <div class="mt-4 px-6">
                Art idea type: {{ item.idea_type }}
                <div class="border-b border-gray-900/10 pb-2 mt-10">
                    <h2 class="text-base/7 font-semibold text-gray-900">Title:</h2>
                </div>
                <div class="border-b border-gray-900/10 pb-2 mt-10">
                    <h2 class="text-base/7 font-semibold text-gray-900">Idea Description:</h2>

                    <div class="col-span-full mt-4">
                        <label for="intial_idea" class="block text-sm/6 font-medium text-gray-900">Inital Idea:</label>
                        <div class="mt-2">
                        <textarea name="intial-idea" id="intial-idea" rows="3" 
                        v-model="item.initial_idea"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="col-span-full mt-4">
                        <label for="final-description" class="block text-sm/6 font-medium text-gray-900">Final Description:</label>
                        <div class="mt-2">
                        <textarea name="final-description" id="final-description" rows="3" 
                        v-model="item.final_description"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>
                <div class="border-b border-gray-900/10 pb-2 mt-10">
                    <h2 class="text-base/7 font-semibold text-gray-900">Idea Questions:</h2>
                    {{ item.questions.length }}
                </div>
            </div>
        </div>
     </div>
     <div v-else class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10">
         <div class="border-b border-gray-900/10 pb-12">
            Loading
        </div>
      </div>
</template>

<script setup lang="ts">import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axiosClient from '@/axios'
import {IDEA_TYPE_IMAGE, IDEA_TYPE_IMAGE_TEXT, IDEA_TYPE_TEXT_ONLY, URL_GET_IDEAS_DETAILS} from '@/constants'

const route = useRoute()
const ideaId = Number(route.params.id)

const item = reactive({})

onMounted(async () => {
    const res = await axiosClient.get(URL_GET_IDEAS_DETAILS + ideaId + '?include_titles=true&include_questions=true')
      for (const key in res.data) {
        item[key] = res.data[key]
    }

})

</script>
