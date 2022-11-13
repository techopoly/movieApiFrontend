// import logo from './logo.svg';
// import './App.css';
import "./movie.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8051/movies?title=make it happen";

function App() {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [year, setyear] = useState("");
  const [description, setdescription] = useState("");

  const [data, setData] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("data sending: ", {
      title: title,
      author: author,
      year: year,
      description: description,
    });
    axios
      .post("http://localhost:8051/createMovie", {
        title: title,
        author: author,
        year: year,
        description: description
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  let movieArray = [];
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      movieArray = response.data.data;
      console.log(movieArray);
      setData((prev) => {
        return movieArray;
      });
    });
  }, []);
  return (
    <>
      <h1>Movie list</h1>
      {data.length > 0 ? (
        data.map((element) => {
          return (
            <div>
              <h2>Movie Name: {element.title}</h2>
              <p>Movie Author: {element.title}</p>
              <p>Movie Description: {element.desc}</p>
            </div>
          );
        })
      ) : (
        <p>No Movie data found</p>
      )}
      <div>
        <h1>Crearte Movie</h1>
        <form>
          <input
            value={title}
            onChange={(e) => { console.log(e.target.value) 
              return settitle(e.target.value)}}
             
            placeholder="Title"
            type="text"
            name="title"
            required
          />
          <input
            value={author}
            onChange={(e) => setauthor(e.target.value)}
            placeholder="Author"
            type="text"
            name="author"
            required
          />
          <input
            value={year}
            onChange={(e) => setyear(e.target.value)}
            placeholder="Year"
            type="Year"
            name="Year"
           
          />
          <input
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Description"
            type="text"
            name="text"
          />
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
