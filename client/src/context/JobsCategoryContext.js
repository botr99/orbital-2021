import React, { useEffect, useState, createContext } from "react";
import JobsApi from "../apis/JobsApi";

export const JobsCategoryContext = createContext();

export const JobsCategoryContextProvider = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await JobsApi.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <JobsCategoryContext.Provider value={categories}>
      {props.children}
    </JobsCategoryContext.Provider>
  );
};
