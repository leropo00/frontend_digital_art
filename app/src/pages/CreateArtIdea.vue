<template>
    <div class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10 space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-lg font-bold text-gray-900 bg-gray-300 text-center py-1">Create a new Art Idea</h2>
        <div class="mt-4 px-6">
          <div class="sm:col-span-4">
            <label for="art-idea-identifier" class="block text-sm/6 font-medium text-gray-900">Art Idea Identifier:</label>
            <div class="mt-2">
              <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input type="text" name="art-idea-identifier" id="art-idea-identifier"
                  v-model="artIdeaData.identifier_name"
                  class="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Unique simple identifier" />
              </div>
            </div>
            <p class="mt-3 text-sm/6 text-gray-600">Unique identifier of the idea, this is more akin to project name, than to actual title, should be globally unique. Can't be changed after creation.</p>
          </div>

          <div class="mt-10">
             <fieldset>
                <legend class="text-sm/6 font-semibold text-gray-900">Art idea type</legend>
                <p class="mt-1 text-sm/6 text-gray-600">One of 3 possible idea type, can't be changed after creation.</p>
                
                <div class="mt-6 space-y-4">
                <div class="flex items-center gap-x-3">
                    <input id="art-idea-type-image" name="art-idea-type" type="radio" 
                        :value="IDEA_TYPE_IMAGE" v-model="artIdeaData.idea_type"
                        class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                    <label for="art-idea-type-image" class="block text-sm/6 font-medium text-gray-900">IMAGE</label>
                </div>
                <div class="flex items-center gap-x-3">
                    <input id="art-idea-type-image-text" name="art-idea-type" type="radio" 
                        :value="IDEA_TYPE_IMAGE_TEXT" v-model="artIdeaData.idea_type"
                        class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                    <label for="art-idea-type-image-text" class="block text-sm/6 font-medium text-gray-900">IMAGE WITH TEXT</label>
                </div>
                <div class="flex items-center gap-x-3">
                    <input id="art-idea-type-text-only" name="art-idea-type" type="radio"
                        :value="IDEA_TYPE_TEXT_ONLY" v-model="artIdeaData.idea_type"
                        class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                    <label for="art-idea-type-text-only" class="block text-sm/6 font-medium text-gray-900">TEXT ONLY</label>
                </div>
                </div>
            </fieldset>
          </div>

          
          <div class="border-b border-gray-900/10 pb-12 mt-10">
            <h2 class="text-base/7 font-semibold text-gray-900">Idea Description:</h2>
            <p class="mt-1 text-sm/6 text-gray-600">Describe the image, one of the descriptions fields should be filled in.</p>

            <div class="col-span-full mt-4">
                <label for="intial_idea" class="block text-sm/6 font-medium text-gray-900">Inital Idea:</label>
                <div class="mt-2">
                <textarea name="intial-idea" id="intial-idea" rows="3" 
                  v-model="artIdeaData.initial_idea"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                <p class="mt-3 text-sm/6 text-gray-600">Describe the initial idea about artwork, if you are not yet decided.</p>
            </div>

            <div class="col-span-full mt-4">
                <label for="final-description" class="block text-sm/6 font-medium text-gray-900">Final Description:</label>
                <div class="mt-2">
                <textarea name="final-description" id="final-description" rows="3" 
                  v-model="artIdeaData.final_description"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
                <p class="mt-3 text-sm/6 text-gray-600">Describe final composition of the image that will be used for generation,</p>
            </div>
          </div>

          <div class="col-span-full">
            <div class="mt-6 space-y-6">
                <div class="flex gap-3">
                    <div class="flex h-6 shrink-0 items-center">
                    <div class="group grid size-4 grid-cols-1">
                        <input id="redirect-after-creation"  name="redirect-after-creation" type="checkbox" 
                          v-model="redirectAfterCreation"
                          class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                        <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                        <path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path class="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    </div>
                    <div class="text-sm/6">
                    <label for="redirect-after-creation" class="font-medium text-gray-900">Redirect after creation</label>
                    <p id="comments-description" class="text-gray-500">Redirect to idea page when creating the idea,
                             don't use if you would like to create multiple ideas one after another.</p>
                    </div>
                </div>
            </div>
          </div>

          <div class="col-span-full">
              <div class="mt-6 flex items-center justify-start gap-x-6">
                <button type="submit" @click="createArtIdea()"
                     class="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Create Art Idea
                </button>
              </div>
          </div>
        </div>
      </div>

    </div>



</template>


<script setup lang="ts">
import { IDEA_TYPE_IMAGE, IDEA_TYPE_IMAGE_TEXT, IDEA_TYPE_TEXT_ONLY, URL_CREATE_ART_IDEA } from '@/constants'
import { ref, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import axiosClient from '@/axios.js'
import { StatusCodes } from 'http-status-codes';

const artIdeaData = reactive({
  identifier_name: '',
  initial_idea: '',
  final_description: '',
  idea_type: null, 
})
const redirectAfterCreation = ref(false)
const router = useRouter()

function createArtIdea() {
  axiosClient.post(URL_CREATE_ART_IDEA, toRaw(artIdeaData))
  .then(async (response) => {    
    if (response.status === StatusCodes.CREATED && redirectAfterCreation.value) {
      router.push(`/art_idea/${response.data.id}`)
    }
  })
  .catch((error) => {
     console.log(error)
  })
}

</script>
