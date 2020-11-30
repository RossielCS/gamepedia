const fetchData = () => ({ type: 'FETCH_DATA' });
const responseNotOk = () => ({ type: 'FETCH_ERROR', payload: 'The data could not be retrieved.' });
const fetchError = error => ({ type: 'FETCH_ERROR', payload: error.message });

const consumeAPI = async (url, dispatch) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  return dispatch(responseNotOk());
};

const fetchGamesList = match => {
  let api = '';
  if (match.length) api = `search=${match}&`;

  return async dispatch => {
    dispatch(fetchData());
    const response = await consumeAPI(`https://api.rawg.io/api/games?${api}page_size=40`, dispatch)
      .catch(error => dispatch(fetchError(error)));

    if (response.results) {
      return dispatch({
        type: 'RECEIVE_GAMES_LIST',
        payload: response.results,
      });
    }

    return response;
  };
};

const fetchGame = match => async dispatch => {
  dispatch(fetchData());
  const response = await consumeAPI(`https://api.rawg.io/api/games/${match.params.id}`, dispatch)
    .catch(error => dispatch(fetchError(error)));

  if (response.name) {
    return dispatch({
      type: 'RECEIVE_GAME',
      payload: response,
    });
  }

  return response;
};

const changeFilter = filter => ({
  type: 'CHANGE_FILTER',
  payload: filter,
});

export {
  changeFilter, fetchGamesList, fetchGame,
};
