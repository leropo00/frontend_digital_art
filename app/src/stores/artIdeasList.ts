import { defineStore } from 'pinia'
import axiosClient from '../axios'
import { URL_GET_IDEAS_LIST } from '../constants.ts'

const useArtIdeasList = defineStore('artIdeasList', {
  state: () => ({
    data: [],
  }),
  actions: {
    async fetchList() {
      return axiosClient.get(URL_GET_IDEAS_LIST).then(({ data }) => {
        this.data = data
      })
    },
    clearList() {
      this.data = []
    },
  },
})

export default useArtIdeasList
