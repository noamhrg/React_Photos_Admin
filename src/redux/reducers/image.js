import {
  UPLOAD_ACTION,
  IMAGE_UPLOADED,
  GET_LATEST_POSTS,
  IMAGE_ERROR,
  GET_CATEGORIES,
  GET_HASHTAGS,
  SEARCH_FIRE,
  SEARCH_IMAGES,
  EDIT_MODE,
  EDIT_MODE_OFF,
  IMAGE_EDITED,
  IMAGES_NOT_FOUND,
  SEARCH_BY_TAG_CLICK,
  SEARCH_CHANGE
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  edit: false,
  categories: [],
  hashtags: [],
  loading: true,
  hasMore: true,
  error: {},
  hashtagsDefaultValue: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LATEST_POSTS:
      let posts;
      let hasMore = payload.length > 0 ? true : false;

      if (action.isFirstBatch) {
        posts = payload;
      } else {
        posts = [...state.posts, ...payload];
      }

      return {
        ...state,
        posts,
        loading: false,
        hasMore,
        hashtagsDefaultValue: null
      };

    // case GET_LATEST_IMAGES:
    //   let images;
    //   let hasMore = payload.length > 0 ? true : false;

    //   if (action.isFirstBatch) {
    //     images = payload;
    //   } else {
    //     images = [...state.images, ...payload];
    //   }

    //   return {
    //     ...state,
    //     images,
    //     loading: false,
    //     hasMore
    //   };
    case SEARCH_FIRE:
      return {
        ...state,
        loading: true
      };
    case SEARCH_CHANGE:
      return {
        ...state,
        hashtagsDefaultValue: null
      };
    case SEARCH_BY_TAG_CLICK:
      return {
        ...state,
        hashtagsDefaultValue: payload
      };
    case SEARCH_IMAGES:
      return {
        ...state,
        posts: payload,
        loading: false,
        hasMore: false
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      };
    case GET_HASHTAGS:
      return {
        ...state,
        hashtags: payload
      };
    case UPLOAD_ACTION:
      return {
        ...state,
        loading: true
      };
    case IMAGE_UPLOADED:
      return {
        ...state,
        loading: false,
        hasMore: true
      };
    case IMAGE_EDITED:
      let postId = payload._id;

      let newArr = state.posts.map((post, index) => {
        if (post._id == postId) {
          post = payload;
        }
        return post;
      });
      return {
        ...state,
        posts: newArr,
        edit: false,
        post: null,
        loading: false
      };
    case EDIT_MODE:
      return {
        ...state,
        edit: true,
        post: payload
      };
    case EDIT_MODE_OFF:
      return {
        ...state,
        edit: false,
        post: null
      };
    case IMAGES_NOT_FOUND:
      return {
        ...state,
        posts: [],
        error: payload,
        loading: false,
        hasMore: false
      };
    case IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
