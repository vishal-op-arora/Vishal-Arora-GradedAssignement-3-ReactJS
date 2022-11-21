import { Card } from 'react-bootstrap';
import { FAVOURITE_MOVIES } from '../constants/constants';
import IMovie from '../model/IMovie';
import AddToFavourite from './add-to-favourite';
import RemoveFavourite from './remove-favourite';
import MovieMoreInfo from './movie-more-info';

type MovieModel = {
  movie: IMovie;
  url: string;
}

function MovieCard({ movie, url }: MovieModel) {
  let isFavourite: Boolean = false;
  if ((url) === FAVOURITE_MOVIES) {
    isFavourite = true;
  }

  return (
    <Card style={{ width: '17rem', height: '26rem' }}>
      <Card.Img variant="top" src={movie.posterurl} style={{ height: '17rem' }} key={movie.id} alt={movie.title}  />
      <Card.Body>
        <div className="d-flex align-items-start" style={{ gap: '20px' }}>
          <div>
            <Card.Title>
              {movie.title}
            </Card.Title>
          </div>
          <MovieMoreInfo movie={movie} />
        </div>

        <div className="position-absolute bottom-0">
          {
            isFavourite && (<RemoveFavourite movie={movie} url={url} />)
          }
          {
            !isFavourite && (<AddToFavourite movie={movie} movieCategory={url} />)
          }
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;