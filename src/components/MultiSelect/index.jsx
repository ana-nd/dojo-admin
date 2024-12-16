import { useState } from "react";
import "./styles.css";

const MultiSelect = ({ options, onChange, placeholder = "Select options" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionChange = (option) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    <div className="multi-select">
      <div className="multi-select__dropdown" onClick={toggleDropdown}>
        <span>
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
        </span>
        <span className="multi-select__arrow">
          {isDropdownOpen ? "▲" : "▼"}
        </span>
      </div>
      {isDropdownOpen && (
        <div className="multi-select__options">
          {options.map((option) => (
            <label key={option} className="multi-select__option">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
