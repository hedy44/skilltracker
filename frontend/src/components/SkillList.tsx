import { useState } from "react";
import SkillCard from "./SkillCard";

type Skill = {
  id: number;
  name: string;
  proficiency: string;
};


type SkillListProps = {
  skills: Skill[];
  onRemove: (id: number) => void;
  setEditingId: (id: number | null) => void;
  editingId: number | null;
  onSave: (id: number, newName: string, newProficiency: string) => void;
};


export default function SkillList({
  skills,
  onRemove,
  setEditingId,
  editingId,
  onSave,
}: SkillListProps) {
  if (!skills.length) return <p className="text-gray-400 mt-4">No skills found.</p>;

  return (
    <div>
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