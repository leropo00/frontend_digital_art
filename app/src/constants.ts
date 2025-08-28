const ID_PLACEHOLDER  = '{id}'

const URL_GET_IDEAS_LIST = '/art_ideas'
const URL_GET_IDEAS_DETAILS = '/art_ideas/'
const URL_GET_REFERENCE_MATERIAL = "/reference_materials"

const URL_CREATE_ART_IDEA = URL_GET_IDEAS_LIST;
const URL_CREATE_REFERENCE_MATERIAL = URL_GET_REFERENCE_MATERIAL;
const URL_CREATE_ART_QUESTION = URL_CREATE_ART_IDEA + '/' + ID_PLACEHOLDER +'/question';

// types of images, based on definitions on backend
// since these likely won't change
// they are for now hardcoded here
const IDEA_TYPE_IMAGE = "image"
const IDEA_TYPE_IMAGE_TEXT = "image_with_caption"
const IDEA_TYPE_TEXT_ONLY = "caption_only"

const REFERENCE_TYPE_IMAGE = "image";
const REFERENCE_TYPE_TUTORIAL_VIDEO = "tutorial_video";
const REFERENCE_TYPE_TUTORIAL_ARTICLE = "tutorial_article";
const REFERENCE_TYPE_PROMPT = "prompt";

const STORAGE_TYPE_LOCAL_DISK = "local_disk"
const STORAGE_TYPE_URL_LINK = "url_link"

export {
    // urls
    URL_GET_IDEAS_LIST,   
    URL_GET_IDEAS_DETAILS,
    URL_GET_REFERENCE_MATERIAL,
    URL_CREATE_ART_IDEA,
    URL_CREATE_REFERENCE_MATERIAL,
    URL_CREATE_ART_QUESTION,
    // types
    IDEA_TYPE_IMAGE,
    IDEA_TYPE_IMAGE_TEXT,
    IDEA_TYPE_TEXT_ONLY,
    REFERENCE_TYPE_IMAGE, 
    REFERENCE_TYPE_TUTORIAL_VIDEO, 
    REFERENCE_TYPE_TUTORIAL_ARTICLE,
    REFERENCE_TYPE_PROMPT, 
    STORAGE_TYPE_LOCAL_DISK, 
    STORAGE_TYPE_URL_LINK,
    // id
    ID_PLACEHOLDER,
}