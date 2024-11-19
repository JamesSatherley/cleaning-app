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
      name: "Mop Floor",
      frequency: "weekly",
      description: "Mop the entire kitchen floor.",
    },
    {
      name: "Responsible for Kitchen Rubbish Bin",
      frequency: "weekly",
      description: "Make sure the Kitchen bin is clean and empty.",
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
      name: "Mop Floor",
      frequency: "weekly",
      description: "Mop the bathroom floor.",
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
      name: "Responsible for wheely bins",
      frequency: "weekly",
      description:
        "Take Wheely bins out on a Monday Evening. Glass and Reclyding change weekly. If you're unsure which week it is, message the group chat.",
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
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
