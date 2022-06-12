import './new.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import axios from 'axios';
import { hotelInputs } from '../../../formSource';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/loading/Loading';
import { createUploadData } from '../../../utils';
import { BASE_CLOUD_UPLOAD_URL } from '../../../constant/cloudinary';

const NewHotel = () => {
  const [files, setFiles] = useState('');
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { data, loading } = useFetch('/rooms');

  const handleChange = ({ target: { value, name } }) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = ({ target: { selectedOptions } }) => {
    const values = Array.from(selectedOptions, (option) => option.value);
    setRooms(values);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(Object.values(files).map(async (file) => {
        const data = createUploadData(file);
        const uploadResponse = await axios.post(BASE_CLOUD_UPLOAD_URL, data);
        const { url } = uploadResponse.data;
        return url;
      }));

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post('/hotels', newHotel);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    name={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select
                  name="featured"
                  onChange={handleChange}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select
                  name="rooms"
                  multiple
                  onChange={handleSelect}
                >
                  {
                    loading
                      ? <Loading />
                      : !!data && data.map((option) => {
                      return <option key={option._id} value={option._id}>{option.title}</option>;
                    })
                  }
                </select>
              </div>
              <div style={{ width: '40%' }}>
                <button onClick={handleSend}>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
