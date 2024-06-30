import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TCard } from '../../types';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getFilmPage } from '../../utils';
import { useFavorites } from '../../context/FavoritesContext';

export const FilmPage = () => {
    const [film, setFilm] = useState<TCard | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { favorites, toggleFavorite } = useFavorites();

    let location = useLocation();
    const path = location.pathname.split('/')[2];

    useEffect(() => {
        setIsLoading(true);
        setFilm(null);

        getFilmPage(path).then((res) => setFilm(res));
        setIsLoading(false);
    }, [path]);

    return !isLoading && film ? (
        <Card sx={{ maxWidth: 345 }}>
            {!!film.poster && (
                <CardMedia
                    sx={{ height: 540 }}
                    image={film.poster.url}
                    title={film.name}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {film.name} ({film.year})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {film.description}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    style={{
                        color: favorites.includes(film.id) ? '#F24925' : '#CCC',
                    }}
                    onClick={(e) => toggleFavorite(film.id)}
                    aria-label="add to favorites"
                >
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    ) : null;
};
