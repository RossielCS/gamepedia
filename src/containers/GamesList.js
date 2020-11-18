import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchGamesList, changeFilter } from '../actions';

const GamesList = ({
  items, filter, fetching, error, fetchGamesList, changeFilter,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGamesList();
  }, [dispatch]);

  return (
    <div>games</div>
  );
};

GamesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchGamesList: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchGamesList,
  changeFilter: filter => dispatch(changeFilter(filter)),
});

const mapStateToProps = state => ({
  items: state.games.items,
  filter: state.filter.filter,
  fetching: state.fetch.fetching,
  error: state.fetch.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
