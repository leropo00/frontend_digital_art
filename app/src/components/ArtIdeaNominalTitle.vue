<template>
    <div v-if="titles.length == 0">
        <div>
            <label for="new-nominal-title" class="block mb-2 text-sm font-semibold text-gray-900">Art Idea Title</label>
            <input type="text" id="new-nominal-title" ref="nominal-title" 
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-indigo-600  focus:border-blue-500 block w-full p-2.5 "  />
        </div>

        <button @click="insertNominalTitle()"
            class="cursor-pointer rounded-md bg-indigo-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create Title
        </button>
    </div>
    <div v-else>
        <div>
            <label for="update-nominal-title" class="block mb-2 text-sm font-semibold text-gray-900">Art Idea Title</label>
            <input id="update-nominal-title" ref="nominal-title" type="text" :disabled="!nominalTitleEdited" :value="titles[0].title_text" 
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-indigo-600  focus:border-blue-500 block w-full p-2.5 "/>
        </div>

        <button @click="modifiyNominalTitle()" v-if="!nominalTitleEdited"
            class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Modify Title
        </button>
        <div v-else class="flex flex-row justify-between">
            <span>
                <button @click="updateNominalTitle()"
                    class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Update Title
                </button>
                <button @click="cancelNominalTitleUpdate()"
                    class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Cancel Title Update
                </button>
            </span>

            <button @click="deleteNominalTitle()"
                class="cursor-pointer rounded-md justify-end bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Delete Title
            </button>
        </div>
    </div>

</template>


<script setup lang="ts">
import axiosClient from '@/axios'
import { ref, useTemplateRef } from 'vue'
import { 
    URL_DELETE_ART_TITLE, 
    URL_UPDATE_ART_TITLE, 
    URL_CREATE_ART_TITLE,
    TITLE_TYPE_NOMINAL, 
} from '@/constants'
import { StatusCodes } from 'http-status-codes';
import { addIdToUrl, replaceUrlIds } from '@/helpers'
const props = defineProps(['artIdeaId', 'titlesData'])
const titles = ref(props.titlesData)

const nominalTitleInput = useTemplateRef('nominal-title')
const nominalTitleEdited = ref(false)

const modifiyNominalTitle = () => {
    nominalTitleEdited.value = true
}

const cancelNominalTitleUpdate = () => {
    nominalTitleEdited.value = false
}



const insertNominalTitle = () => {
    if (nominalTitleInput.value.value.trim().length == 0) {
        // TODO: add error logging here
        return
    }
    axiosClient.post(addIdToUrl(URL_CREATE_ART_TITLE, props.artIdeaId), {
         title_text: nominalTitleInput.value.value.trim(), title_type: TITLE_TYPE_NOMINAL,
    }).then(async (response) => {
        if (response.status === StatusCodes.CREATED) {
            titles.value.push(response.data)
        }
    }).catch((error) => {
        console.log(error)
    })
}

const updateNominalTitle = () => {
    axiosClient.patch(replaceUrlIds(URL_UPDATE_ART_TITLE, props.artIdeaId,  titles.value[0].id), {
         title_text: nominalTitleInput.value.value.trim(),
    }).then(async (response) => {
        if (response.status === StatusCodes.OK) {
            titles.value[0] = response.data
            cancelNominalTitleUpdate()
        }
    }).catch((error) => {
        console.log(error)
    })
}

const deleteNominalTitle = () => {
    axiosClient.delete(replaceUrlIds(URL_DELETE_ART_TITLE, props.artIdeaId,  titles.value[0].id)
    ).then(async (response) => {
        if (response.status === StatusCodes.NO_CONTENT) {
            titles.value = []
            cancelNominalTitleUpdate()
        }
    }).catch((error) => {
        console.log(error)
    })
}

</script>
