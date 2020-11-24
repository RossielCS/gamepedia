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

  if (fetching && !categories.length) return <div>Loading...</div>;
  if (error.length !== 0) return <div>{`ERROR: ${error}`}</div>;

  return (
    <div className="Category-filter">
      <div>
        <label htmlFor="filter">
          <span>FILTER CATEGORIES</span>
          <select onChange={e => handleFilterChange(e.target.value)}>
            <option key="All" value="All" defaultValue>All</option>
            {categories.map(
              category => (
                <option
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ),
            )}
          </select>
        </label>
      </div>
    </div>
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
