import React, { useContext } from "react";
import { JobsCategoryContext } from "../context/JobsCategoryContext";

const CategoryFilter = ({
  filteredCategories,
  setFilteredCategories,
  setPage,
}) => {
  const categories = useContext(JobsCategoryContext);

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
