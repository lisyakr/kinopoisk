import {
    ChangeEvent,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { TFilm } from '../types';
import { LIMIT } from '../constants';
import { getFilms } from '../utils';
import { useDebounce } from '../useDebounce';

export const mainPageContext = createContext<
    | {
          checkedGenres: string[];
          onCheckboxGenres: (isChecked: boolean, slug: string) => void;
          currentPage: number;
          setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
          films: TFilm[];

          valueYear: number[];
          onChangeInputYearFrom: (
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => void;
          onChangeInputYearTo: (
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => void;
          onChangeRangeYear: (
              event: Event,
              value: number | number[],
              activeThumb: number
          ) => void;

          valueRating: number[];
          onChangeInputRatingFrom: (
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => void;
          onChangeInputRatingTo: (
              e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => void;
          onChangeRangeRating: (
              event: Event,
              value: number | number[],
              activeThumb: number
          ) => void;

          pagesCount: number;
          isLoading: boolean;
      }
    | undefined
>(undefined);

export const MainPageContext = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [checkedGenres, setCheckedGenres] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(0);

    const [valueYear, setValueYear] = useState<number[]>([1990, 2024]);
    const [valueRating, setValueRating] = useState<number[]>([0, 10]);
    const [films, setFilms] = useState<TFilm[]>([]);

    const onCheckboxGenres = (isChecked: boolean, name: string) => {
        if (isChecked) {
            setCheckedGenres([...checkedGenres, name]);
        } else {
            setCheckedGenres((s) => s.filter((el) => el !== name));
        }
    };

    const onChangeInputYearFrom = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const isCheckValue = /^\d+$/.test(e.target.value);
        if (isCheckValue) setValueYear((s) => [Number(e.target.value), s[1]]);
    };

    const onChangeInputYearTo = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const isCheckValue = /^\d+$/.test(e.target.value);
        if (isCheckValue) setValueYear((s) => [s[0], Number(e.target.value)]);
    };

    const onChangeRangeYear = (_event: Event, value: number | number[]) => {
        setValueYear(value as number[]);
    };

    const onChangeInputRatingFrom = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const isCheckValue = /^\d+$/.test(e.target.value);
        if (isCheckValue) setValueRating((s) => [Number(e.target.value), s[1]]);
    };

    const onChangeInputRatingTo = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const isCheckValue = /^\d+$/.test(e.target.value);
        if (isCheckValue) setValueRating((s) => [s[0], Number(e.target.value)]);
    };

    const onChangeRangeRating = (_event: Event, value: number | number[]) => {
        setValueRating(value as number[]);
    };

    const reqString = useMemo(() => {
        const params = {
            page: currentPage,
            limit: LIMIT,
            selectFields: ['id', 'name', 'year', 'rating', 'poster'],
            year:
                valueYear[0] === valueYear[1]
                    ? valueYear[0]
                    : `${valueYear[0]}-${valueYear[1]}`,
            notNullFields: ['id', 'name', 'year', 'rating.kp', 'poster.url'],
            'genres.name': checkedGenres,
            'rating.kp':
                valueRating[0] === valueRating[1]
                    ? valueRating[0]
                    : `${valueRating[0]}-${valueRating[1]}`,
        };

        return (
            Object.keys(params) as unknown as Array<keyof typeof params>
        ).reduce((res, key, i) => {
            let str = '';

            if (i) {
                str += '&';
            }

            const curValue = params[key];

            if (Array.isArray(curValue)) {
                str += curValue.reduce((r, c, i) => {
                    return (r += `${i ? '&' : ''}${key}=${c}`);
                }, '');
            } else {
                str += `${key}=${curValue}`;
            }

            return (res += str);
        }, '');
    }, [checkedGenres, valueYear, valueRating, currentPage]);

    const debouncedParams = useDebounce(reqString, 1000);

    useEffect(() => {
        getFilms(debouncedParams).then((res) => {
            setFilms(res.docs);
            setPagesCount(res.pages);
            setIsLoading(false);
        });
    }, [debouncedParams]);

    return (
        <mainPageContext.Provider
            value={{
                checkedGenres,
                onCheckboxGenres,
                currentPage,
                setCurrentPage,
                films,

                valueYear,
                onChangeInputYearFrom,
                onChangeInputYearTo,
                onChangeRangeYear,

                valueRating,
                onChangeInputRatingFrom,
                onChangeInputRatingTo,
                onChangeRangeRating,

                pagesCount,
                isLoading,
            }}
        >
            {children}
        </mainPageContext.Provider>
    );
};

export const useMainPageContext = () => {
    const ctx = useContext(mainPageContext);

    if (!ctx) {
        throw new Error('mainPageContext is not initialized');
    }

    return ctx;
};
