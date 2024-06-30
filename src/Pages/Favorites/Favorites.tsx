import { useEffect, useState } from 'react';
import { Films } from '../../Components/Films/Films';
import { TFilm } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { CircularProgress } from '@mui/material';
import { getFavorites } from '../../utils';

export const Favorites = () => {
    const [favFilms, setFavFilms] = useState<TFilm[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { favorites } = useFavorites();

    useEffect(() => {
        if (!favorites.length) {
            setFavFilms([]);
            return;
        }

        const query = favorites.reduce((r, c, i) => {
            return (r += `${i ? '&' : ''}id=${c}`);
        }, '');

        getFavorites(query).then((res) => {
            setFavFilms(res.docs);
            setIsLoading(false);
        });
    }, [favorites]);

    return isLoading ? (
        <CircularProgress />
    ) : favFilms.length ? (
        <div className="favorites">
            <Films items={favFilms} />
        </div>
    ) : (
        <div>пусто</div>
    );
};
