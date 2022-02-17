import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);
  // console.log("I run all the time");
  useEffect(() => {
    console.log("Counter Change");
  }, [counter]);
  useEffect(() => {
    console.log("Keyword Change");
  }, [keyword]);

  return (
    <div>
      <h1 className={styles.title}>{counter}</h1>
      <input type="text" onChange={onChange} placeholder="keyword" />
      {/* <Button text={"Continue"} /> */}
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
