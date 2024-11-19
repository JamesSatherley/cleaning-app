import React, { useState } from "react";
import dayjs from "dayjs";
import JobDetails from "./JobDetails";

const people = ["James", "Kailyn", "Taeler"];
const rooms = ["Kitchen", "Bathroom", "Living Room"];

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().startOf("week"));

  const nextWeek = () => setCurrentDate(currentDate.add(1, "week"));
  const prevWeek = () => setCurrentDate(currentDate.subtract(1, "week"));

  const weekIndex = Math.floor(
    currentDate.diff(dayjs().startOf("year"), "day") / 7
  );

  const rotatePeople = (): { [room: string]: string } => {
    const assignments: { [room: string]: string } = {};
    rooms.forEach((room, index) => {
      const personIndex = (weekIndex + index) % people.length;
      assignments[room] = people[personIndex];
    });
    return assignments;
  };

  const assignments = rotatePeople();

  const startOfWeek = currentDate.format("DD MMM");
  const endOfWeek = currentDate.endOf("week").format("DD MMM");
  const currentWeekKey = `${startOfWeek}-${endOfWeek}`;

  const clearAllStorage = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all stored data? This action cannot be undone."
      )
    ) {
      localStorage.clear();
      alert("All data has been cleared!");
      window.location.reload();
    }
  };

  return (
    <div>
      <h2>
        Week {startOfWeek} - {endOfWeek}
      </h2>
      <div className="nav-buttons">
        <button onClick={prevWeek}>&lt; Previous</button>
        <button onClick={nextWeek}>Next &gt;</button>
      </div>
      <ul>
        {rooms.map((room) => (
          <li key={room}>
            <span style={{ display: "flex" }}>
              <strong>{room}</strong>&nbsp;&nbsp;
              <span style={{ paddingTop: "1.5px" }}>
                —&nbsp;&nbsp;
                {assignments[room]}
              </span>
            </span>
            <JobDetails
              room={room}
              person={assignments[room]}
              currentWeekKey={currentWeekKey}
              includeMonthlyJobs={currentDate.date() <= 7}
            />
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={clearAllStorage}
        >
          Clear All Storage
        </button>
      </div>
    </div>
  );
};

export default Schedule;
