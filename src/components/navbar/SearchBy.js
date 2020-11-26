import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles({
  container: {
    display: 'flex'
  }
});

const SearchBy = ({ inputFocus }) => {
  const classes = useStyles();
  const { searchByCityName, cityname, setCityName } = useStateData();

  const handleChange = ({ target }) => {
    setCityName(target.value);
  };

  const handleSubmit = e => {
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

SearchBy.propTypes = {
  inputFocus: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired
};

export default SearchBy;
