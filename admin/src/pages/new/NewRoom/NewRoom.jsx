import './new.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { roomInputs } from '../../../formSource';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/loading/Loading';

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);

  const { data, loading } = useFetch('/hotels');

  const handleSelect = ({ target: { value } }) => {
    setHotelId(value);
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'rooms') {
      setRooms(value);
    } else {
      setInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(',').map((room) => ({ number: room }));
    try {
      const newRoom = {
        ...info,
        roomNumbers,
      };

      await axios.post(`/rooms/${hotelId}`, newRoom);
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
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
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
                <label>Rooms</label>
                <textarea
                  placeholder="give comma between room numbers"
                  name="rooms"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  name="hotelId"
                  onChange={handleSelect}
                >
                  {
                    loading
                      ? <Loading />
                      : !!data && data.map((option) => {
                      return <option key={option._id} value={option._id}>{option.name}</option>;
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

export default NewRoom;
