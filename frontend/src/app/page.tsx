"use client";
import { useState, useEffect } from "react";
import Greeting from "../components/Greeting";
import SkillCard from "../components/SkillCard";

// ===============================
// TYPE DEFINITIONS (sempre no topo)
// ===============================
type Skill = {
  id: number;
  name: string;
  proficiency: string;
};
// ===============================
// COMPONENTE PRINCIPAL (Home)
// ===============================
export default function Home() {
  // ===============================
  // ESTADO GLOBAL DO COMPONENTE
  // ===============================
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [proficiency, setProficiency] = useState('');
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // ===============================
  // FUNÇÕES AUXILIARES
  // ===============================
  // Limpa o nome do utilizador
  const resetName = () => setName("");

  // Adiciona uma nova skill à lista
  function handleAddSkill() {
    
    setErro('');
    if (!newSkill.trim()) {
      setErro('A skill nao pode ser vazia');
      return;
    }
    
    if(newSkill.trim().length <2 ) {
      setErro('A skill deve ter no minimo 3 letras');
      return;
    }
    if (skills.some(skill => skill.name.toLowerCase() == newSkill.trim().toLowerCase())){
      setErro('Essa skill ja existe');
      return;
    }

    if (!proficiency) {
    setErro("Skill proficiency is required.");
    return;
    }

    setSuccess("Skill added successfully!");
    setTimeout(() => setSuccess(''), 2000);

  const novaSkill = { id: Date.now(), name: newSkill, proficiency };
    setSkills([...skills, novaSkill]);
    setNewSkill('');
    setProficiency('');
  }

  function handleRemoveSkill(id: number) {
    // Filtra o array para tirar o skill com o id indicado
    setSkills(skills.filter((skill) => skill.id !== id));
  }

  function handleSaveEdit(id: number, newName: string, newProficiency: string) {
  setSkills(skills =>
    skills.map(skill =>
      skill.id === id
        ? { ...skill, name: newName, proficiency: newProficiency }
        : skill
    )
  );
  setEditingId(null);
   setSuccess("Skill updated successfully!");
  setTimeout(() => setSuccess(''), 2000);
}

  
 
  // ===============================
  // EFEITOS COLATERAIS (useEffect)
  // ===============================

  useEffect(() => {
     // Carrega skills do localStorage ao montar
  const saved = localStorage.getItem('skills');
  if (saved) setSkills(JSON.parse(saved));
}, []);
  // Guarda as skills no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  

    

  
  return (
    <main className="max-w-2xl mx-auto p-6">
      {/* HEADER */}
      <h1  className="text-4xl font-bold text-center mb-4 text-blue-700">Skilltracker MVP</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          className="ml-2 px-4 py-2 bg-red-700 rounded hover:bg-gray-300 mb-2"
          onClick={resetName}>Reset Name
        </button>
      </div>
      
      <Greeting name={name} message="Ready to start your skill journey?" />

      <p>
        Welcome! This is the beginning of a visionary skill tracking platform.
      </p>
      {/* ERROR MESSAGE AND SUCCESS MESSAGE */}
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
      {/* NOVA SKILL */}
      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Nova skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-fuchsia-300 text-blue-900"
          value={proficiency}
          onChange={e => setProficiency(e.target.value)}
        >
          <option value="">Choose one...</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddSkill}>
            Adicionar Skill
        </button>
        

      </div>
      {/* LISTA DE SKILLS */}
      <h2 className="text-2xl font-semibold mb-2">My Skills</h2>
      <div>
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onRemove={handleRemoveSkill}
            setEditingId={setEditingId}
            editingId={editingId}
            onSave={handleSaveEdit} 
          />
        ))}
      </div>
    </main>
  );
}
