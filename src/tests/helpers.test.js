import filterGenres from '../helpers';

describe('It filters the repeated genres', () => {
  test('It should return an array of objects with id and name properties', () => {
    const retrievedData = [
      { genres: [{ id: 4, name: 'Action' }] },
      { genres: [{ id: 3, name: 'Adventure' }] },
      { genres: [{ id: 5, name: ' RPG' }] },
      { genres: [{ id: 3, name: 'Adventure' }] },
    ];

    const filteredData = [
      { id: 4, name: 'Action' },
      { id: 3, name: 'Adventure' },
      { id: 5, name: ' RPG' },
    ];

    expect(filterGenres(retrievedData)).toEqual(filteredData);
  });

  test('It should return an array without empty genres properties', () => {
    const retrievedData = [
      { genres: [] },
      { genres: [] },
      { genres: [{ id: 5, name: ' RPG' }] },
    ];

    const filteredData = [
      { id: 5, name: ' RPG' },
    ];

    expect(filterGenres(retrievedData)).toEqual(filteredData);
  });
});
