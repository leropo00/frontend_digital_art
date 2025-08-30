<template>
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
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import { StatusCodes } from 'http-status-codes';
import { addIdToUrl, replaceUrlIds } from '@/helpers'
import axiosClient from '@/axios'
import { 
    URL_CREATE_ART_QUESTION, 
    URL_UPDATE_ART_QUESTION, 
} from '@/constants'


const props = defineProps(['artIdeaId', 'questionsData'])

const questions = ref(props.questionsData)

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

    axiosClient.post(addIdToUrl(URL_CREATE_ART_QUESTION, props.artIdeaId), { 
        question_text: questionData.question_text
     }).then(async (response) => {
        if (response.status === StatusCodes.CREATED) {
            revertQuestionData()
            questions.value.push(response.data)
        }
    }).catch((error) => {
        console.log(error)
    })
}

const updateQuestion = () => {
    axiosClient.patch(replaceUrlIds(URL_UPDATE_ART_QUESTION, props.artIdeaId, questionData.question_id), {
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
