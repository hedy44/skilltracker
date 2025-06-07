"use client";
import { useState, useEffect } from "react";
import Greeting from "../components/Greeting";
import SkillCard from "../components/SkillCard";

// Componente principal (pai)
export default function Home() {
  // 1. Estado dos skills (array de objetos)
  const [name, setName] = useState("");
  const resetName = () => setName("");
  const [skills, setSkills] = useState([
  { id: 1, name: "React" },
  { id: 2, name: "Typescript" },
  { id: 3, name: "Docker" },
]);
  const [newSkill, setNewSkill] = useState("");
  const[erro, setErro] = useState('');




  useEffect(() => {
  const saved = localStorage.getItem('skills');
  if (saved) setSkills(JSON.parse(saved));
}, []);
  // Efeitos colaterais (ex: guardar no LocalStorage)
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  // 2. Função para remover uma skill (passa o id do skill a remover)
  function handleRemoveSkill(id: number) {
    // Filtra o array para tirar o skill com o id indicado
    setSkills(skills.filter((skill) => skill.id !== id));
  }

  function handleAddSkill() {
    // Limpa o erro antes de validar
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

    const novaSkill = { id: Date.now(), name: newSkill };
    setSkills([...skills, novaSkill]);
    setNewSkill('');
  }

  return (
    <main>
      <h1>Skilltracker MVP</h1>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={resetName}>Reset Name</button>
      <Greeting name={name} message="Ready to start your skill journey?" />
      <p>
        Welcome! This is the beginning of a visionary skill tracking platform.
      </p>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <input
        type="text"
        placeholder="Nova skill"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
      />
      <button onClick={handleAddSkill}>Adicionar Skill</button>
      <h2>My Skills</h2>
      <div>
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onRemove={handleRemoveSkill}
          />
        ))}
      </div>
    </main>
  );
}
