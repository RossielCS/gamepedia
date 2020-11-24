import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { searchGame } from '../actions';

const GamesForm = ({ searchGame }) => {
  
};

GamesForm.propTypes = {
  searchGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  searchGame,
});

export default connect(null, mapDispatchToProps)(GamesForm);