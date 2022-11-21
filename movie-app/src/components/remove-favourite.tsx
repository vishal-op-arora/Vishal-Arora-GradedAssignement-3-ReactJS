import axios from "axios";
import React from "react";
import { Button, Col, Row, Toast } from "react-bootstrap";
import IMovie from "../model/IMovie";
import { BASE_API_URL, FAVOURITE_MOVIES } from "../constants/constants"
import { toast } from "react-toastify";
import MoviesByCategory from "./movie-by-category";
import { getMoviesByCategory } from "../services/movies";
import MovieCard from "./movie-card";

type MovieModel = {
    movie: IMovie;
    url: string;
}

function RemoveFavourite({ movie, url }: MovieModel) {

    return (
        <React.Fragment>
            <div style={({ marginBottom: '0.8rem', fontSize: '1em' })}>
                <Button onClick={() => { removeFavouritMovieById(movie.id, movie.title) }} key={movie.title} style={{ width: '13em', backgroundColor:'red', borderColor:'red' }}>Remove Favourite 
                </Button>
            </div>
        </React.Fragment>

    )
};

const removeFavouritMovieById = async (id: string | number, title: string) => {
    const response = await axios.delete<IMovie>(
        `${BASE_API_URL}${FAVOURITE_MOVIES}/${id}`
    );
    toast.success(`\"${title}\" movie successfully removed from favourites !!!`);
    reloadMovieList();
    return response.data;
};


const reloadMovieList = async () => {
    const movies: IMovie[] = await getMoviesByCategory('favourit');
    

    const element  = (
        <>
            <h1> Favourit movies</h1>
            <hr />
            <Row xs={1} md={3} lg={5}>
                {
                    movies?.map(
                        (movie) => (
                            <Col key={movie.id} className="d-flex my-2">
                                <MovieCard movie={movie} url={'favourite'} />
                            </Col>
                        )
                    )
                }
            </Row>
        </>);
    let el = document.getElementById('line');
    
}

export default RemoveFavourite;