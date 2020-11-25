const fetchData = dispatch => dispatch({ type: 'FETCH_DATA' });
const responseNotOk = dispatch => {
  dispatch({ type: 'FETCH_ERROR', payload: 'The data could not be retrieved.' });
};
const fetchError = (dispatch, error) => {
  dispatch({ type: 'FETCH_ERROR', payload: error.message });
};

const fetchGamesList = match => dispatch => {
  let api = null;
  if (match.length) {
    api = `search=${match}`;
  } else {
    api = 'page_size=40';
  }

  fetchData(dispatch);
  fetch(`https://api.rawg.io/api/games?${api}`)
    .then(response => {
      if (!response.ok) responseNotOk(dispatch);
      return response.json();
    })
    .then(result => dispatch({
      type: 'RECEIVE_GAMES_LIST',
      payload: result.results,
    }))
    .catch(error => fetchError(dispatch, error));
};

const fetchCategories = () => dispatch => {
  fetchData(dispatch);
  fetch('https://api.rawg.io/api/genres')
    .then(response => {
      if (!response.ok) responseNotOk(dispatch);
      return response.json();
    })
    .then(result => dispatch({
      type: 'RECEIVE_CATEGORIES',
      payload: result.results,
    }))
    .catch(error => fetchError(dispatch, error));
};

const fetchGame = match => dispatch => {
  fetchData(dispatch);
  fetch(`https://api.rawg.io/api/games/${match.params.id}`)
    .then(response => {
      if (!response.ok) responseNotOk(dispatch);
      return response.json();
    })
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
  changeFilter, fetchGamesList, fetchCategories, fetchGame,
};
