import { debounce } from '@mui/material';
import { baseUrl, requestParams } from './constants';
import { useMemo } from 'react';

export const getFilms = (req) => {
    return fetch(`${baseUrl}?${req}`, requestParams).then((res) => res.json());
};

export const getGenres = () => {
    return fetch(
        'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
        requestParams
    ).then((res) => res.json());
};

export const getFavorites = (query) => {
    return fetch(`${baseUrl}?limit=100&${query}`, requestParams).then((res) =>
        res.json()
    );
};

export const getFilmPage = (path) => {
    return fetch(`${baseUrl}/${path}`, requestParams).then((res) => res.json());
};
