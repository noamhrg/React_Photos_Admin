import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MyCard from '../card/MyCard';
import Modal from '../layout/MyModal';

import { getLatestPosts } from '../../redux/actions/image';

import InfiniteScroll from 'react-infinite-scroller';

// const images = [
//   {
//     original:
//       'https://images.unsplash.com/photo-1418393781697-0215e2fd73e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1358&q=80'
//   },
//   {
//     original:
//       'https://www.indiewire.com/wp-content/uploads/2017/09/1351055-94035-zoomed-1.jpg?w=780'
//   }
// ];

const Main = ({
  image: { loading, posts, categories, hashtags, hasMore },
  auth: { isAuth },
  getLatestPosts
}) => {
  useEffect(() => {
    if (hasMore) {
      console.log('getting more photos inside Main.js from useEffect');
      getLatestPosts('0');
    }
  }, []);

  hashtags = hashtags.map(tag => ({
    value: tag.name,
    label: tag.name
  }));

  return (
    <Fragment>
      <Modal />

      {loading && posts.length == 0 ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <InfiniteScroll
          hasMore={hasMore}
          loadMore={() => {
            if (hasMore) {
              setTimeout(() => {
                getLatestPosts(posts.length);
              }, 500);
            }
          }}
          loader={<Spinner key={0} />}
          initialLoad={false}
          threshold={50}
        >
          {posts.map((currentPost, index) => (
            // console.log('current post from Main ', currentPost)
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
                      original: `http://localhost:5000/${currentImage.path}`,
                      originalAlt: currentImage.name,
                      originalTitle: currentImage.name,
                      imageId: currentImage._id,
                      imageName: currentImage.name
                      // imageCategory: currentImage.category
                    }))
                  : [
                      {
                        original: `http://localhost:5000/${
                          currentPost.images[0].path
                        }`,
                        originalAlt: currentPost.images[0].name,
                        originalTitle: currentPost.images[0].name,
                        imageId: currentPost.images[0]._id,
                        imageName: currentPost.images[0].name
                        // imageCategory: currentPost.images[0].category
                      }
                    ]
              }
            />
          ))}
        </InfiniteScroll>
      ) : (
        <Fragment>
          <h2
            style={{
              textAlign: 'center',
              marginTop: '25px',
              minHeight: '50vh'
            }}
          >
            {' '}
            לא נמצאו תמונות{' '}
          </h2>
        </Fragment>
      )}
    </Fragment>
  );
};

Main.propTypes = {
  image: PropTypes.object.isRequired,
  getLatestPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  image: state.image,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getLatestPosts }
)(Main);
