import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [noImagesFound, setNoImagesFound] = useState(false);

  useEffect(() => {
    setImages([]);
    setLoading(true);

   // My unsPlash client_id:LvfdjO-O4zIZBRWolPaJhKesIZCzQ_Or3S6_aAfjguk

    const accessKey = 'LvfdjO-O4zIZBRWolPaJhKesIZCzQ_Or3S6_aAfjguk';
    const perPage = 12;
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=${perPage}&page=${page}`;

    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        if (data.results.length === 0) {
          setNoImagesFound(true);
        } else {
          const fetchedImages = data.results.map(image => ({
            smallImageLink: image.urls.small,
            highResImageLink: image.links.html,
          }));
          setImages(fetchedImages);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {noImagesFound ? (
        <p>No images found.</p>
      ) : (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="images-container">
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image.smallImageLink} alt={`Image ${index}`} />
                  <a href={image.highResImageLink} target="_blank" rel="noopener noreferrer">
                    View High Resolution
                  </a>
                </div>
              ))}
            </div>
          )}
          {!loading && images.length === 12 && !noImagesFound && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
