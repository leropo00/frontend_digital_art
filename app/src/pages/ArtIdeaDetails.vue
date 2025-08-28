<template>
     <div v-if="item.identifier_name" class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10">
         <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-lg font-bold text-gray-900 bg-gray-300 text-center py-1">
                {{ item.identifier_name }}
            </h2>
            <div class="mt-4 px-6">
                Art idea type: {{ item.idea_type }}

                <div class="border-b border-gray-900/10 pb-2 mt-10" v-if="titleState.single">                

                    <div v-if="titleState.count == 0">
                        <div>
                            <label for="new-nominal-title" class="block mb-2 text-sm font-semibold text-gray-900">Art Idea Title</label>
                            <input type="text" name="new-nominal-title" ref="new-nominal-title"class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-indigo-600  focus:border-blue-500 block w-full p-2.5 "  />
                        </div>

                        <button @click="insertArtNominalTitle()"
                            class="cursor-pointer rounded-md bg-indigo-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Create Title
                        </button>
                    </div>
                    <div v-else>
                        <input type="text" :value="item.titles[0].title_text" />
                    </div>

                </div>
                <div class="border-b border-gray-900/10 pb-2 mt-10" v-else>

                    <h2 class="text-base/7 font-semibold text-gray-900">Titles:</h2>

                    <table class="w-full table-fixed">
                        <thead class="text-lg">
                            <tr class="bg-gray-300">
                                <th class="px-6 py-1">Title</th>
                                <th class="px-6 py-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr v-for="item in item.titles" :key="item.id">
                            <td class="px-6 py-1">
                                {{ item.title_text }}
                            </td>
                            <td class="px-6 py-1">
                                {{ item.id }}
                            </td>
                            </tr>
                        </tbody>
                    </table>

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

                    <div>
                        <textarea name="art-question-text" id="art-question-text" rows="3" 
                            v-model="descriptionInsertedData"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        <button @click="insertArtQuestion()"
                            class="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add
                        </button>
                    </div>
                     <table class="w-full table-fixed">
                        <thead class="text-lg">
                            <tr class="bg-gray-300">
                                <th class="px-6 py-1">Title</th>
                                <th class="px-6 py-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr v-for="item in item.questions" :key="item.id">
                                <td class="px-6 py-1">
                                    {{ item.question_text }}
                                </td>
                                <td class="px-6 py-1">
                                    {{ item.id }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

<script setup lang="ts">import { computed, onMounted, reactive, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import axiosClient from '@/axios'
import { IDEA_TYPE_IMAGE, IDEA_TYPE_IMAGE_TEXT, IDEA_TYPE_TEXT_ONLY, URL_CREATE_ART_QUESTION, URL_CREATE_ART_TITLE, URL_GET_IDEAS_DETAILS, TITLE_TYPE_NOMINAL } from '@/constants'
import { StatusCodes } from 'http-status-codes';
import {addIdToUrl} from '@/helpers'

const route = useRoute()
const artIdeaId = Number(route.params.id)

const newNominalTitleInput = useTemplateRef('new-nominal-title')

const item = reactive({})

// images only have one title
const titleState = computed(() => {
    if (!item.idea_type) {
        return {'single': false, 'count': 0}
    } 
    return {'single': item.idea_type == IDEA_TYPE_IMAGE, 'count': item.titles.length}
})


const descriptionInsertedData = ref('')

const descriptionUpdatedData = ref({
  item_id: null,
  item_name: '',
  quantity: 1,
})

const insertArtQuestion = () => {

    axiosClient.post(addIdToUrl(URL_CREATE_ART_QUESTION, artIdeaId), { 
        question_text: descriptionInsertedData.value
     }).then(async (response) => {
        if (response.status === StatusCodes.CREATED) {
            item.questions.push(response.data)
         }
    }).catch((error) => {
        console.log(error)
    })

    /*
         {
            "id": 9,
            "question_text": "how to solve this",
            "solved_date": null,
        }
    */
}

const insertArtNominalTitle = () => {

    axiosClient.post(addIdToUrl(URL_CREATE_ART_TITLE, artIdeaId), {
         title_text: newNominalTitleInput.value.value, title_type: TITLE_TYPE_NOMINAL,
    }).then(async (response) => {
        if (response.status === StatusCodes.CREATED) {
            item.titles.push(response)
        }
    }).catch((error) => {
        console.log(error)
    })
}

const updateArtNominalTitle = () => {
    
    console.log(newNominalTitleInput)
    console.log(newNominalTitleInput.value.value)
}


const readData = async () => {
    const res = await axiosClient.get(URL_GET_IDEAS_DETAILS + artIdeaId + '?include_titles=true&include_questions=true')
    // TODO: does it make sense to split reactive state in multiple values,
    //  since titles and questions are in separate tables and will be updates separately
    for (const key in res.data) {
        item[key] = res.data[key]
    }
}

onMounted(async () => {
    await readData()
})

</script>
