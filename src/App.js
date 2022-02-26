import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => {
    setToDo(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDo("");
    setToDos((currentArray) => [toDo, ...currentArray]);
  };

  return (
    <div>
      <h1>My To Dos({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={toDo}
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, id) => {
          return (
            <>
              <li key={id}>{item}</li>
              <button>Delete</button>
              <button>Modify</button>
            </>
          );
        })}
      </ul>
    </div>
  );
}
export default App;
