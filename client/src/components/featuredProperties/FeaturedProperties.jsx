import './featuredProperties.css';
import useFetch from '../../hooks/useFetch';
import { FEATURED_IMG as images } from '../../constant/images';

const FeaturedProperties = () => {
  const { data, loading, error, reFetch } = useFetch('/hotels?featured=true&limit=4');

  return (
    <div className="fp">
      {loading
        ? 'Loading, please waiting...'
        : (
          <>
            {data.map((item, idx) => (
              <div className="fpItem" key={item._id}>
                <img
                  src={images[idx]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                {
                  item.rating && (
                    <div className="fpRating">
                      <button>{item.rating}</button>
                      <span>Excellent</span>
                    </div>
                  )
                }
              </div>
            ))}
          </>
        )
      }
    </div>
  );
};

export default FeaturedProperties;
