// import { Component } from 'react';
import { useState, useEffect, useCallback } from 'react';
import getGallery from '../Services/PixabayApi';
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import css from './App.module.css';

export const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [modal, setModal] = useState({ url: '', alt: '' });

  const fetchGallery = useCallback(async (request, page) => {
    setIsLoading(true);

    try {
      const { total, totalHits, hits } = await getGallery(request, page);

      setItems(items => [...items, ...hits]);
      setPages(total / totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (request === '' && page === 1) return;
    fetchGallery(request, page);
  }, [page, request, fetchGallery, error]);

  useEffect(() => {
    if (page > 1) {
      window.scrollBy({
        top: window.innerHeight - 140,
        behavior: 'smooth',
      });
    }
  }, [items, page]);

  const handleFormSubmit = query => {
    if (!query.trim() || request === query) return;
    setRequest(query);
    setPage(1);
    setItems([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (url, alt) => {
    setModal({
      url: url,
      alt: alt,
    });
  };

  const closeModal = useCallback(() => {
    setModal({
      url: '',
    });
  }, []);

  const { url, alt } = modal;
  return (
    <div className={css.app}>
      <Searchbar catchSubmitInfo={handleFormSubmit} />
      {isLoading && <Loader />}

      <ImageGallery hits={items} onItemClick={openModal} />

      {pages > page && <Button onClick={handleLoadMore} />}

      {url && (
        <Modal close={closeModal}>
          <img src={url} alt={alt} />
        </Modal>
      )}
    </div>
  );
};
