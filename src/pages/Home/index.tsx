import { useState, useEffect, ReactElement } from "react";
import styles from "./index.module.css";
import { useInfiniteQuery } from "react-query";
import MovieCard, { MovieCardProps } from "components/MovieCard";
import Skeleton from "components/MovieCard/Skeleton";
import { Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMoviePresenter, useMovieStore } from "components/presenter/movie_presenter";
import { action } from "mobx";
import { observer } from "mobx-react";

const Home = observer((props: {value: string}): ReactElement => {
  const [searchText, setSearchText] = useState(""); // Initial value set to 'man' to display default search results on UI
  const [currentPage, setCurrentPage] = useState(0);
  const store = useMovieStore();
  const presenter = useMoviePresenter();
  const loadNextPage = action(() => presenter.loadNextPage(store));

  useEffect(() => {
    setCurrentPage(0);
    remove();
    setTimeout(() => {
      refetch();
    }, 1000);
  }, [searchText]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const delay = 700;
    store.query = "";
    store.page = 1
    const debounce = setTimeout(() => {
      if (typeof props.value === "string") {
        store.query = props.value
        store.page = 1
        loadNextPage()
      }
    }, delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [props.value]);
  const nextPage = () => {
    store.page = store.page + 1;
    loadNextPage()
  }

  const fetchMovies = ({ pageParam = 1 }) =>{}
  const {
    error,
    isSuccess,
    isLoading,
    refetch,
    remove,
  } = useInfiniteQuery(`movies`, fetchMovies, {
    getNextPageParam: (lastPage, pages) => {
      return +lastPage > currentPage ? currentPage + 1 : null;
    },
    enabled: !!searchText.length,
    onSuccess: () => {
      setCurrentPage(currentPage + 1);
    },
  });

  const MoviesLoader = (itemCount: number): ReactElement => {
    return (
      <Grid container spacing={2}>
        {[...new Array(itemCount)].map((_, i: number) => (
          <Grid item xs={12} md={3} key={i}>
            <Skeleton />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div className={styles.root}>
      <Grid container justify="center">
        <Grid item >
          <Grid item xs={12} className={styles.movieListContainer}>
            {isLoading && MoviesLoader(20)}
            {isSuccess &&
              (!!store.list ? (
                <InfiniteScroll
                  dataLength={
                    store.list.length
                  }
                  next={nextPage}
                  hasMore={store.totalPage> store.page || false}
                  loader={MoviesLoader(4)}
                  style={{ overflow: "hidden" }}
                >
                  <Grid container spacing={2}>
                    {store.list.map(
                        ({
                          title,
                          release_date,
                          id,
                          vote_average,
                          poster_path,
                          overview,
                        }: MovieCardProps) => (
                          <Grid item xs={12} lg={3} md={4} sm={6} key={id}>
                            <MovieCard
                              {...{ title, release_date, id, poster_path, overview, vote_average }}
                            />
                          </Grid>
                        )
                      )}
                  </Grid>
                </InfiniteScroll>
              ) : (
                "No Result"
              ))}

            {/* Error state */}
            {!!error && (
              <div className={styles.errorMessageContainer}>
                {JSON.stringify(error)}
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default Home;
