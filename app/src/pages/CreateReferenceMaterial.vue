<template>
    <div class="shadow-lg rounded-lg overflow-hidden m-4 md:m-10 space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-lg font-bold text-gray-900 bg-gray-300 text-center py-1">Create a new Reference material</h2>
        <div class="mt-4 px-6">
          <div>
            <legend class="text-sm/6 font-semibold text-gray-900">Reference material type</legend>
            <p class="mt-1 text-sm/6 text-gray-600">Select what type of reference material is this.</p>

                <div class="mt-6 space-y-4">
                    <div class="flex items-center gap-x-3">
                        <input id="reference-material-type-image" name="reference-material-type" type="radio" 
                            :value="REFERENCE_TYPE_IMAGE" v-model="referenceMaterialData.reference_material_type" 
                            class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                        <label for="reference-material-type-image" class="block text-sm/6 font-medium text-gray-900">IMAGE</label>
                    </div>
                    <div class="flex items-center gap-x-3">
                        <input id="reference-material-type-image-text" name="reference-material-type" type="radio" 
                            :value="REFERENCE_TYPE_TUTORIAL_VIDEO" v-model="referenceMaterialData.reference_material_type"
                            class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                        <label for="reference-material-type-image-text" class="block text-sm/6 font-medium text-gray-900">TUTORIAL IN VIDEO</label>
                    </div>
                    <div class="flex items-center gap-x-3">
                        <input id="reference-material-type-text-only" name="reference-material-type" type="radio"
                            :value="REFERENCE_TYPE_TUTORIAL_ARTICLE" v-model="referenceMaterialData.reference_material_type"
                            class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                        <label for="reference-material-type-text-only" class="block text-sm/6 font-medium text-gray-900">TUTORIAL ARTICLE (text)</label>
                    </div>
                    <div class="flex items-center gap-x-3">
                        <input id="reference-material-type-text-only" name="reference-material-type" type="radio"
                            :value="REFERENCE_TYPE_PROMPT" v-model="referenceMaterialData.reference_material_type"
                            class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                        <label for="reference-material-type-text-only" class="block text-sm/6 font-medium text-gray-900">PROMPT</label>
                    </div>
                </div>
            </div>

			TODO: add tags for reference materials

            <div class="mt-10">
                <div class="col-span-full mt-4">
                    <label for="final-description" class="block text-sm/6 font-medium text-gray-900">Reference material description:</label>
                    <div class="mt-2">
                    <textarea name="final-description" id="final-description" rows="3" 
                        v-model="referenceMaterialData.description"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="mt-3 text-sm/6 text-gray-600">Description of what this reference material is.</p>
                </div>
            </div>

            <div class="mt-10">
                Storage References
                <table class="w-full">
                    <thead class="bg-gray-300">
                        <tr> 
                            <th>Type</th>
                            <th>Link</th>
                            <th></th>
                        </tr>
                        <tr> 
                            <th>
                                <select class="bg-white" v-model="editableStorageData.storage_type">
                                    <option 
                                        v-for="option in valuesStorageType" 
                                        :key="option.value" 
                                        :value="option.value">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </th>
                            <th>
                                <input type ="text" class="bg-white" v-model="editableStorageData.storage_link" />
                            </th>
                            <th>
                                <button @click="insertStorageUrlRow()"
                                    class="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Add
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in referenceMaterialData.storage" :key="index">
                            <td>
                                {{ item.storage_type }}
                            </td>
                            <td>
                                {{ item.storage_link }}
                            </td>
                             <td>
                                <button @click="removeStorageUrlRow(index)">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-10">
                <div class="col-span-full">
                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel, TODO does this make sense</button>
                    <button type="submit" @click="createReferenceMaterial()"
                        class="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Create Reference Material
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script setup lang="ts">
import {
    URL_CREATE_REFERENCE_MATERIAL,
    REFERENCE_TYPE_IMAGE, 
    REFERENCE_TYPE_TUTORIAL_VIDEO,
    REFERENCE_TYPE_TUTORIAL_ARTICLE ,
    REFERENCE_TYPE_PROMPT,
    STORAGE_TYPE_LOCAL_DISK,
    STORAGE_TYPE_URL_LINK,
} from '@/constants'
import { reactive, toRaw } from 'vue'
import axiosClient from '@/axios.js'
import { StatusCodes } from 'http-status-codes';

// 'https://www.reddit.com/r/Art/comments/1myzdh4/rust_blazeismyfirstname_ink_2025/'

const valuesStorageType = [
    {
        'value': STORAGE_TYPE_URL_LINK,
        'label': 'Url Link',
    },
    {
        'value': STORAGE_TYPE_LOCAL_DISK,
        'label': 'Local Disk',
    },
]

const referenceMaterialData = reactive({
  reference_material_type: '',
  description: '',
  storage: [], 
})

const editableStorageData = reactive({
  storage_type: STORAGE_TYPE_URL_LINK,
  storage_link: '',
})

function insertStorageUrlRow() {
    referenceMaterialData.storage.push({
            'storage_type': editableStorageData.storage_type,
            'storage_link': editableStorageData.storage_link,
        })
    editableStorageData.storage_link = '' 
}

function removeStorageUrlRow(index) {
    referenceMaterialData.storage.splice(index, 1)
}

function createReferenceMaterial() {
  axiosClient.post(URL_CREATE_REFERENCE_MATERIAL, toRaw(referenceMaterialData))
  .then(async (response) => {
        if (response.status === StatusCodes.CREATED) {
            referenceMaterialData.reference_material_type = ''
            referenceMaterialData.description = ''
            referenceMaterialData.storage = []
        }
  })
  .catch((error) => {
     console.log(error)
  })

}


</script>
