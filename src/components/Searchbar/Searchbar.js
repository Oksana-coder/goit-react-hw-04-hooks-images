import { useState } from 'react';
import './Searchbar.scss';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = event => {
    setSearchTerm(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchTerm.trim() === '') {
      toast.error('Enter your search query!');
      return;
    }

    onSubmit(searchTerm);
    setSearchTerm('');
  };

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchTerm"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </form>
      </header>
    );
  }