<template>
    <h2 class="text-base/7 font-semibold text-gray-900">Titles:</h2>
    <table class="w-full table-fixed">
        <thead class="text-lg">
            <tr class="bg-gray-300">
                <th class="px-6 py-1">Title</th>
                <th class="px-6 py-1">Actions</th>
            </tr>
            <tr class="bg-gray-300">
                <th class="px-6 py-1">
                    <input type="text" v-model="titleData.title_text" 
                            class="w-full bg-white" :class="{'invisible': titleData.title_id != null}"/> 
                </th>
                <th class="px-6 py-1">
                    <button @click="createIdeaTitle()"  :class="{'invisible': titleData.title_id != null}"
                        class="cursor-pointer rounded-md justify-end bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Create Idea Title
                    </button>
                </th>
            </tr>
        </thead>
        <tbody class="bg-white">
            <tr v-for="item in titles" :key="item.id">
                <td class="px-6 py-1" v-if="titleData.title_id != item.id">
                    {{ item.title_text }}
                </td>
                <td class="px-6 py-1" v-if="titleData.title_id != item.id">
                    <button @click="modifyArtTitle(item.id)" class="cursor-pointer rounded-md justify-end bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Edit Title
                    </button>
                    <button @click="setTitleAsPrimary(item.id)"
                        v-if="item.title_type == TITLE_TYPE_ALTERNATIVE"
                        class="cursor-pointer rounded-md justify-end bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Set as primary
                    </button>
                    <button @click="deleteIdeaTitle(item.id)"
                        v-if="item.title_type == TITLE_TYPE_ALTERNATIVE"
                        class="cursor-pointer rounded-md justify-end bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Delete Title
                    </button>                                    
                </td>

                <td class="px-6 py-1" v-if="titleData.title_id == item.id">
                    <input type="text"  v-model="titleData.title_text" 
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-indigo-600  focus:border-blue-500 block w-full p-2.5 "  />
                </td>
                <td class="px-6 py-1" v-if="titleData.title_id == item.id">
                    <button @click="updateIdeaTitle()"
                        class="cursor-pointer rounded-md justify-end bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Update Title
                    </button>
                    <button @click="cancelIdeaTitleUpdate()" class="cursor-pointer rounded-md justify-end bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cancel Update
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

</template>


<script setup lang="ts">
import axiosClient from '@/axios'
import { ref, reactive } from 'vue'
import { 
    TITLE_TYPE_ALTERNATIVE, 
    TITLE_TYPE_PRIMARY, 
    URL_SET_TITLE_PRIMARY, 
    URL_CREATE_ART_TITLE,
    URL_DELETE_ART_TITLE, 
    URL_UPDATE_ART_TITLE, 
} from '@/constants'
import { StatusCodes } from 'http-status-codes';
import { addIdToUrl, replaceUrlIds } from '@/helpers'

const props = defineProps(['artIdeaId', 'titlesData'])
const titles = ref(props.titlesData)



// this will be used for table editing, should these two be joined
// title
interface Title {
  title_id: number|null
  title_text: string
}

// why use this for title input
const titleData = reactive<Title>({
  title_id: null,
  title_text: '',
})


function createIdeaTitle() {
    axiosClient.post(addIdToUrl(URL_CREATE_ART_TITLE, props.artIdeaId), {
         title_text: titleData.title_text.trim(), title_type: titles.value.length == 0 ? TITLE_TYPE_PRIMARY: TITLE_TYPE_ALTERNATIVE,
    }).then(async (response) => {
        if (response.status === StatusCodes.CREATED) {
            titles.value.push(response.data)
            titleData.title_text = ''
        }
    }).catch((error) => {
        console.log(error)
    })
}

function modifyArtTitle(title_id) {
    const index = titles.value.findIndex(title => title.id == title_id)
    if (index >= 0) {
        titleData.title_id = title_id
        titleData.title_text = titles.value[index].title_text
    }
}

function cancelIdeaTitleUpdate() {
    titleData.title_id = null
    titleData.title_text = ''
}



function updateIdeaTitle() {
    axiosClient.patch(replaceUrlIds(URL_UPDATE_ART_TITLE, props.artIdeaId, titleData.title_id), {
         title_text: titleData.title_text,
    }).then(async (response) => {
        if (response.status === StatusCodes.OK) {
            const index = titles.value.findIndex(title => title.id == titleData.title_id)
            if (index >= 0) {
                titles.value[index] = response.data
            }
            titleData.title_text = ''
            titleData.title_id = null
        }
    }).catch((error) => {
        console.log(error)
    })
}

function setTitleAsPrimary(title_id) {
    axiosClient.put(replaceUrlIds(URL_SET_TITLE_PRIMARY, props.artIdeaId, title_id), {
         title_text: titleData.title_text,
    }).then(async (response) => {
        if (response.status === StatusCodes.OK) {
            for (const title of titles.value) {
                title.title_type = TITLE_TYPE_ALTERNATIVE
            }
            const index = titles.value.findIndex(title => title.id == title_id)
            if (index >= 0) {
                titles.value[index].title_type = TITLE_TYPE_PRIMARY
            }
            titleData.title_text = ''
            titleData.title_id = null
        }
    }).catch((error) => {
        console.log(error)
    })
}

const deleteIdeaTitle = (title_id) => {
    // TODO need to add controls to delete primary idea title
    // only alternative title deletes are allowed

    // add confirmation for delete

    axiosClient.delete(replaceUrlIds(URL_DELETE_ART_TITLE, props.artIdeaId,  title_id)
    ).then(async (response) => {
        if (response.status === StatusCodes.NO_CONTENT) {
            const index = titles.value.findIndex(title => title.id == title_id)
            if (index >= 0) {
                titles.value.splice(index, 1)
            }
        }
    }).catch((error) => {
        console.log(error)
    })
}

</script>
