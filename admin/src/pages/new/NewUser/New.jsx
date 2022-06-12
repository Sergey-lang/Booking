import './new.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import axios from 'axios';
import { createUploadData } from '../../../utils';
import { BASE_CLOUD_UPLOAD_URL } from '../../../constant/cloudinary';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const [info, setInfo] = useState('');

  const handleChange = ({ target: { value, name } }) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const data = createUploadData(file)
    try {
      const uploadResponse = await axios.post(BASE_CLOUD_UPLOAD_URL, data);
      const { url } = uploadResponse.data;

      const newUser = {
        ...info,
        img: url
      };

      await axios.post('/auth/register', newUser);
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
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              {inputs.map((input) => (
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

export default New;
