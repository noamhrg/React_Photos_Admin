import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
// Material
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { searchImages, searchChange } from '../../redux/actions/image';

// react-select
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
const { Option } = components;

// <Select /> style
const selectStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: 'black',
      fontWeight: '700'
    };
  },
  menu: styles => ({
    ...styles,
    zIndex: '5000'
  }),
  multiValue: styles => {
    return {
      ...styles
      // ':before': color.alpha(0.1).css()
    };
  }
};

// Material style
const useStyles = makeStyles(theme => ({
  toolBar: {
    marginRight: '100px',
    [theme.breakpoints.down(1200)]: {
      // Continue HERE - Modify search to work.
      // On small screen - when picture name is long - it hides. need to wrap text
      display: 'block',
      marginRight: 'unset'
    }
  },
  appBar: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    opacity: '0.9'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    color: 'white',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      // marginLeft: theme.spacing(1),
      width: '100%',
      display: 'block'
    }
  },
  searchIcon: {
    // width: theme.spacing(7),
    // height: '100%',
    // position: 'absolute',
    // left: '0',
    // pointerEvents: 'none',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
    color: 'white'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  select: {
    marginLeft: '10px',
    minWidth: '250px',
    zIndex: 1000,
    [theme.breakpoints.down(1200)]: {
      width: '75%',
      margin: '5px auto 0 auto'
    },
    [theme.breakpoints.down(700)]: {
      width: '100%',
      marginTop: '8px'
    }
  }
}));

const SearchAppBar = ({
  hashtags,
  categories,
  searchImages,
  searchChange,
  image
}) => {
  const [searchState, setSearchState] = useState({
    category: '',
    selectedHashtags: [],
    searchDisabled: true,
    hashtagSearchPlaceholder: 'האשטאגים'
  });

  let { hashtagsDefaultValue } = image;

  const classes = useStyles();

  // Custom Option (with hashtag)
  const HashOption = props => <Option {...props}>#{props.data.label}</Option>;

  const onSearchChange = (event, value) => {
    // Set local state
    if (event.name === 'category-select') {
      searchChange();
      if (value == null) {
        let searchDisabled =
          searchState.selectedHashtags.length == 0 ? true : false;

        setSearchState({
          ...searchState,
          category: '',
          searchDisabled
        });
      } else {
        setSearchState({
          ...searchState,
          category: value.value,
          searchDisabled: false
        });
      }
    } else {
      // Dispatch to Redux
      searchChange();
      if (
        value === null ||
        (value.constructor === Array && value.length === 0)
      ) {
        let searchDisabled = searchState.category.length == 0 ? true : false;

        setSearchState({
          ...searchState,
          selectedHashtags: [],
          searchDisabled
        });
      } else {
        setSearchState({
          ...searchState,
          selectedHashtags: value,
          searchDisabled: false
        });
      }
    }
  };

  const searchExecution = () => {
    let searchBy;

    if (searchState.category === '') {
      // Search by hashtags
      searchBy = 'hashtags';

      console.log(searchState);

      let searchPayload = {
        hashtags: searchState.selectedHashtags.map(tag => tag.value)
      };

      searchImages(searchPayload, searchBy);
    } else if (searchState.selectedHashtags.length === 0) {
      // Search by category
      searchBy = 'category';

      let searchPayload = {
        category: searchState.category
      };

      searchImages(searchPayload, searchBy);
    } else {
      // Multi search by hashtags & category
      searchBy = 'multi';

      let searchPayload = {
        category: searchState.category,
        hashtags: searchState.selectedHashtags.map(tag => tag.value)
      };

      searchImages(searchPayload, searchBy);
    }
  };

  const filterHashtagsResponse = (inputValue, hashtagsResponse) => {
    return hashtagsResponse.filter(i =>
      i.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = async inputValue => {
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

  console.log(hashtagsDefaultValue);

  return (
    // <div className={classes.root}>
    /* <AppBar position='static' className={classes.appBar}> */
    <Toolbar className={classes.toolBar}>
      {/* <div className={classes.search}>
        <InputBase
          placeholder='חיפוש...'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          name='category'
          onChange={event => onSearchChange('category', event)}
          // value={searchState.category}
        />
      </div> */}
      <div className={classes.select}>
        <Select
          name='category-select'
          isClearable
          options={categories}
          className='multi-select'
          isRtl={true}
          placeholder='קטגוריה'
          styles={selectStyles}
          onChange={(val, event) => {
            onSearchChange(event, val);
          }}
        />
      </div>
      <div className={classes.select}>
        <AsyncSelect
          isMulti
          name='hashtags-select'
          // isDisabled={hashtagsDefaultValue ? true : false}
          loadOptions={promiseOptions}
          defaultOptions={hashtags}
          className='multi-select'
          isRtl={true}
          placeholder={searchState.hashtagSearchPlaceholder}
          value={
            hashtagsDefaultValue
              ? hashtagsDefaultValue
              : searchState.selectedHashtags
          }
          styles={selectStyles}
          components={{ Option: HashOption }}
          loadingMessage={() => 'טוען...'}
          onChange={(val, event) => {
            onSearchChange(event, val);
          }}
          onMenuOpen={() => {
            setSearchState({
              ...searchState,
              hashtagSearchPlaceholder: 'התחל לכתוב על מנת לחפש...'
            });
          }}
          onMenuClose={() => {
            setSearchState({
              ...searchState,
              hashtagSearchPlaceholder: 'האשטאגים'
            });
          }}
        />
      </div>
      <IconButton
        onClick={() => {
          searchExecution();
        }}
        className={classes.searchIcon}
        disabled={searchState.searchDisabled}
      >
        <SearchIcon />
      </IconButton>
    </Toolbar>
    //  </AppBar>
    //  </div>
  );
};

SearchAppBar.propTypes = {
  searchImages: PropTypes.func.isRequired,
  searchChange: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  image: state.image
});

export default connect(
  mapStateToProps,
  { searchImages, searchChange }
)(SearchAppBar);
