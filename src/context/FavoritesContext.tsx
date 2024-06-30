import {ReactNode, createContext, useContext, useState} from 'react';

export const favoritesContext = createContext<
    | {
        toggleFavorite: (id: number) => void;
          favorites: number[];
      }
    | undefined
>(undefined);

export const FavoritesContext = ({children}: {children: ReactNode}) => {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const f = localStorage.getItem('favorites');
        return f ? JSON.parse(f) : [];
    });

    const toggleFavorite = (id: number) => {
        const localFavorites = localStorage.getItem('favorites');

        if (localFavorites) {
            const parsedLocalFavorites = JSON.parse(localFavorites);

            if (parsedLocalFavorites.includes(id)) {
                const deleteDuplicates = parsedLocalFavorites.filter(
                    (el: number) => el !== id
                );
                localStorage.setItem(
                    'favorites',
                    JSON.stringify(deleteDuplicates)
                );
                setFavorites(deleteDuplicates);
            } else {
                parsedLocalFavorites.push(id);
                localStorage.setItem(
                    'favorites',
                    JSON.stringify(parsedLocalFavorites)
                );
                setFavorites(parsedLocalFavorites);
            }
        } else {
            localStorage.setItem('favorites', JSON.stringify([id]));
            setFavorites([id]);
        }
    }

    return (
        <favoritesContext.Provider value={{
            favorites,
            toggleFavorite,
        }}>
            {children}
        </favoritesContext.Provider>
    )
}

export const useFavorites = () => {
    const ctx = useContext(favoritesContext);

    if (!ctx) {
        throw new Error('favoritesContext is not initialized')
    }

    return ctx;
}