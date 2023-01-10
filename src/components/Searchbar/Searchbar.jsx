// import { Component } from 'react';
import { useState } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';
import PropTypes from 'prop-types';

const Searchbar = ({ catchSubmitInfo }) => {
  const [inputValue, setInputValue] = useState('');

  const handledInputChange = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    catchSubmitInfo(inputValue);
  };

  return (
    <header className={css.searchbar}>
      <form className="Form" onSubmit={handleSubmit}>
        <div className={css.wrap}>
          <button type="submit" className={css.buttonIcon}>
            <CiSearch name="search" color="#fff" size="25px" />
          </button>

          <input
            onChange={handledInputChange}
            value={inputValue}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </div>
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  catchSubmitInfo: PropTypes.func.isRequired,
};
