import React, { useState, createContext } from "react";

export const JobListContext = createContext();

export const JobListContextProvider = (props) => {
  const [jobList, setJobList] = useState([]);

  return (
    <JobListContext.Provider value={{ jobList, setJobList }}>
      {props.children}
    </JobListContext.Provider>
  );
};
