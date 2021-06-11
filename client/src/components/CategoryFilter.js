import React, { useEffect, useState } from "react";
import JobsApi from "../apis/JobsApi";

const CategoryFilter = ({
  filteredCategories,
  setFilteredCategories,
  setPage,
}) => {
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

  const handleChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setFilteredCategories([...filteredCategories, e.target.value]);
    } else {
      setFilteredCategories(
        filteredCategories.filter((elem) => elem !== e.target.value)
      );
    }
    setPage(1);
  };

  return (
    <>
      {categories.length > 0 &&
        categories.map((category) => (
          <div className="form-check form-check-inline" key={category}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              {category}
            </label>
          </div>
        ))}
    </>
  );
};

export default CategoryFilter;
