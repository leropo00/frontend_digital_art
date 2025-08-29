import {ID_PLACEHOLDER} from '@/constants'

const addIdToUrl = (url: string, id: number|string): string => {
    return url.replace(ID_PLACEHOLDER, id.toString())
}

const replaceUrlIds = (url: string, ...ids: number[]|string[]): string => {    
   let currentUrl = url;
   for (const id of ids) {
        // this works .replace only changes the first occurence
        currentUrl = currentUrl.replace(ID_PLACEHOLDER, id.toString())
    }
    return currentUrl;
}

export {addIdToUrl, replaceUrlIds}