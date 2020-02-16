import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MyCard from '../card/MyCard';
import Modal from '../layout/MyModal';
import {
  getLatestPosts,
  getCategories,
  getHashtags
} from '../../redux/actions/image';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    maxHeight: 1000,
    margin: '30px auto 10px auto',
    position: 'relative',
    color: '#90949c'
  },
  emptyCard: {
    textAlign: 'center',
    padding: '50px 25px',
    position: 'relative',
    top: '200px'
  },
  emptyCardText: {
    fontSize: '23px'
  },
  noMorePostsCard: {
    fontSize: '16px'
  }
}));

const Main = ({
  image: { loading, posts, categories, hashtags, hasMore },
  auth: { isAuth },
  getLatestPosts,
  getCategories,
  getHashtags
}) => {
  useEffect(() => {
    getCategories();
    getHashtags();
    getLatestPosts('0');
  }, []);

  hashtags = hashtags.map(tag => ({
    value: tag.name,
    label: tag.name
  }));

  const classes = useStyles();
  let showSpinner = false;

  return (
    <Fragment>
      <Modal />

      {loading && posts.length == 0 ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <Fragment>
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={() => {
              if (hasMore && !loading) {
                getLatestPosts(posts.length);
              }
            }}
            initialLoad={false}
          >
            {posts.map((currentPost, index) => (
              <MyCard
                key={index}
                isAuth={isAuth}
                postId={currentPost._id}
                postLikes={currentPost.likes}
                postDate={currentPost.date}
                postDescription={currentPost.description}
                postHashtags={currentPost.hashtags}
                postCategory={currentPost.category}
                items={
                  currentPost.isMultiple
                    ? currentPost.images.map(currentImage => ({
                        original: `https://photo-admin-server/${currentImage.path}`,
                        originalAlt: currentImage.name,
                        originalTitle: currentImage.name,
                        imageId: currentImage._id,
                        imageName: currentImage.name
                      }))
                    : [
                        {
                          original: `https://photo-admin-server/${currentPost.images[0].path}`,
                          originalAlt: currentPost.images[0].name,
                          originalTitle: currentPost.images[0].name,
                          imageId: currentPost.images[0]._id,
                          imageName: currentPost.images[0].name
                        }
                      ]
                }
              />
            ))}
          </InfiniteScroll>
          {!loading && posts.length > 0 && !hasMore ? (
            <Card className={classes.card}>
              <CardHeader
                title={
                  <h1 className={classes.noMorePostsCard}>אין עוד פוסטים</h1>
                }
              />
            </Card>
          ) : loading && hasMore ? (
            <Spinner />
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <Card className={`${classes.card} ${classes.emptyCard}`}>
            <CardHeader
              title={
                <h2
                  className={classes.emptyCardText}
                  style={{
                    marginTop: '25px'
                  }}
                >
                  {' '}
                  לא נמצאו תמונות{' '}
                </h2>
              }
            />
          </Card>
        </Fragment>
      )}
    </Fragment>
  );
};

Main.propTypes = {
  image: PropTypes.object.isRequired,
  getLatestPosts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getHashtags: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  image: state.image,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getLatestPosts,
  getCategories,
  getHashtags
})(Main);
