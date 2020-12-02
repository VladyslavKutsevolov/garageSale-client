import React, { ChangeEvent, FC, FormEvent, RefObject } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles({
  container: {
    display: 'flex'
  }
});

interface ISearchBy {
  inputFocus: RefObject<HTMLInputElement>;
}

const SearchBy: FC<ISearchBy> = ({ inputFocus }) => {
  const classes = useStyles();
  const { searchByCityName, cityname, setCityName } = useStateData();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cityname', cityname);
    searchByCityName(cityname);
    setCityName('');
  };

  return (
    <div className={classes.container}>
      <form
        onSubmit={handleSubmit}
        action={`http://localhost:3001/sales/city/${cityname}`}
        method="post"
      >
        <TextField
          onChange={handleChange}
          value={cityname}
          name="city"
          id="cityname"
          label="City name"
          inputRef={inputFocus}
        />
      </form>
    </div>
  );
};

export default SearchBy;
