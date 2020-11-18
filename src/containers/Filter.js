import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../actions';

const Filter = ({
  categories, fetching, error, handleFilterChange, fetchCategories,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <p>Filter Component</p>
  );
};

Filter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  fetchCategories,
});

const mapStateToProps = state => ({
  categories: state.filter.categories,
  fetching: state.fetch.fetching,
  error: state.fetch.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
