import React, { useState } from "react";
import dayjs from "dayjs";
import JobDetails from "./JobDetails";

const people = ["James", "Caitlin", "Taylor"];
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

  const startOfWeek = currentDate.format("DD/MMM");
  const endOfWeek = currentDate.endOf("week").format("DD/MMM");

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
            <strong>{room}</strong> - {assignments[room]}
            <JobDetails
              room={room}
              currentDate={currentDate}
              includeMonthlyJobs={currentDate.date() <= 7}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
