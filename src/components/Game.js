import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGame } from '../actions';

const Game = ({
  match, item, fetching, error,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGame(match));
  }, [dispatch]);

  if (fetching) return <div>Loading...</div>;
  if (error.length !== 0) return <div>{`ERROR: ${error}`}</div>;

  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.background_image} alt={item.name} />
    </div>
  );
};

Game.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, { fetchGame })(Game);
