import { Films } from '../../Components/Films/Films';
import { Pagination } from '../../Components/Pagination/Pagination';
import { AllFilters } from '../../Components/Filters/AllFilters/AllFilters';
import {
    MainPageContext,
    mainPageContext,
} from '../../context/MainPageContext';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CircularProgress } from '@mui/material';

import './Main.css';

export const Main = () => (
    <MainPageContext>
        <Grid2 container spacing={8}>
            <Grid2 xs={3} md={3}>
                <AllFilters />
            </Grid2>
            <Grid2 xs md>
                <mainPageContext.Consumer>
                    {(ctx) =>
                        ctx && !ctx.isLoading ? (
                            <Films items={ctx.films} />
                        ) : (
                            <CircularProgress />
                        )
                    }
                </mainPageContext.Consumer>
            </Grid2>
        </Grid2>
        <Pagination />
    </MainPageContext>
);
