import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
