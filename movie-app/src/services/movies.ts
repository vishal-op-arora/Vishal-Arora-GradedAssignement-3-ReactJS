import axios from "axios";
import { FAVOURITE_MOVIES_URL, BASE_API_URL } from "../constants/constants";
import IMovie from "../model/IMovie";

const getFavouritMovies = async () => {
    const favouritMovies = await axios.get< IMovie [] >(FAVOURITE_MOVIES_URL);
    return favouritMovies.data;
}

const getMoviesByCategory = async (movieCategory : string) => {
    const movieURL = BASE_API_URL + "/" + movieCategory;
    const favouritMovies = await axios.get< IMovie [] >(movieURL);
    return favouritMovies.data;
}

const getMoviesByCategoryAndID = async (movieCategory : string, id: number) => {
    const movieURL = BASE_API_URL + "/" + movieCategory + "/" + id;
    const favouritMovies = await axios.get< IMovie [] >(movieURL);
    return favouritMovies.data;
}

const postFavouriteMovie = async (movie : IMovie) => {

    const favoriteMovies = await axios.post< IMovie> (
        FAVOURITE_MOVIES_URL,
        movie, 
        {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
    );
    return favoriteMovies.data;
}

export {
    getFavouritMovies,
    postFavouriteMovie,
    getMoviesByCategory,
    getMoviesByCategoryAndID
};