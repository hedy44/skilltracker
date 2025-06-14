import { useState } from "react";

type SortOption = "alpha" | "proficiency";

type SortSelectProps = {
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
};

export default function SortSelect({ sortOption, setSortOption }: SortSelectProps) {
  return (
    <select
      id="sort"
      value={sortOption}
      onChange={e => setSortOption(e.target.value as SortOption)}
      className="px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="alpha">Alphabetical (A-Z)</option>
      <option value="proficiency">By proficiency</option>
    </select>
  );
}
