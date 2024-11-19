import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Job {
  name: string;
  frequency: "weekly" | "monthly";
  description: string;
}

interface JobDetailsProps {
  room: string;
  person: string;
  currentWeekKey: string;
  includeMonthlyJobs: boolean;
}

const jobs: Record<string, Job[]> = {
  Kitchen: [
    {
      name: "Clean Surfaces",
      frequency: "weekly",
      description: "Wipe down all surfaces and counters.",
    },
    {
      name: "Clean Microwave",
      frequency: "monthly",
      description: "Remove stains and clean the interior.",
    },
    {
      name: "Mop Floor",
      frequency: "weekly",
      description: "Mop the entire kitchen floor.",
    },
  ],
  Bathroom: [
    {
      name: "Clean Sink",
      frequency: "weekly",
      description: "Scrub and rinse the sink.",
    },
    {
      name: "Scrub Shower",
      frequency: "monthly",
      description: "Clean shower tiles and remove limescale.",
    },
    {
      name: "Mop Floor",
      frequency: "weekly",
      description: "Mop the bathroom floor.",
    },
  ],
  "Living Room": [
    {
      name: "Vacuum Entire House",
      frequency: "weekly",
      description: "Vacuum all rooms, including hallway.",
    },
    {
      name: "Dust Shelves",
      frequency: "weekly",
      description: "Remove dust from all surfaces and shelves.",
    },
    {
      name: "Clean Windows",
      frequency: "monthly",
      description: "Wipe down and clean all windows.",
    },
  ],
};

const JobDetails: React.FC<JobDetailsProps> = ({
  room,
  person,
  currentWeekKey,
  includeMonthlyJobs,
}) => {
  const [checklist, setChecklist] = useLocalStorage<Record<string, boolean>>(
    `${currentWeekKey}-${person}-${room}`,
    {}
  );

  const roomJobs = jobs[room];

  const filteredJobs = roomJobs.filter((job) => {
    if (job.frequency === "weekly") return true;
    if (job.frequency === "monthly") return includeMonthlyJobs;
    return false;
  });

  const toggleJob = (jobName: string) => {
    setChecklist({
      ...checklist,
      [jobName]: !checklist[jobName],
    });
  };

  return (
    <ul>
      {filteredJobs.map((job, index) => (
        <li key={index}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              checked={checklist[job.name] || false}
              onChange={() => toggleJob(job.name)}
            />
            <div>
              <strong>{job.name}</strong>: {job.description}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default JobDetails;
