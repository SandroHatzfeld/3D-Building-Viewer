import { useState, useEffect } from "react";
import { pointsOfInterest } from "./poi.js";
import useRoom from "./store/useRoom.js";

export default function Interface() {
  const poi = pointsOfInterest;
  const [activeRoom, setActiveRoom] = useState(null);

  const resetRoom = useRoom((state) => state.reset);
  const viewDetail = useRoom((state) => state.viewDetail);
  const viewRoom = useRoom((state) => state.viewRoom);

  const setRoom = (room) => {
    if (room == activeRoom) {
      resetRooms();
    } else {
      setActiveRoom(room);
      viewRoom(room);
      viewDetail();
    }
  };

  const resetRooms = () => {
    resetRoom();
    setActiveRoom(null);
  };
  return (
    <>
      <div className="navWrapper">
        <div className="poiWrapper">
          <h1>Hauptgebäude</h1>
          {poi.map((poi) => (
            <div name={poi.name} key={poi.id}>
              <h2>{poi.name}</h2>
              <ul>
                {poi.rooms &&
                  poi.rooms.map((room, index) => (
                    <li
                      className={`${activeRoom == room.room ? "active" : ""}`}
                      key={index}
                      onClick={setRoom.bind(this, room.room)}
                    >
                      {room.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <button
          className={`backButton ${activeRoom ? "" : "hidden"}`}
          onClick={resetRooms}
        >
          <img
            title="Zurücksetzen"
            src="./textures/navigation-back-arrow-svgrepo-com.svg"
          />
        </button>
      </div>
    </>
  );
}
