import './propertyList.css';
import useFetch from '../../hooks/useFetch';
import { PROPERTY_IMG as images } from '../../constant/images';
import Loading from '../loading/Loading';

const PropertyList = () => {
  const { data, loading } = useFetch('/hotels/countByType');

  return (
    <div className="pList">
      {loading
        ? <Loading />
        : (
          <>
            {
              data && images.map((img, idx) => (
                <div className="pListItem" key={idx}>
                  <img
                    src={img}
                    alt=""
                    className="pListImg"
                  />
                  <div className="pListTitles">
                    <h1>{data[idx]?.type}</h1>
                    <h2>{data[idx]?.count} {data[idx]?.type}</h2>
                  </div>
                </div>
              ))
            }
          </>
        )
      }
    </div>
  );
};

export default PropertyList;
