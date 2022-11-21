import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import IMovie from "../model/IMovie";
import { FAVOURITE_MOVIES } from "../constants/constants"
import { getMoviesByCategory, removeMovieById } from "../services/movies";
import MovieCard from "./movie-card";

type MovieModel = {
    movie: IMovie;
    url: string;
}

function RemoveFavourite({ movie, url }: MovieModel) {

    const msg = `\"${movie.title}\" movie successfully removed from favourites !!!`;
    return (
        <React.Fragment>
            <div style={({ marginBottom: '0.8rem', fontSize: '1em' })}>
                <Button onClick={() => { removeFavMovieAndUpdate(movie.id, FAVOURITE_MOVIES, msg) }} key={movie.title} style={{ width: '13em', backgroundColor: 'red', borderColor: 'red' }}>Remove Favourite
                </Button>
            </div>
        </React.Fragment>

    )
};




const removeFavMovieAndUpdate = (movieID : number, movieCat: string, msg: string) => {
    removeMovieById(movieID, FAVOURITE_MOVIES, msg);
    console.log();
    //UpdateMovie();

}

function UpdateMovie () {
    const [movies, setMovies] = useState<IMovie[]>([]);
    let favMovies : IMovie[];
    useEffect(() => {
        const getAllFavouriteMovies = async () => {
            favMovies = await getMoviesByCategory(FAVOURITE_MOVIES);
            setMovies(favMovies);
        }

        getAllFavouriteMovies();
    }, []);

    
    return (
        <>
            <h1>Favourit movies</h1>
            <hr />
            <Row xs={1} md={3} lg={5}>
                {
                    movies?.map(
                        (movie) => (
                            <Col key={movie.id} className="d-flex my-2">
                                <MovieCard movie={movie} url={FAVOURITE_MOVIES} />
                            </Col>
                        )
                    )
                }
            </Row>
        </>
    );
}

export default RemoveFavourite;