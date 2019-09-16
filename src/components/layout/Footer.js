import React from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function MadeWithLove() {
  return (
    <Typography variant='body2' color='textSecondary'>
      {'Built with love by the '}
      <Link color='inherit' href='https://material-ui.com/'>
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white'
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    // <div className={classes.root}>
    //   {/* <CssBaseline /> */}
    //   {/* <Container component='main' className={classes.main} maxWidth='sm'>
    //     <Typography variant='h2' component='h1' gutterBottom>
    //       Sticky footer
    //     </Typography>
    //     <Typography variant='h5' component='h2' gutterBottom>
    //       {'Pin a footer to the bottom of the viewport.'}
    //       {'The footer will move as the main element of the page grows.'}
    //     </Typography>
    //     <Typography variant='body1'>Sticky footer placeholder.</Typography>
    //   </Container> */}
    //   <footer className={classes.footer}>
    //     <Container maxWidth='sm'>
    //       <Typography variant='body1'>זה הפוטר החדש שלנו</Typography>
    //       <MadeWithLove />
    //     </Container>
    //   </footer>
    // </div>
    <footer className='apps-footer'>
      <div className='footer-bottom'>
        <ul className='list-inline list-unstyled footer-social-links'>
          <li>
            <a href='https://github.com/noamhrg' target='_blank'>
              <i className='fab fa-github' />
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/noam-hargil-5a8b3143/'
              target='_blank'
            >
              <i className='fab fa-linkedin' />
            </a>
          </li>
        </ul>
        <p>
          All Rights Reserved © 2019
          <a
            href='https://linkedin.com/in/noam-hargil-5a8b3143/'
            target='_blank'
          >
            Noam Hargil
          </a>
        </p>
      </div>
    </footer>
  );
}
