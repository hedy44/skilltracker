"use client";
import { useState, useEffect } from "react";
import Greeting from "../components/Greeting";
import SkillCard from "../components/SkillCard";
import SkillSearch from "../components/SkillSearch";
import SkillForm from "../components/SkillForm";
import ProficiencyFilter from "../components/ProficiencyFilter";
import SkillList from '../components/SkillList'
import SortSelect from "../components/SortSelect";
import ExportSkills from "../components/ExportSkills";

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
  const [sortOption, setSortOption] = useState<'alpha' | 'proficiency'>('alpha');
  const [filter, setFilter] = useState<"" | "Beginner" | "Intermediate" | "Advanced">("");
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);


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
      setTimeout(() => setErro(''), 5000);
      return;
    }
    
    if(newSkill.trim().length <2 ) {
      setErro('A skill deve ter no minimo 3 letras');
      setTimeout(() => setErro(''), 5000);
      return;
    }
    if (skills.some(skill => skill.name.toLowerCase() == newSkill.trim().toLowerCase())){
      setErro('Essa skill ja existe');
      setTimeout(() => setErro(''), 5000);
      return;
    }

    if (!proficiency) {
    setErro("Skill proficiency is required.");
    setTimeout(() => setErro(''), 5000);
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
    // 1. Confirmação antes de remover
    const confirmed = window.confirm("Queres mesmo remover a skill?");
    if(!confirmed) return; //Se nao confirmar , sai da função
    // Filtra o array para tirar o skill com o id indicado
    // 2. Remove mesmo se confirmar
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

 function getSkillsSorted() {
  const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    if (sortOption === "alpha") {
      return [...skills].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOption === "proficiency") {
      const order = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
      return [...skills].sort(
        (a, b) =>
          order[a.proficiency as keyof typeof order] -
          order[b.proficiency as keyof typeof order]);
    }
    return skills;
  }

  
 
  // ===============================
  // EFEITOS COLATERAIS (useEffect)
  // ===============================
  useEffect(() => {
     setLoading(true);
     setTimeout(() => {
      // Carrega skills do localStorage ao montar
        const saved = localStorage.getItem('skills');
        if (saved) setSkills(JSON.parse(saved));
        setLoading(false);
        setHydrated(true); // Sinaliza que já carregou
     }, 800 );
     
}, []);
  // Guarda as skills no localStorage sempre que mudam
  useEffect(() => {
    if (hydrated){
      localStorage.setItem("skills", JSON.stringify(skills));
    }
    
  }, [skills, hydrated]);

  useEffect(() => {
  const savedName = localStorage.getItem("username");
  if (savedName) setName(savedName);
}, []);

 useEffect(() => {
  localStorage.setItem("username", name);
}, [name]);

  

    

  
  return (
    <main className="w-full max-w-xl sm:max-w-2xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1  className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-blue-700">Skilltracker MVP</h1>
      {/* INPUT NOME + BOTÃO RESET */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          className="w-full sm:w-auto px-3 sm:px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 sm:mb-0"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          className="sm:ml-2 px-4 py-2 bg-red-700 rounded hover:bg-gray-300 mb-2 sm:mb-0"
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
     <SkillForm
        newSkill={newSkill}
        setNewSkill={setNewSkill}
        proficiency={proficiency}
        setProficiency={setProficiency}
        onAddSkill={handleAddSkill}
        erro={erro}
        success={success}
      />
     
        {/* CRITÉRIO DE ORDENAÇÃO, FILTRO, SEARCH */}
      <div className="mb-4 flex flex-wrap gap-2 w-full">
        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
        {/* Proficiency Filter*/}
        <ProficiencyFilter filter={filter} setFilter={setFilter} />
        {/* Search bar*/}
        <SkillSearch search={search} setSearch={setSearch} />
      </div>
      

      
      {/* LISTA DE SKILLS */}
      <ExportSkills skills={skills} />
      <h2 className="text-2xl font-semibold mb-2">My Skills</h2>
      <div className="w-full">
        {loading ? (
          <div className="text-center text-blue-600 my-6">Loading…</div>
        ) : (
        <SkillList
        skills={skills}
        filteredSkills={getSkillsSorted()
        .filter(skill => filter === "" || skill.proficiency === filter)
        .filter(skill => skill.name.toLowerCase().includes(search.toLowerCase()))
        }
        onRemove={handleRemoveSkill}
        setEditingId={setEditingId}
        editingId={editingId}
        onSave={handleSaveEdit}
      />
      )}
      </div>
    </main>
  );
}
