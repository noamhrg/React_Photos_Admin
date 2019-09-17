import axios from 'axios';
import { toast } from 'react-toastify';
import {
  UPLOAD_ACTION,
  IMAGE_UPLOADED,
  LIKE_IMAGE,
  IMAGE_ERROR,
  GET_CATEGORIES,
  GET_HASHTAGS,
  DELETE_IMAGE,
  SEARCH_IMAGES,
  SEARCH_FIRE,
  EDIT_MODE,
  EDIT_IMAGE,
  EDIT_MODE_OFF,
  IMAGE_EDITED,
  IMAGES_NOT_FOUND,
  GET_LATEST_POSTS,
  SEARCH_BY_TAG_CLICK,
  SEARCH_CHANGE
} from './types';
import { setAlert } from './alert';

// Upload / Edit images
export const uploadImage = (
  formData,
  history,
  edit = false,
  postId = null
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': edit ? 'application/json' : 'multipart/form-data'
      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      }
    };

    dispatch({
      type: UPLOAD_ACTION
    });

    let res;

    if (!edit) {
      res = await axios.post('/api/posts', formData, config);
    } else {
      res = await axios.put(`/api/posts/${postId}`, formData, config);
    }

    edit ? toast.info('תמונה נערכה !') : toast.success('העלאה הסתיימה !');

    dispatch({
      type: IMAGE_UPLOADED
    });

    if (!edit) {
      history.push('/main');
    } else {
      dispatch({
        type: IMAGE_EDITED,
        payload: res.data
      });
      dispatch({
        type: EDIT_MODE_OFF
      });
      dispatch(getCategories());
      dispatch(getHashtags());
    }
  } catch (err) {
    console.error(err);
  }
};

// Search images
export const searchImages = (
  searchPayload,
  searchBy,
  isTagClick = false
) => async dispatch => {
  try {
    if (isTagClick) {
      const tagClickValue = searchPayload.hashtags[0];

      let tagsDefaultValues = {
        value: tagClickValue,
        label: tagClickValue
      };

      dispatch({
        type: SEARCH_BY_TAG_CLICK,
        payload: tagsDefaultValues
      });
    }

    dispatch({
      type: SEARCH_FIRE
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/posts/search/${searchBy}`,
      searchPayload,
      config
    );

    dispatch({
      type: SEARCH_IMAGES,
      payload: res.data
    });
  } catch (err) {
    if (err.response.status == 404) {
      dispatch({
        type: IMAGES_NOT_FOUND,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
      return;
    }

    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all categories - sorted by popularity
export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/images/category');

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all hashtags - sorted by popularity
export const getHashtags = () => async dispatch => {
  try {
    const res = await axios.get('/api/images/hashtags');

    dispatch({
      type: GET_HASHTAGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Like a post
export const likePost = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    const likedPosts = JSON.parse(localStorage.getItem('liked'));

    if (likedPosts && likedPosts.length > 0) {
      likedPosts.push(postId);
      localStorage.setItem('liked', JSON.stringify(likedPosts));
    } else {
      localStorage.setItem('liked', JSON.stringify([postId]));
    }

    dispatch({
      type: LIKE_IMAGE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete an image
export const deleteImage = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    toast.success('פוסט נמחק !');

    dispatch(getLatestPosts('0'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit mode
export const editMode = postInfo => async dispatch => {
  try {
    let postInfoCopy = { ...postInfo };

    postInfoCopy.postCategory = {
      value: postInfoCopy.postCategory,
      label: postInfoCopy.postCategory
    };

    dispatch({
      type: EDIT_MODE,
      payload: postInfoCopy
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Turn off edit mode
export const editModeOff = () => async dispatch => {
  try {
    dispatch({
      type: EDIT_MODE_OFF
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Submit edit
export const submitEdit = (imageId, formData) => async dispatch => {
  try {
    dispatch(setAlert('פוסט נערך בהצלחה !', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get latest posts
export const getLatestPosts = offSetStart => async dispatch => {
  try {
    dispatch({
      type: SEARCH_FIRE
    });

    let isFirstBatch = offSetStart == 0 ? true : false;

    const res = await axios.get(`/api/posts/auto/${offSetStart}`);

    setTimeout(() => {
      dispatch({
        type: GET_LATEST_POSTS,
        payload: res.data,
        isFirstBatch
      });
    }, 200);
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

const filterHashtagsResponse = (inputValue, hashtagsResponse) => {
  return hashtagsResponse.filter(i =>
    i.value.toLowerCase().includes(inputValue.toLowerCase())
  );
};

export const hashtagsOptionsPromise = async inputValue => {
  try {
    const searchPayload = {
      searchValue: inputValue
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      '/api/images/hashtags/search',
      searchPayload,
      config
    );

    const hashtagsResponse = res.data.map(tag => ({
      label: tag.name,
      value: tag.name
    }));

    return new Promise(resolve => {
      resolve(filterHashtagsResponse(inputValue, hashtagsResponse));
    });
  } catch (err) {
    console.error(err);
  }
};

// Search value changed - reset search value in state
export const searchChange = () => dispatch => {
  try {
    dispatch({
      type: SEARCH_CHANGE
    });
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
