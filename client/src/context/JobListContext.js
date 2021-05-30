import React, { useState, createContext } from "react";

export const JobListContext = createContext();

export const JobListContextProvider = (props) => {
  const [jobList, setJobList] = useState([]);

  const addJob = (job) => {
    setJobList([job, ...jobList]);
  };

  return (
    <JobListContext.Provider value={{ jobList, setJobList, addJob }}>
      {props.children}
    </JobListContext.Provider>
  );
};
