import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import UploadForm from '../dashboard/UploadForm';

import { editModeOff } from '../../redux/actions/image';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `48%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  }
}));

const MyModal = ({ image: { image, edit }, editModeOff }) => {
  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    editModeOff();
    // setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      {/* <Button onClick={handleOpen}>פתח מודאל</Button> */}
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={edit}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <UploadForm />
        </div>
      </Modal>
    </div>
  );
};

MyModal.propTypes = {
  image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  image: state.image
});

export default connect(
  mapStateToProps,
  { editModeOff }
)(MyModal);
