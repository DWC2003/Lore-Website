import { useState } from 'react';
import './App.css'

function TimelineEvent({ yearGroup }) {
  const [idx, setIdx] = useState(0);

  const current = yearGroup[idx];

  function nextEvent(e) {
    e.preventDefault();
    e.stopPropagation();

    setIdx((prev) => (prev + 1) % yearGroup.length)
  }

  function prevEvent(e) {
    e.preventDefault();
    e.stopPropagation();

    setIdx((prev) => (prev - 1 + yearGroup.length) % yearGroup.length)
  }

  let mybutton = ">"
  return (
    <div className="timeline-item">
      <div className="timeline-marker" />
      <button className="timeline-content">
        <h2>{current.title}</h2>
        <p>Year {current.year}</p>
        <p>{current.description}</p>

        {yearGroup.length > 1 && (
          <div className="card-controls">
            <button type="button" className="change-card" onClick={prevEvent}>
              {"<"}
            </button>

            <span className="counter">
              {idx + 1}/{yearGroup.length}
            </span>

            <button type="button" className="change-card" onClick={nextEvent}>
              {">"}
            </button>
          </div>
        )}
      </button>
    </div>
  )
}



function App() {
  const [events, setEvents] = useState([
    [
      {
      title: "The End of the World",
      year: 0,
      description: "The end of the old world and beginning of the new."
      }
    ]
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

    let found = false

    const updated = events.map((yearGroup) => {
    // yearGroup is like: [{year: 2020, ...}, {year: 2020, ...}]
    if (Number(yearGroup[0].year) === Number(year)) {
      found = true
      return [...yearGroup, newEvent] // add to that year's list
    }
      return yearGroup
    })

    setEvents(updated)

    if (found === false){
      const newEventArray = [newEvent]
      const updatedEvents = [...events, newEventArray].sort(
        (a, b) => Number(a[0].year) - Number(b[0].year)
      )

      setEvents(updatedEvents)
    }

    

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
            yearGroup = {event}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;