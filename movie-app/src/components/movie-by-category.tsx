import { Component } from "react";
import { Alert, Row, Col, Spinner } from 'react-bootstrap';
import { RouteComponentProps } from "react-router-dom";
import { FAVOURITE_MOVIES, MOVIES_COMING, MOVIES_IN_THEATERS, TOP_RATED_MOVIES, TOP_RATED_MOVIES_INDIA } from "../constants/constants";
import IMovie from "../model/IMovie";
import { getMoviesByCategory } from "../services/movies";
import { LoadingStatus } from "../utils/types";
import MovieCard from "./movie-card";

type State = {
    status: LoadingStatus,
    movies?: IMovie[],
    moviesToShow?: IMovie[],
    error?: Error,
    searchString: string
}

type Props = {
    moviesCategory: string
}

class MoviesByCategory extends Component<RouteComponentProps<Props>, State> {

    state: State = {
        status: 'LOADING',
        searchString: ''
    };

    async componentDidMount() {
        await this.reloadMovieList();
    }

    async componentDidUpdate(prevProps: RouteComponentProps<Props>) {
        if (this.props.match.params.moviesCategory !== prevProps.match.params.moviesCategory) {
            await this.reloadMovieList();
        }
    }

    reloadMovieList = async () => {
        this.setState({
            status: 'LOADING'
        });

        try {
            const movies = await getMoviesByCategory(this.props.match.params.moviesCategory);
            this.setState({
                status: 'LOADED',
                movies
            });
        } catch (error) {
            this.setState({
                status: 'ERROR',
                error: error as Error
            });
        }
    }

    moviePageTitleByCategory = (url : string) => {
        url = "/" + url; 
        switch(url){
            case MOVIES_IN_THEATERS :
                return "Movies in thaters";

            case MOVIES_COMING:
                return "Coming soon movies";

            case TOP_RATED_MOVIES_INDIA:
                return "Top rated Indian movies";

            case TOP_RATED_MOVIES:
                return "Top reated movies";
                
            case FAVOURITE_MOVIES:
                return "Favourite movies";
        }
    }

    render() {
        const { status, movies, error } = this.state;
        console.log(this.props.match.params.moviesCategory);
        let el;
        switch (status) {
            case 'LOADING':
                el = (
                    <>
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Fetching {this.moviePageTitleByCategory(this.props.match.params.moviesCategory)?.toLowerCase()}...</span>
                            </Spinner>
                        </div>
                    </>
                );
                break;

            case 'ERROR':
                <>
                    <Alert variant="danger">{error?.message}</Alert>
                </>
                break;

            case 'LOADED':
                el = (
                    <>
                        
                        <h1> {this.moviePageTitleByCategory(this.props.match.params.moviesCategory)}</h1>
                        <hr id='line'/>
                        <Row xs={1} md={3} lg={5}>
                            {
                                movies?.map(
                                    (movie) => (
                                        <Col key={movie.id} className="d-flex my-2">
                                            <MovieCard movie={movie} url={this.props.match.params.moviesCategory} />
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
                );
                break;

            default:
                break;
        }

        return el;
    };
}


export default MoviesByCategory; 