import { ReactElement, useRef } from "react";
import { makeStyles, Paper, InputBase, IconButton, colors } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

type SearchBoxProps = {
  onChange: (text: string) => void;
  className?: string;
};
const defaultProps = {
  onChange: () => {},
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #f6c700",
  },
  input: {
    marginLeft: theme.spacing(1),
    backgroundColor: "#ffff",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBox = ({ onChange, className }: SearchBoxProps): ReactElement => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (!!inputRef.current) {
      onChange(inputRef.current.value);
    }
  };

  return (
    <Paper >
      <InputBase
        className={classes.input}
        placeholder="Search for a movie"
        inputRef={inputRef}
        fullWidth
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleChange();
          }
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        onClick={handleChange}
      >
        <SearchIcon htmlColor="4A4A4A"/>
      </IconButton>
    </Paper>
  );
};

SearchBox.defaultProps = defaultProps;

export default SearchBox;
