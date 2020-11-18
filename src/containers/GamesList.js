import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchGamesList, changeFilter } from '../actions';

const GamesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGamesList();
  }, [dispatch]);

  return (
    <div>games</div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchGamesList,
  changeFilter: filter => dispatch(changeFilter(filter)),
});

export default connect(null, mapDispatchToProps)(GamesList);
