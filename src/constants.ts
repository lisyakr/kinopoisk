export const baseUrl = 'https://api.kinopoisk.dev/v1.4/movie';

export const requestParams = {
    method: 'GET',
    headers: {
        'X-API-KEY': process.env.REACT_APP_API_KEY || '',
        'Content-type': 'application/json; charset=UTF-8',
    },
};

export const LIMIT = 50;
