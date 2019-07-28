import React, { useEffect } from 'react';

const ScrollToTop = () => {
  let scrollTopRef = React.createRef();

  useEffect(() => {
    initScroll();
  }, []);

  const initScroll = () => {
    document.addEventListener('scroll', event => {
      // show scroll to top btn
      if (window.scrollY > 300) {
        // $('.scrollToTop').addClass('active');
        scrollTopRef.current.classList.add('active');
      } else {
        scrollTopRef.current.classList.remove('active');
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className='scrollToTop' ref={scrollTopRef} onClick={scrollToTop}>
      <i className='fa fa-angle-up' />
    </div>
  );
};

export default ScrollToTop;
