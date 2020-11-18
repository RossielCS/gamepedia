import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../actions';

const Filter = ({
  categories, fetching, error, handleFilterChange, fetchCategories,
}) => {
  const dispatch = useDispatch();

  return (
    <p>Filter Component</p>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
