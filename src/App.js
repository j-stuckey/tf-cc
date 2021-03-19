import { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import './App.css';

function App() {
    const GIPHY_API_KEY = '5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f';

    const [giphs, setGiphs] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchGiphs, setSearchGiphs] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(
                `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}`
            );

            const data = await res.json();

            setGiphs(data.data);
        }

        fetchData();
    }, []);

    const debounceCallback = useCallback(
        _.debounce(async (e) => {
            const res = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f&q=${e.target.value}`
            );
            const data = await res.json();

            setSearchGiphs(data.data);
        }, 200),
        []
    );

    const handleChange = (e) => {
        const searchTerm = e.target.value;
        debounceCallback(e);
    };

    return (
        <div className="App">
            <form>
                <label htmlFor="search" />

                <input type="search" name="search" onChange={handleChange} />
            </form>
            <Modal isOpen={isOpen} />
            {searchGiphs.length ? <ul className="gif-list">
                {searchGiphs.map((gif) => {
                    const { images, username, rating } = gif;
                    return (
                        <li className="gif-image" onClick={() => {
                                setIsOpen(true)
                            }}>
                            <img src={gif.images.fixed_height.url} />
                        </li>
                    );
                })}
            </ul> : <ul className="gif-list">
                {giphs.map((gif) => {
                    const { images, username, rating } = gif;
                    return (
                        <li className="gif-image" onClick={() => {
                                setIsOpen(true)
                            }}>
                            <img src={gif.images.fixed_height.url} />
                        </li>
                    );
                })}
            </ul>}
        </div>
    );
}

function Modal({ data, isOpen }) {
    if (isOpen) {
        return <div>
            <p>modal</p>
        </div>
    }
    return null;
};

export default App;
