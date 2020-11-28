const fetchData = dispatch => dispatch({ type: 'FETCH_DATA' });
const responseNotOk = dispatch => {
  dispatch({ type: 'FETCH_ERROR', payload: 'The data could not be retrieved.' });
};
const fetchError = (dispatch, error) => {
  dispatch({ type: 'FETCH_ERROR', payload: error.message });
};

const consumeAPI = async (url, dispatch) => {
  const response = await fetch(url);
  if (!response.ok) responseNotOk(dispatch);
  return response.json();
};

const fetchGamesList = match => dispatch => {
  let api = null;
  if (match.length) {
    api = `search=${match}`;
  } else {
    api = 'page_size=40';
  }

  fetchData(dispatch);
  consumeAPI(`https://api.rawg.io/api/games?${api}`, dispatch)
    .then(result => dispatch({
      type: 'RECEIVE_GAMES_LIST',
      payload: result.results,
    }))
    .catch(error => fetchError(dispatch, error));
};

const fetchGame = match => async dispatch => {
  fetchData(dispatch);
  consumeAPI(`https://api.rawg.io/api/games/${match.params.id}`, dispatch)
    .then(result => dispatch({
      type: 'RECEIVE_GAME',
      payload: result,
    }))
    .catch(error => fetchError(dispatch, error));
};

const changeFilter = filter => ({
  type: 'CHANGE_FILTER',
  payload: filter,
});

export {
  changeFilter, fetchGamesList, fetchGame,
};
