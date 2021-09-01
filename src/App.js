import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import imagesAPI from './services/images-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Container from './components/Container';
import ErrorView from './components/ErrorView';
import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const fetchImages = () => {

    imagesAPI
      .fetchImages(searchTerm, pageNumber)
      .then(({ hits }) => {
        setImages([...images, ...hits]);
        setPageNumber(pageNumber + 1);
        setStatus(Status.RESOLVED);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      })
    }
  
  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    setStatus(Status.PENDING);

    fetchImages();   

  }, [searchTerm]);
 
  const handleFormSubmit = searchTerm => {
    setSearchTerm(searchTerm);
    setImages([]);
    setPageNumber(1);
    setError(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const showLargeImage = path => {
    setLargeImage(path);
    toggleModal();
  };

    if (status === Status.IDLE) {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer autoClose={3000} />
        </Container>
      )
    }

    if (status === Status.PENDING) {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </Container>
      )
    }

    if (status === Status.REJECTED) {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ErrorView message={error.message} />
          <ToastContainer autoClose={3000} />
        </Container>
      )
    }

    if (status === Status.RESOLVED) {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery images={images} onShowLargeImage={showLargeImage} />
           {images.length > 0 && <Button fetchImages={fetchImages}/>}
           {showModal &&
            <Modal onClose={toggleModal}>
            <img src={largeImage} alt=""/>
            </Modal>}
          <ToastContainer autoClose={3000} />
        </Container>
      )
    }
  }