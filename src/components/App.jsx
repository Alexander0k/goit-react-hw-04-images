import React, { Component } from 'react';
import { Audio } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { ApiService } from '../services/ApiService';

export default class App extends Component {
  state = {
    pictures: [],
    picture: null,
    loading: false,
    error: null,
    per_page: 12,
    value: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const prevValue = prevState.value;
    const nextValue = this.state.value;
    if (prevValue !== nextValue || prevState.per_page !== this.state.per_page) {
      this.fetchPictures();
    }
  }

  fetchPictures() {
    const { per_page, value } = this.state;
    this.setState({
      loading: true,
    });

    ApiService(value, per_page)
      .then(result => this.setState({ loading: true, pictures: result.hits }))
      .catch(error => {
        this.setState({ loading: true, error });
      })
      .finally(() => this.setState({ loading: false }));
  }

  handleFormSubmit = value => {
    console.log(value);
    this.setState({ value, per_page: 12 });
  };

  loadMore = () => {
    this.setState(({ per_page }) => {
      return { per_page: per_page + 12 };
    });
  };

  openModal = newPicture => {
    this.setState({ picture: newPicture, showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { pictures, error, loading, showModal } = this.state;
    const isPictures = Boolean(pictures.length);
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {showModal && (
          <Modal picture={this.state.picture} onClose={this.closeModal} />
        )}

        {error && <p>ОЙ, что-то пошло не так..</p>}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isPictures && (
          <ImageGallery pictures={pictures} onClick={this.openModal} />
        )}
        {isPictures && <Button onClick={this.loadMore} />}
        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        )}
      </div>
    );
  }
}
