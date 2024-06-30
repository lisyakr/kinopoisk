import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import { Genres } from '../Genres/Genres';
import { useMainPageContext } from '../../../context/MainPageContext';

import './AllFilters.css';

export const AllFilters = () => {
    const {valueRating, valueYear, onChangeRangeRating, onChangeRangeYear, onChangeInputYearFrom, onChangeInputYearTo, onChangeInputRatingFrom, onChangeInputRatingTo} = useMainPageContext();

    return (
        <div className="filters">
            <Genres />

            <div className="rating">
                <div>Рейтинг</div>
                <div className="input-text">
                    <span>от</span>
                    <Input
                        defaultValue="Hello world"
                        value={valueRating[0]}
                        onChange={onChangeInputRatingFrom}
                    />
                    <span>до</span>
                    <Input
                        defaultValue="Hello world"
                        value={valueRating[1]}
                        onChange={onChangeInputRatingTo}
                    />
                </div>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={valueRating}
                    onChange={onChangeRangeRating}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10}
                />
            </div>

            <div className="year">
                <div>Год выпуска</div>
                <div className="input-text">
                    <span>от</span>
                    <Input
                        defaultValue="Hello world"
                        value={valueYear[0]}
                        onChange={onChangeInputYearFrom}
                    />
                    <span>до</span>
                    <Input
                        defaultValue="Hello world"
                        value={valueYear[1]}
                        onChange={onChangeInputYearTo}
                    />
                </div>

                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={valueYear}
                    onChange={onChangeRangeYear}
                    valueLabelDisplay="auto"
                    min={1990}
                    max={2024}
                    // getAriaValueText={valuetext}
                />
            </div>
        </div>
    );
};
