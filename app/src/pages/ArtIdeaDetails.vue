<template>
     <div v-if="item.identifier_name" class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10">
         <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-lg font-bold text-gray-900 bg-gray-300 text-center py-1">
                {{ item.identifier_name }}
            </h2>
            <div class="mt-4 px-6">
                Art idea type: {{ item.idea_type }}
                
                <div class="border-b border-gray-900/10 pb-2 mt-10" v-if="fetchedData">  
                     <ArtIdeaNominalTitle v-if="item.idea_type == IDEA_TYPE_IMAGE" :artIdeaId="artIdeaId" :titlesData="titlesData" />
                     <ArtIdeaMultipleTitles v-if="item.idea_type != IDEA_TYPE_IMAGE" :artIdeaId="artIdeaId" :titlesData="titlesData" />
                </div>

                <div class="border-b border-gray-900/10 pb-2 mt-10">
                    <h2 class="text-base/7 font-semibold text-gray-900">Idea Description:</h2>

                    <div class="col-span-full mt-4">
                        <label for="intial_idea" class="block text-sm/6 font-medium text-gray-900">Inital Idea:</label>
                        <div class="mt-2">
                        <textarea name="intial-idea" id="intial-idea" rows="3" 
                            ref="initial-idea-text" 
                            :disabled="!ideaDescriptionEdited"
                            :value="item.initial_idea"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="col-span-full mt-4">
                        <label for="final-description" class="block text-sm/6 font-medium text-gray-900">Final Description:</label>
                        <div class="mt-2">
                        <textarea name="final-description" id="final-description" rows="3" 
                            ref="final-description-text" 
                            :disabled="!ideaDescriptionEdited"
                            :value="item.final_description"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <button @click="modifiyIdeaDescriptions()" v-if="!ideaDescriptionEdited"
                        class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Modify Description
                    </button>
                    <div v-else class="flex flex-row justify-between">
                        <span>
                            <button @click="updateIdeaDescriptions()"
                                class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Update Description
                            </button>
                            <button @click="cancelIdeaDescriptionsUpdate()"
                                class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Cancel Description Update
                            </button>
                        </span>
                    </div>
                </div>
                <div class="border-b border-gray-900/10 pb-2 mt-10">
                     <ArtIdeaQuestions v-if="fetchedData" :artIdeaId="artIdeaId" :questionsData="questionsData" />
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

<script setup lang="ts">
import { computed, onMounted, ref, reactive, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import axiosClient from '@/axios'
import { IDEA_TYPE_IMAGE, 
    URL_UPDATE_ART_IDEA,
    URL_GET_IDEAS_DETAILS, 
} from '@/constants'
import { StatusCodes } from 'http-status-codes';
import { addIdToUrl } from '@/helpers'

import ArtIdeaQuestions from '@/components/ArtIdeaQuestions.vue'
import ArtIdeaNominalTitle from '@/components/ArtIdeaNominalTitle.vue'
import ArtIdeaMultipleTitles from '@/components/ArtIdeaMultipleTitles.vue'

const route = useRoute()
const artIdeaId = Number(route.params.id)
const ideaDescriptionEdited = ref(false)

const item = reactive({})
const fetchedData = ref(false)

let questionsData = null
let titlesData = null

const readData = async () => {
    const res = await axiosClient.get(URL_GET_IDEAS_DETAILS + artIdeaId + '?include_titles=true&include_questions=true')
    // TODO check if sucessfull 
    for (const key in res.data) {
        console.log(key)
        if(key == 'questions') {
            questionsData = res.data[key]
        } 
        else if (key == 'titles') {
            titlesData = res.data[key]
        }
        else {
            item[key] = res.data[key]
        }
    }

    fetchedData.value = true
}

onMounted(async () => {
    await readData()
})

// here are input references and update functions
// descriptions
const intialIdeaInput = useTemplateRef('initial-idea-text')
const finalDescriptionInput = useTemplateRef('final-description-text')

const modifiyIdeaDescriptions = () => {
    ideaDescriptionEdited.value = true
}

const cancelIdeaDescriptionsUpdate = () => {
    ideaDescriptionEdited.value = false

}
function updateIdeaDescriptions() {
    const inital_idea = intialIdeaInput.value.value.trim()
    const final_description = finalDescriptionInput.value.value.trim()

    axiosClient.patch(addIdToUrl(URL_UPDATE_ART_IDEA, artIdeaId), {
         initial_idea: inital_idea, final_description: final_description
    }).then(async (response) => {
        if (response.status === StatusCodes.OK) {
            item.initial_idea = response.data.initial_idea
            item.final_description = response.data.final_description
            cancelIdeaDescriptionsUpdate()
        }
    }).catch((error) => {
        console.log(error)
    })
}

</script>
