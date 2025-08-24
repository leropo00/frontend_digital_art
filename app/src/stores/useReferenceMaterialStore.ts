import { defineStore } from 'pinia'
import axiosClient from '../axios.ts'
import { URL_GET_REFERENCE_MATERIAL } from '../constants.ts'

const useReferenceMaterialStore = defineStore('referenceMaterial', {
  state: () => ({
    data: [],
  }),
  actions: {
    async fetchList() {
      return axiosClient.get(URL_GET_REFERENCE_MATERIAL).then(({ data }) => {
        this.data = data
      })
    },
    clearList() {
      this.data = []
    },
  },
})

export default useReferenceMaterialStore
