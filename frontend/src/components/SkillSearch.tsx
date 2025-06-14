import { useState } from "react";

type SkillSearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SkillSearch ({search, setSearch}: SkillSearchProps){
    return(
        <input
                className=" px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

    )

}
{/* SEARCH ENGINE*/}
     
 