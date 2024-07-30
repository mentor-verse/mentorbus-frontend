import { useState } from 'react';

export function Filter() {
  const [mainFilter, setMainFilter] = useState<string>("all");

  const handleMainFilterChange = (filter: string) => {
    setMainFilter(filter);
  };

  return (
    <>
      <label className="filter_btn_label">
        <input
          className="filter_btn"
          type="radio"
          value="all"
          checked={mainFilter === "all"}
          onChange={() => handleMainFilterChange("all")}
        />
        전체 멘토 목록
      </label>
    </>
  );
}
