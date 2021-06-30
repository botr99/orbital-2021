import { useQuery } from "react-query";
import { getCategories } from "../apis/JobsApi";

const CategoryFilter = ({ selectedCategories, setSelectedCategories }) => {
  const { data: categories } = useQuery("categories", getCategories);

  const handleChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, e.target.value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((elem) => elem !== e.target.value)
      );
    }
  };

  return (
    <>
      {categories?.map((category) => (
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
