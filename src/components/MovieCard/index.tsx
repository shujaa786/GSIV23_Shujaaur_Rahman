import styles from "./index.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import CONSTANTS from "utils/constants";
import { useState } from "react";

export type MovieCardProps = {
  title: string;
  release_date: string;
  id: string;
  vote_average: string;
  poster_path: string;
  overview: string;
};

export type Children = {
  children: string;
};

const ReadMore = ({ children }: Children) => {
  const text = children;
  console.log("text",text.length, text)
  const [isReadMore, setIsReadMore] = useState(text.length > 60 ? true : false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 60) : text}
      {text.length > 60 && <span onClick={toggleReadMore} style={{cursor: "pointer"}}>
        {isReadMore ? " ...read more" : " ...show less"}
      </span>}
    </p>
  );
};

const MovieCard = ({
  title,
  release_date,
  id,
  poster_path,
  overview,
  vote_average,
}: MovieCardProps) => {
  const history = useHistory();
  const handleMovieSelect = () => {
    history.push(`/${id}`);
  };

  return (
    <Card className={styles.root}>
      <CardActionArea className={styles.cardArea} onClick={handleMovieSelect}>
        <CardMedia
          component="img"
          alt={title}
          height="400"
          image={`${CONSTANTS.BASE_IMAGE_URL}${poster_path}`}
          title={title}
          className={styles.poster}
        />
      </CardActionArea>
      <CardActions className={styles.actionsContainer}>
        <Typography gutterBottom component="i" className={styles.text}>
          {title}
        </Typography>
        <Typography gutterBottom component="i" className={styles.ratings}>
          {vote_average}/10
        </Typography>
      </CardActions>
      {overview && (
        <Typography gutterBottom component="i" className={styles.description}>
          <ReadMore>{overview}</ReadMore>
        </Typography>
      )}

    </Card>
  );
};

export default MovieCard;
