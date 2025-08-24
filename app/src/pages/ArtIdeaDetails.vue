<template>
    details for item with id {{ item }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axiosClient from '../axios'
import {URL_GET_IDEAS_DETAILS} from '../constants'

const route = useRoute()
const ideaId = Number(route.params.id)

const item = ref(null)

onMounted(async () => {
    const res = await axiosClient.get(URL_GET_IDEAS_DETAILS + ideaId)
    item.value = res.data
})

</script>
