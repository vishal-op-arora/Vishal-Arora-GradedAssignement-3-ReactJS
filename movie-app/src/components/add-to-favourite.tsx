import axios from "axios";
import React from "react";
import { Button} from "react-bootstrap";
import IMovie from "../model/IMovie";
import { BASE_API_URL, FAVOURITE_MOVIES} from "../constants/constants"
import { postFavouriteMovie } from "../services/movies";
import { toast } from "react-toastify";


type MovieModel = {
    movie : IMovie;
    url : string;
}


function AddToFavourite ( {movie, url} : MovieModel) {
    
    return (
        <React.Fragment>
            <div style={ ({ marginBottom: '0.8rem', fontSize:'.9em'}) }>
            <Button onClick = { () => {addFavouriteMovie(movie.id, url)} } key={movie.title} style={{width:'13em' }}>Add to Favourite</Button>
            </div>
        </React.Fragment>
        
    )
};

async function addFavouriteMovie  (id : number, url : string) {
    
    try {
        let movieUrl : string = BASE_API_URL + "/" + url + "/" + id ;
        const favouriteMovie : IMovie = await getMovie(movieUrl);
        const movieByTitleAndYear = await getMovieByTitleAndYear(favouriteMovie.title, favouriteMovie.year);

        if(movieByTitleAndYear !== null){
            toast.error(`\"${favouriteMovie.title}\" movie already added to favourites !!!`);
            console.log("already present");
            return;
        }

        const lastMovieID : number = await getIdOfLastMovie(FAVOURITE_MOVIES);
        favouriteMovie.id = lastMovieID + 1;
        await postFavouriteMovie(favouriteMovie);
        toast.success(`${favouriteMovie.title}\" movie successfully added to favourites !!!`);
    }
    catch (error : any) {

    }
}

const getMovie = async (pathname : string) => {
    const favouritMovies = await axios.get< IMovie >(pathname);
    return favouritMovies.data;
}


const getIdOfLastMovie = async (moviesCategory: string) => {

    const response = await axios.get<IMovie[]>(
      `${BASE_API_URL}${moviesCategory}?_sort=id&_order=desc`
    );
  
    if (response.data === null || response.data.length === 0) {
      return 0;
    }
    return response.data[0].id ?? 0;
};

const getMovieByTitleAndYear = async (title: string, year : number) => {
    const response = await axios.get<IMovie[]>(
      `${BASE_API_URL}${FAVOURITE_MOVIES}?title=${title}&year=${year}`
    );
    if (response.data === null || response.data.length === 0) {
      return null;
    }
    return response.data[0];
  };

export default AddToFavourite;