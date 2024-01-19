import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEdit() {
    setIsEditing((editing) => !editing);
  }
  function handleChangeName(e) {
    setPlayerName(e.target.value);
  }

  return (
    <li>
      <span className="player">
        {
          //prettier-ignore
          isEditing ? <input type="text" required value={playerName} onChange={handleChangeName}/> : <span className="player-name">{playerName}</span>
        }

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
