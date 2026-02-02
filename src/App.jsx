import { useState } from 'react';
import './App.css'

function TimelineEvent({ title, year, description }) {
  return (
    <div className="timeline-item">
      <div className="timeline-marker" />
      <div className="timeline-content">
        <h2>{title}</h2>
        <p>Year {year}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}



function App() {
  const [events, setEvents] = useState([
    {
      title: "The Fall of Avalon",
      year: "?",
      description: "The end of the old world and beginning of the new."
    }
  ])

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault()

    const newEvent = {
      title,
      year,
      description
    }

    setEvents([...events, newEvent])

    setTitle('')
    setYear('')
    setDescription('')
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Event title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
          
        <input
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button type="submit">Add Event</button>
      </form>

      <h1>Timeline</h1>
      <div className="timeline">
        {events.map((event, index) => (
          <TimelineEvent
            key={index}
            title={event.title}
            year={event.year}
            description={event.description}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;