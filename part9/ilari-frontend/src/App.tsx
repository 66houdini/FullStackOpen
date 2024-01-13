import { useEffect, useState } from "react";
// import Form from "./components/Form"
import { Diary, Weather, Visibility, NewDiary } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [comment, setComment] = useState("");
  useEffect(() => {

    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const content = {date, visibility, weather, comment}
    createDiary(content as NewDiary).then (data => {
      setDiaries(diaries.concat(data))
    })
    setDate("")
    setVisibility("")
    setWeather("")
    setComment("")
  };
  return (
    <div>
      <h1>Typescript</h1>
      <div>
        <form onSubmit={handleSubmit}>
          date: <input type="date" onChange={(ev )=> setDate(ev.target.value)} /> <br />
          visibility great
          <input type="radio" value={Visibility.Great} onChange={(e) => setVisibility(e.target.value as Visibility)} /> good
          <input type="radio" value={Visibility.Good} onChange ={(e) => setVisibility(e.target.value as Visibility)} /> ok
          <input type="radio" value={Visibility.Ok} onChange={(e) => setVisibility(e.target.value as Visibility)} /> poor
          <input type="radio" value={Visibility.Poor} onChange={(e) => setVisibility(e.target.value as Visibility)} />  <br />
          weather sunny <input type="radio" value={Weather.Sunny} onChange={(e) => setWeather(e.target.value as Weather)} /> rainy
          <input type="radio" value={Weather.Rainy} onChange={(e) => setWeather(e.target.value as Weather)} /> cloudy
          <input type="radio" value={Weather.Cloudy} onChange={(e) => setWeather(e.target.value as Weather)} /> stormy
          <input type="radio" value={Weather.Stormy} onChange={(e) => setWeather(e.target.value as Weather)} /> windy
          <input type="radio" value={Weather.Windy} onChange={(e) => setWeather(e.target.value as Weather)} /> <br />
          comment: <input type="text" onChange={(e) => setComment(e.target.value)} /> <br />
          <button type="submit">add</button>
        </form>
      </div>
      <h3>Diary Entries</h3>
      {diaries.map((diary, index) => {
        return (
          <div key={index}>
            <h2>{diary.date}</h2>
            <p>
              visibility: {diary.visibility} <br />
              weather: {diary.weather} <br />
              comment: {diary?.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default App;
