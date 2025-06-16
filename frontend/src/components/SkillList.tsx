import { useState } from "react";
import SkillCard from "./SkillCard";

type Skill = {
  id: number;
  name: string;
  proficiency: string;
};


type SkillListProps = {
  skills: Skill[];
  filteredSkills: Skill[];
  onRemove: (id: number) => void;
  setEditingId: (id: number | null) => void;
  editingId: number | null;
  onSave: (id: number, newName: string, newProficiency: string) => void;
};


export default function SkillList({
  skills,
  filteredSkills,
  onRemove,
  setEditingId,
  editingId,
  onSave,
}: SkillListProps) {
  if (skills.length === 0) {
    return <p className="text-gray-400 mt-4">No skills added yet. Add your first skill!</p>;
  }
  if (filteredSkills.length === 0) {
    return <p className="text-gray-400 mt-4">No skills match your search.</p>;
  }
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 w-full transition-all">
      {skills.map(skill => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onRemove={onRemove}
          setEditingId={setEditingId}
          editingId={editingId}
          onSave={onSave}
        />
      ))}
    </div>
  );
}