import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getNextCollectionDate } from "../utils/dateUtils";

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

const startDates = {
  rubbish: new Date(2025, 0, 27),
  glass: new Date(2025, 0, 21),
  recycling: new Date(2025, 0, 28),
};

const jobs: Record<string, Job[]> = {
  Kitchen: [
    {
      name: "Clean Surfaces",
      frequency: "weekly",
      description: "Wipe down all surfaces and counters.",
    },
    {
      name: "Responsible for Kitchen Bins",
      frequency: "weekly",
      description:
        "Make sure the inside Kitchen bins are clean and emptied regurarly into the wheelie bins outside.",
    },
    {
      name: "Clean Oven",
      frequency: "monthly",
      description: "Clean stove top and wipe out interior",
    },
    {
      name: "Clean Microwave",
      frequency: "monthly",
      description: "Remove stains and clean the interior.",
    },
  ],
  Bathroom: [
    {
      name: "Clean Sink",
      frequency: "weekly",
      description: "Clean the sink.",
    },
    {
      name: "Responsible for Bathroom Rubbish Bin",
      frequency: "weekly",
      description: "Make sure the Bathroom bin is clean and empty.",
    },
    {
      name: "Clean shower",
      frequency: "weekly",
      description: "Clean the bathroom.",
    },
    {
      name: "Clean toilet",
      frequency: "weekly",
      description: "Clean the Toilet.",
    },
  ],
  "Living Room": [
    {
      name: "Vacuum Group Areas",
      frequency: "weekly",
      description: "Vacuum all group rooms, including hallway.",
    },
    {
      name: "Mop or vacuum kitchen, bathroom and laundry",
      frequency: "weekly",
      description:
        "Some weeks they will need mop, and others vacuum. Up to you :)",
    },
    {
      name: "Responsible for wheelie and glass bins being emptied",
      frequency: "weekly",
      description: `The next rubbish day is ${
        getNextCollectionDate("rubbish", startDates).message
      }. The next recycling day is ${
        getNextCollectionDate("recycling", startDates).message
      }. The next glass day is ${
        getNextCollectionDate("glass", startDates).message
      }`,
    },
    {
      name: "Dust Shelves",
      frequency: "monthly",
      description: "Remove dust from general surfaces.",
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
          <label style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <input
              type="checkbox"
              checked={checklist[job.name] || false}
              onChange={() => toggleJob(job.name)}
            />
            <div>
              <strong>{job.name}</strong>
              {job.description}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default JobDetails;
