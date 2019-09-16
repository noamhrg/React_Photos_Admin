import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ImageGallery from 'react-image-gallery';
import LikeIcon from '@material-ui/icons/Favorite';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { confirmAlert } from 'react-confirm-alert'; // Confirm component
import 'react-confirm-alert/src/react-confirm-alert.css'; // Confirm component css

import {
  likePost,
  deleteImage,
  editMode,
  searchImages
} from '../../redux/actions/image';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    maxHeight: 1000,
    margin: '30px auto 10px auto',
    position: 'relative'
  },
  cardHeader: {
    wordWrap: 'break-word'
  },
  cardContent: {
    padding: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  likeIcon: {
    '&:hover': {
      color: '#ED4956'
    },
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest
    })
  },
  liked: {
    color: '#ED4956 !important'
  },
  tag: {
    color: '#003569',
    fontSize: '15px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  likesCounter: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  cardFooter: {
    position: 'relative',
    padding: '16px'
  },
  pictureDate: {
    position: 'absolute',
    left: '15px',
    fontWeight: '600'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

const MyCard = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [postState, setPostState] = React.useState({
    postId: props.postId,
    postLikes: props.postLikes,
    postDate: props.postDate,
    postDescription: props.postDescription,
    postHashtags: props.postHashtags,
    postCategory: props.postCategory,
    liked: false
  });

  const [currentImageState, setcurrentImageState] = React.useState({
    imageIndex: 0,
    imageId: '',
    imageName: ''
  });

  function wasPostLiked(postId) {
    const liked = JSON.parse(localStorage.getItem('liked'));
    if (liked && liked.length > 0) {
      if (liked.includes(postId)) {
        return true;
      } else {
        return false;
      }
    }
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(context) {
    setAnchorEl(null);
    if (context === 'delete') {
      confirmDelete(props.postId);
    } else if (context === 'edit') {
      const postDetails = {
        postId: props.postId,
        postDescription: props.postDescription,
        postHashtags: props.postHashtags,
        postCategory: props.postCategory
      };

      props.editMode(postDetails);
    }
  }

  const confirmDelete = postId => {
    confirmAlert({
      title: 'אישור מחיקה',
      message: 'האם אתה בטוח שברצונך למחוק תמונה זו ?',
      buttons: [
        {
          label: 'אישור',
          onClick: () => props.deleteImage(postId)
        },
        {
          label: 'ביטול',
          onClick: () => false
        }
      ]
    });
  };

  const hashtagClickSearch = tag => {
    // Search by hashtags
    let searchBy = 'hashtags';

    let searchPayload = {
      hashtags: [tag]
    };

    props.searchImages(searchPayload, searchBy, true);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <Fragment>
            <IconButton
              disabled={postState.liked || wasPostLiked(props.postId)}
              onClick={() => {
                props.likePost(props.postId);
                setPostState({
                  ...postState,
                  postLikes: postState.postLikes + 1,
                  liked: true
                });
              }}
              aria-label='Add to favorites'
              className={
                wasPostLiked(props.postId) || postState.liked
                  ? classes.liked
                  : ''
              }
            >
              <FavoriteIcon />
            </IconButton>
            {props.isAuth && (
              <Fragment>
                <Button
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <MoreHorizIcon />
                </Button>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleClose('edit')}>עריכה</MenuItem>
                  <MenuItem onClick={() => handleClose('delete')}>
                    מחיקה
                  </MenuItem>
                </Menu>
              </Fragment>
            )}
          </Fragment>
        }
        className={classes.cardHeader}
        title={currentImageState.imageName
          .split('.')
          .slice(0, -1)
          .join('.')}
        subheader={props.postDescription}
      />

      <CardContent className={classes.cardContent}>
        <ImageGallery
          items={props.items}
          showPlayButton={false}
          isRTL={true}
          showThumbnails={false}
          useTranslate3D={false}
          onImageLoad={event => {
            setcurrentImageState({
              ...currentImageState,
              imageId: props.items[0].imageId,
              imageName: props.items[0].imageName
            });
          }}
          onSlide={currentIndex => {
            setcurrentImageState({
              ...currentImageState,
              imageId: props.items[currentIndex].imageId,
              imageIndex: currentIndex,
              imageName: props.items[currentIndex].imageName
            });
          }}
          showFullscreenButton={false}
        />{' '}
      </CardContent>

      <CardActions className={classes.cardFooter}>
        <LikeIcon /> {'    '}{' '}
        <span className={classes.likesCounter}>{props.postLikes}</span>
        <div>
          {props.postHashtags.map((tag, index) => (
            <span
              className={classes.tag}
              key={index}
              style={{ marginLeft: '3px' }}
              onClick={() => {
                hashtagClickSearch(tag);
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className={classes.pictureDate}>
          <span> {new Date(props.postDate).toLocaleDateString('en-GB')} </span>
        </div>
      </CardActions>
    </Card>
  );
};

MyCard.propTypes = {
  likePost: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired,
  searchImages: PropTypes.func.isRequired
};

export default connect(
  null,
  { likePost, deleteImage, editMode, searchImages }
)(MyCard);

// If sill has bugs - can try to connect items from image gallery straight to redux store
