import { ReactElement, useState, useEffect } from "react";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import service from "utils/service";
import CONSTANTS from "utils/constants";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Skeleton from "./Skeleton";


const MovieDetails = (): ReactElement => {
  const { movieId } = useParams<{ movieId: string }>();
  const [director, setdirector] = useState("");
  const [cast, setcast] = useState("");
  const { isSuccess, isLoading, error, data } = useQuery(
    [`movie`, movieId],
    () => service.get(`${CONSTANTS.BASE_URL}movie/${movieId}`, {}),
    {
      enabled: !!movieId,
    }
  );
  const getMovieCredit = async () => {
    const cr = await service.get(
      `${CONSTANTS.BASE_URL}movie/${movieId}/credits`,
      {
        language: "en-US",
      }
    );
    let dir = ""
    let cast = ""
    for (let ele of cr.crew) {
      if (ele.job === "Director") {
        dir += ele.name + ", "
      }
    }
    for (let ele of cr.cast) {
      if (ele.known_for_department === "Acting") {
        cast += ele.name + ", "
      }
    }
    setdirector(dir);
    setcast(cast);
  }
  useEffect(() => {
    getMovieCredit();
  }, [])

  return (
    <div className={styles.root}>
      {isLoading && <Skeleton />}
      {isSuccess && (
        <Grid container justify="center">
          <Grid item xs={12} sm={10}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <img
                  src={`${CONSTANTS.BASE_IMAGE_URL}${data.poster_path}`}
                  alt={data.title}
                  height="600"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} sm={8} className={styles.detailsSection}>
                <div className={styles.titleContainer}>
                  <div className={styles.title}>{data.title}</div>
                  <div className={styles.ratingsContainer}>
                    {data.vote_average}
                    <i>/10</i>
                  </div>
                </div>

                <div className={styles.subInfo}>
                  <div>{data.release_date.split("-")[0]}</div>
                  {data.runtime < 60 ? (
                    <div>{data.runtime} min</div>
                  ) : (
                    <div>
                      {Math.floor(data.runtime / 60)} Hour {data.runtime % 60}{" "}
                      min
                    </div>
                  )}
                  <div>{director.slice(0, -2)}</div>
                </div>

                <div className={styles.plot}>{data.Plot}</div>

                <Divider light={false} />

                <Grid container className={styles.metaData}>
                  <Grid item xs={4} sm={5} md={3} lg={2} className={styles.metaLabel}>
                    Cast :
                  </Grid>
                  <Grid item xs={8} sm={7} md={9} lg={10} className={styles.metaValue}>
                    {cast.slice(0, -2)}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={4} sm={5} md={3} lg={2} className={styles.metaLabel}>
                    Director :
                  </Grid>
                  <Grid item xs={8} sm={7} md={9} lg={10} className={styles.metaValue}>
                    {director.slice(0, -2)}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={4} sm={5} md={3} lg={2} className={styles.metaLabel}>
                    Description :
                  </Grid>
                  <Grid item xs={8} sm={7} md={9} lg={10} className={styles.metaValue}>
                    {data.overview}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Error state */}
      {!!error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
};

export default MovieDetails;
