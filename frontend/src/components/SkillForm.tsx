import { useState } from "react";

type SkillFormProps = {
  newSkill: string;
  setNewSkill: (value: string) => void;
  proficiency: string;
  setProficiency: (value: string) => void;
  onAddSkill: () => void;
  erro: string;
  success: string;
};

export default function SkillForm({
  newSkill,
  setNewSkill,
  proficiency,
  setProficiency,
  onAddSkill,
  erro,
  success,
}: SkillFormProps) {
  return (
    <form 
      className=" mb-4 flex flex-col sm:flex-row gap-2 
        items-stretch sm:items-end w-full"
      onSubmit={e => { e.preventDefault(); onAddSkill(); }}
        >
           {/* INPUT DA NOVA SKILL */}
      <input
        className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        type="text"
        placeholder="Nova skill"
        value={newSkill}
        onChange={e => setNewSkill(e.target.value)}
      />
       {/* SELECT DA PROFICIENCY */}
      <select
        className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-fuchsia-300 text-blue-900 w-full sm:w-auto"
        value={proficiency}
        onChange={e => setProficiency(e.target.value)}
      >
        <option value="">Choose one...</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        type="submit">
          Adicionar Skill
      </button>
      {/* Mostra erros/success do form se quiseres aqui */}
      
    </form>
  );
}