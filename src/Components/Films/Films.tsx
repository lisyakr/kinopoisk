import { useNavigate } from 'react-router-dom';
import { TFilm } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

type FilmsProps = {
    items: TFilm[];
};

export const Films = ({ items }: FilmsProps) => {
    const navigate = useNavigate();

    const { favorites, toggleFavorite } = useFavorites();

    return (
        <Grid2 container spacing={2}>
            {!!items.length &&
                items.map(({ id, name, year, rating, poster }) => (
                    <Grid2 xs={6} md={4} key={id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="450"
                                image={poster.url}
                                alt={name}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {name} ({year})
                                </Typography>
                                <Typography component="div">
                                    {!!rating.kp && (
                                        <div>Рейтинг: {rating.kp}</div>
                                    )}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton
                                    style={{
                                        color: favorites.includes(id)
                                            ? '#F24925'
                                            : '#CCC',
                                    }}
                                    onClick={(e) => toggleFavorite(id)}
                                    aria-label="add to favorites"
                                >
                                    <FavoriteIcon />
                                </IconButton>
                                <Button
                                    size="small"
                                    onClick={() => navigate(`/film/${id}`)}
                                >
                                    Подробнее
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
        </Grid2>
    );
};
