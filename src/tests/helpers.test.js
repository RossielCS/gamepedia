import { filterGenres, changeEmptyProperties } from '../helpers';

describe('filterGenres', () => {
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

describe('changeEmptyProperties', () => {
  test('It should return a object with valid properties', () => {
    const itemKeys = {
      stringValue: ['description_raw'],
      arrayValue: ['genres', 'platforms', 'esrb_rating',
      ],
    };

    const newValues = {
      description_raw: 'N/A',
      genres: [{ id: 0, name: 'N/A' }],
      platforms: [{ platform: { id: 1, name: 'N/A' } }],
      esrb_rating: [{ id: 2, name: 'N/A' }],
    };

    const item = {
      description_raw: '',
      genres: [],
      platforms: [],
      esrb_rating: [],
    };

    expect(changeEmptyProperties(item, itemKeys)).toEqual(newValues);
  });
});
