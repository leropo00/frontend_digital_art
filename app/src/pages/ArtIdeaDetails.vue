<template>
     <div v-if="item.identifier_name" class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10">
         <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-lg font-bold text-gray-900 bg-gray-300 text-center py-1">
                {{ item.identifier_name }}
            </h2>
            <div class="mt-4 px-6">
                Art idea type: {{ item.idea_type }}
                
                <div class="border-b border-gray-900/10 pb-2 mt-10" v-if="isNominalTitle">                
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
                </div>
                <div class="border-b border-gray-900/10 pb-2 mt-10" v-else>
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

                    <div class="flex flex-row flex-start">
                        <button @click="updateIdeaDescriptions()"
                            class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Update Description
                        </button>
                        <button @click="revertIdeaDescriptions()"
                            class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Revert Values
                        </button>
                    </div>
                </div>
                <div class="border-b border-gray-900/10 pb-2 mt-10">
                    <h2 class="text-base/7 font-semibold text-gray-900">Idea Questions:</h2>
                    <div>
                        <textarea name="art-question-text" id="art-question-text" rows="3" 
                            v-model="questionData.question_text"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        <button @click="insertQuestion()" v-if="questionData.question_id == null"
                            class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Create Question
                        </button>
                        <span v-else>
                        <button @click="updateQuestion()"
                            class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Update Question
                        </button>
                        <button @click="revertQuestionData()"
                            class="cursor-pointer rounded-md bg-indigo-600 mt-4 mx-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Cancel Update
                        </button>
                        </span>
                    </div>
                     <table class="w-full table-fixed mt-2">
                        <thead class="text-lg">
                            <tr class="bg-gray-300">
                                <th class="px-6 py-1">Title</th>
                                <th class="px-6 py-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <tr v-for="item in questions" :key="item.id" :class="{'bg-indigo-300': questionData.question_id == item.id}" >
                                <td class="px-6 py-1">
                                    {{ item.question_text }}
                                </td>
                                <td class="px-6 py-1">                                    
                                    <button @click="editQuestion(item.id)"
                                        class="cursor-pointer rounded-md bg-indigo-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Edit question
                                    </button>
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

<script setup lang="ts">import { computed, onMounted, ref, reactive, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import axiosClient from '@/axios'
import { IDEA_TYPE_IMAGE, 
    IDEA_TYPE_IMAGE_TEXT, 
    IDEA_TYPE_TEXT_ONLY, 
    URL_CREATE_ART_QUESTION, 
    URL_DELETE_ART_TITLE, 
    URL_UPDATE_ART_QUESTION, 
    URL_UPDATE_ART_TITLE, 
    URL_SET_TITLE_PRIMARY, 
    URL_CREATE_ART_TITLE,
    URL_GET_IDEAS_DETAILS, 
    TITLE_TYPE_NOMINAL, 
    TITLE_TYPE_PRIMARY, 
    TITLE_TYPE_ALTERNATIVE,
} from '@/constants'
import { StatusCodes } from 'http-status-codes';
import { addIdToUrl, replaceUrlIds } from '@/helpers'

const route = useRoute()
const artIdeaId = Number(route.params.id)

const item = reactive({})
const questions = ref([])
const titles = ref([])

const isNominalTitle = computed(() => {
    if (!item.idea_type) {
        return true
    }
    return item.idea_type == IDEA_TYPE_IMAGE
})


const readData = async () => {
    const res = await axiosClient.get(URL_GET_IDEAS_DETAILS + artIdeaId + '?include_titles=true&include_questions=true')
    // TODO: does it make sense to split reactive state in multiple values,
    //  since titles and questions are in separate tables and will be updates separately
    for (const key in res.data) {
        console.log(key)
        if(key == 'questions') {
            questions.value = res.data[key]
        } 
        else if (key == 'titles') {
            titles.value = res.data[key]
        }
        else {
            item[key] = res.data[key]
        }
    }
}

onMounted(async () => {
    await readData()
})

// here are input references and update functions
// descriptions

function updateIdeaDescriptions() {

    //@router.patch(
    //    "/{art_idea_id}/questions/{question_id}",

}
function revertIdeaDescriptions() {
    // revert back descriptions to the values
    // if this will be reactive how will you change this
}

// nominal only
// why was template ref used here, should both types have reactive
const nominalTitleInput = useTemplateRef('nominal-title')

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
    axiosClient.post(addIdToUrl(URL_CREATE_ART_TITLE, artIdeaId), {
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
    axiosClient.patch(replaceUrlIds(URL_UPDATE_ART_TITLE, artIdeaId,  titles.value[0].id), {
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
    axiosClient.delete(replaceUrlIds(URL_DELETE_ART_TITLE, artIdeaId,  titles.value[0].id)
    ).then(async (response) => {
        if (response.status === StatusCodes.NO_CONTENT) {
            titles.value = []
            cancelNominalTitleUpdate()
        }
    }).catch((error) => {
        console.log(error)
    })
}

function createIdeaTitle() {
    axiosClient.post(addIdToUrl(URL_CREATE_ART_TITLE, artIdeaId), {
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
    axiosClient.patch(replaceUrlIds(URL_UPDATE_ART_TITLE, artIdeaId, titleData.title_id), {
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
    axiosClient.put(replaceUrlIds(URL_SET_TITLE_PRIMARY, artIdeaId, title_id), {
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

    axiosClient.delete(replaceUrlIds(URL_DELETE_ART_TITLE, artIdeaId,  title_id)
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

// questions
interface Question {
  question_text: string
  question_id: number|null
}

const questionData = reactive<Question>({
  question_id: null,
  question_text: '',
})

const insertQuestion = () => {

    if (questionData.question_text.length == 0) {
        // TODO add validation
        return
    }

    axiosClient.post(addIdToUrl(URL_CREATE_ART_QUESTION, artIdeaId), { 
        question_text: questionData.question_text
     }).then(async (response) => {
        if (response.status === StatusCodes.CREATED) {
            questions.value.push(response.data)
            revertQuestionData()
         }
    }).catch((error) => {
        console.log(error)
    })
}

const updateQuestion = () => {
    axiosClient.patch(replaceUrlIds(URL_UPDATE_ART_QUESTION, artIdeaId, questionData.question_id), {
        question_text: questionData.question_text
    }).then(async (response) => {
        if (response.status === StatusCodes.OK) {
            const index = questions.value.findIndex(question => question.id == questionData.question_id)
            if (index >= 0) {
                questions.value[index] = response.data
            }
            revertQuestionData()
        }
    }).catch((error) => {
        console.log(error)
    })
}

const revertQuestionData = () => {
    questionData.question_id = null
    questionData.question_text = ''
}

const editQuestion = (question_id) => {
    const res = questions.value.filter(question => question.id == question_id)
    if (res.length == 0) {
        return
    }
    questionData.question_id = question_id
    questionData.question_text = res[0].question_text
}

</script>
