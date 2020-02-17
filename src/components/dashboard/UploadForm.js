import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { setAlert } from '../../redux/actions/alert';
import {
  uploadImage,
  editModeOff,
  hashtagsOptionsPromise
} from '../../redux/actions/image';
// React - Select
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { components } from 'react-select';
const { Option } = components;

const UploadForm = ({ image, setAlert, uploadImage, history, editModeOff }) => {
  const [formData, setFormData] = useState({
    category: null,
    description: '',
    selectedFiles: [],
    selectedHashtags: [],
    hashtagSearchPlaceholder: 'האשטאגים'
  });

  let { category, hashtags, description, selectedFiles } = formData;
  let submitButtons;
  let defaultCategoryValue = image.edit ? image.post.postCategory : false;
  let defaultHashtagsValue = image.edit
    ? image.post.postHashtags.map(tag => ({
        label: tag,
        value: tag
      }))
    : false;

  let selectableHashtags = image.hashtags.map(tag => ({
    value: tag.name,
    label: tag.name
  }));

  // Custom Option (with hashtag)
  const HashOption = props => <Option {...props}>#{props.data.label}</Option>;

  useEffect(() => {
    if (image.edit) {
      setFormData({
        ...formData,
        category: image.post.postCategory,
        description: image.post.postDescription,
        selectedHashtags: defaultHashtagsValue
      });
    }
  }, []);

  if (!image.edit) {
    submitButtons = (
      <div className='submit-btns'>
        <Link className='btn btn-light my-1' to='/hub/gallery/main'>
          חזור
        </Link>
        <input type='submit' className='btn btn-success my-1' value='העלה' />
      </div>
    );
  } else {
    submitButtons = (
      <div className='submit-btns'>
        <button className='btn btn-light my-1' onClick={editModeOff}>
          ביטול
        </button>
        <input type='submit' className='btn btn-success my-1' value='ערוך' />
      </div>
    );
  }

  const uniqueArray = array => {
    return Array.from(new Set(array));
  };

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = newValue => {
    setFormData({
      ...formData,
      category: newValue
    });
  };

  const handleFilesChange = e => {
    setFormData({
      ...formData,
      selectedFiles: e.target.files
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (category === null) {
      setAlert('חובה להכניס קטגוריה', 'danger');
      return;
    }

    let hashTagsArr = formData.selectedHashtags.map(tag => tag.value);

    if (!image.edit) {
      const data = new FormData();

      data.append('category', JSON.stringify(formData.category));
      data.append('hashtags', JSON.stringify(hashTagsArr));
      data.append('description', formData.description);

      for (let i = 0; i < formData.selectedFiles.length; i++) {
        data.append('images', formData.selectedFiles[i]);
      }

      uploadImage(data, history);
    } else {
      const data = {
        category: formData.category,
        hashtags: hashTagsArr,
        description: formData.description
      };

      uploadImage(data, history, true, image.post.postId);
    }
  };

  // Merge this into one funcion
  const onHashtagSelectChange = (event, value) => {
    if (value === null || (value.constructor === Array && value.length === 0)) {
      setFormData({
        ...formData,
        selectedHashtags: []
      });
    } else {
      setFormData({
        ...formData,
        selectedHashtags: value
      });
    }
  };

  return (
    <Fragment>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <CreatableSelect
            name='category'
            options={image.categories}
            className='multi-select'
            isRtl={true}
            placeholder='קטגוריה'
            onChange={handleSelectChange}
            // value={image.imageCategory}
            defaultValue={defaultCategoryValue}
            formatCreateLabel={inputeValue => {
              return `צור קטגוריה חדשה: ${inputeValue}`;
            }}
          />
          <small className='form-text'>
            התחל להקליד על מנת ליצור קטגוריה חדשה
          </small>
        </div>

        <div className='form-group'>
          <div>
            <AsyncCreatableSelect
              isMulti
              name='hashtags-select'
              loadOptions={hashtagsOptionsPromise}
              defaultOptions={selectableHashtags}
              className='multi-select'
              isRtl={true}
              placeholder={formData.hashtagSearchPlaceholder}
              components={{ Option: HashOption }}
              loadingMessage={() => 'טוען...'}
              defaultValue={image.edit ? defaultHashtagsValue : false}
              formatCreateLabel={inputeValue => {
                return `צור האשטאג חדש: ${inputeValue}`;
              }}
              onChange={(val, event) => {
                onHashtagSelectChange(event, val);
              }}
              onMenuOpen={() => {
                setFormData({
                  ...formData,
                  hashtagSearchPlaceholder:
                    'התחל לכתוב על מנת לחפש או ליצור חדש'
                });
              }}
              onMenuClose={() => {
                setFormData({
                  ...formData,
                  hashtagSearchPlaceholder: 'האשטאגים'
                });
              }}
              onKeyDown={e => {
                if (e.keyCode === 32) e.preventDefault();
              }}
            />
          </div>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='תיאור'
            name='description'
            value={description}
            onChange={e => onChange(e)}
            required
          >
            שלום
          </textarea>
          <small className='form-text'>
            במקרה של העלאת תמונות מרובה - התיאור ייכתב לכל התמונות
          </small>
        </div>

        {!image.edit && (
          <div className='form-group'>
            {' '}
            <div className='form-group files'>
              {/* <button class='upload-btn'>Upload a file</button> */}
              <input
                name='selectedFiles[]'
                type='file'
                className='form-control'
                multiple
                onChange={handleFilesChange}
                required
              />
            </div>
          </div>
        )}

        {submitButtons}

        {/* <div className='submit-btns'>
          <Link className='btn btn-light my-1' to='/main'>
            חזור
          </Link>
          <input type='submit' className='btn btn-success my-1' value='העלה' />
        </div> */}
      </form>
    </Fragment>
  );
};

UploadForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  image: state.image
});

export default connect(mapStateToProps, { setAlert, uploadImage, editModeOff })(
  withRouter(UploadForm)
);
