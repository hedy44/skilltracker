import { useState } from "react";

type Proficiency = "" | "Beginner" | "Intermediate" | "Advanced";

type ProficiencyFilterProps = {
   filter: Proficiency;
  setFilter: (value: Proficiency) => void;
};

export default function ProficiencyFilter({ filter, setFilter }: ProficiencyFilterProps) {
  return (
    <select
      value={filter}
      onChange={e => setFilter(e.target.value as Proficiency)}
      className="px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All levels</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  );
}