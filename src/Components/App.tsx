import { Route, Routes, useNavigate } from 'react-router-dom';
import { FilmPage } from '../Pages/FilmPage/FilmPage';
import { Main } from '../Pages/Main/Main';
import { Favorites } from '../Pages/Favorites/Favorites';
import { FavoritesContext } from '../context/FavoritesContext';
import TheatersIcon from '@mui/icons-material/Theaters';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

import './App.css';

export const App = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="wrapper">
                <div className="header">
                    <div className='title' onClick={() => navigate(`/`)} >
                        <TheatersIcon fontSize='large' color='action'/>
                        <h1>Кинопоиск</h1>
                    </div>
                    <IconButton size='large' color='error' onClick={() => navigate(`favorites`)} aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </div>

                <FavoritesContext>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/film/:id" element={<FilmPage />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </FavoritesContext>
            </div>
        </>
    );
};
