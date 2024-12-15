import { useState, useEffect } from "react";

const MonthPicker = (props) => {
  const { onChange = () => {} } = props;
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(
    `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}`
  );

  useEffect(() => {
    const [year, month] = selectedDate.split("-");
    onChange(parseInt(month) - 1, parseInt(year));
    //eslint-disable-next-line
  }, [selectedDate]);

  const handleChange = (e) => {
    const newDate = e.target.value;
    if (newDate !== selectedDate) {
      setSelectedDate(newDate);
    }
  };

  return (
    <div>
      <input type="month" value={selectedDate} onChange={handleChange} />
    </div>
  );
};

export default MonthPicker;
