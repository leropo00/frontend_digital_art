import {ID_PLACEHOLDER} from '@/constants'

const addIdToUrl = (url: string, id: number|string) => {
    return url.replace(ID_PLACEHOLDER, id.toString())
}

export {addIdToUrl}