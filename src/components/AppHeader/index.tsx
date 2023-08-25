import styles from "./index.module.css";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import { Card, Grid, Typography } from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#DFDFDF",
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputInput: {
      fontWeight: 700,
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '50rem',
      [theme.breakpoints.up(594)]: {
        width: '30rem',
      },
    },
  }),
);

const AppHeader = (props: { onClick: (value: string) => void; value: string }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onClick(e.target.value)
  }
  return (
    <Card className={styles.root}>
      {props.value === "home" ? (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon htmlColor="gray" />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={onSearch}
          />
        </div>
      ) : (
        <Grid container direction="row">
          <Grid item>
            <KeyboardBackspaceIcon 
            onClick={() => history.goBack()} 
            style={{ paddingRight: "3rem", cursor: "pointer" }} 
            />
          </Grid>
          <Grid item>
          <Typography style={{fontWeight: 550}}>Movie Details</Typography>
          </Grid>

     
        </Grid>
      )}

      <div>
        <Link to="/" >
          <HomeIcon htmlColor="Gray" />
        </Link>
      </div>
    </Card>
  );
};

export default AppHeader;
