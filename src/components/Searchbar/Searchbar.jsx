import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleValueChange = event => {
    this.setState({ value: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      return alert('Please enter a request!');
    }
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchForm__button}>
            <FcSearch size="32px" />
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleValueChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
