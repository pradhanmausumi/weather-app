import { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
    const [value, setValue] = useState('');

    const handleSearch = () => {
        console.log("Searching for:", value);
        onSearch(value); // Call the onSearch function with the current value
        setValue(''); // Clear the input field after searching
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search city"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default Search;
