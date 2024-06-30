import { useEffect, useState } from 'react';
import { TGenres } from '../../../types';
import { useMainPageContext } from '../../../context/MainPageContext';
import { Checkbox, FormControlLabel, FormGroup, Input } from '@mui/material';
import { getGenres } from '../../../utils';

import './Genres.css';

export const Genres = () => {
    const [genres, setGenres] = useState<TGenres[]>([]);
    const [value, setValue] = useState('');

    const { onCheckboxGenres, checkedGenres } = useMainPageContext();

    useEffect(() => {
        getGenres().then((res) => setGenres(res));
    }, []);

    const filteredGenres = genres.filter((genre) => {
        return genre.name.toLowerCase().startsWith(value.toLowerCase());
    });

    return (
        <div className="genres">
            <Input
                type="text"
                placeholder="жанр"
                onChange={(e) => setValue(e.target.value)}
            />
            <FormGroup className="genresList">
                {filteredGenres.map(({ name, slug }) => (
                    <FormControlLabel
                        key={slug}
                        label={name}
                        control={
                            <Checkbox
                                name={slug}
                                id={slug}
                                value={name}
                                checked={checkedGenres.includes(name)}
                                onChange={(e) =>
                                    onCheckboxGenres(e.target.checked, name)
                                }
                            />
                        }
                    />
                ))}
            </FormGroup>
        </div>
    );
};
