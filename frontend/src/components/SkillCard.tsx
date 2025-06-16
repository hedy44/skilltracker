import { useState } from "react";// ===============================
// TYPE DEFINITIONS (sempre no topo)
// ===============================
type SkillCardProps = {
    skill: {id: number; name: string, proficiency: string};
    onRemove: (id: number) => void;
    setEditingId: (id: number | null) => void;
    editingId: number | null;
    onSave: (id: number, newName: string, newProficiency: string) => void;
}// ===============================
  // ESTADO GLOBAL DO COMPONENTE
  // ===============================


// ===============================
  // FUNÇÕES AUXILIARES
  // ===============================
//Decide a cor do badge de acordo com a proficiencia
  function getProficiencyBadgeClass(level: string) {
  switch (level) {
    case 'Beginner':
      return "bg-green-100 text-green-800";
    case 'Intermediate':
      return "bg-yellow-100 text-yellow-800";
    case 'Advanced':
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
} 

// Componente filho
export default function SkillCard ({ 
  skill, 
  onRemove, 
  setEditingId, 
  editingId,
  onSave
} : SkillCardProps){

      // Estados temporários SÓ se estiver a editar esta skill
  const [editName, setEditName] = useState(skill.name);
  const [editProficiency, setEditProficiency] = useState(skill.proficiency);

  // Se esta skill está a ser editada, mostra os inputs
  if (editingId === skill.id) {
    return (
      <div className="flex flex-wrap items-center gap-2 w-full max-w-2xl mx-auto bg-purple-200 px-4 py-2 rounded mb-2 shadow border border-blue-200">
        <input
          className="flex-1 min-w-[120px] px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-black text-white"
          value={editName}
          onChange={e => setEditName(e.target.value)}
        />
        {/* Proficiency */}
          <select
          className="sm:mx-4 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 bg-purple-100"
          value={editProficiency}
          onChange={e => setEditProficiency(e.target.value)}
        >
          <option value="">Proficiency</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        {/* Botões */}
        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto">
          <button
          className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition"
          onClick={() => onSave(skill.id, editName, editProficiency)}
        >
          Guardar
        </button>
        <button
           className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
          onClick={() => setEditingId(null)}
        >
          Cancelar
        </button>
        </div>
        
      </div>
    );
  }

// VISUALIZAÇÃO NORMAL
    return ( 
        <div className="flex flex-wrap items-center gap-2 w-full max-w-2xl mx-auto bg-white px-4 py-2 rounded mb-2 shadow border border-gray-200">
          {/* Nome */}
            <span className="flex-1 min-w-[120px] text-blue-700 font-semibold">{skill.name}</span>
         {/* Badge */}
            <span className={`text-xs px-2 py-1 rounded ${getProficiencyBadgeClass(skill.proficiency)}`}>
                {skill.proficiency}
            </span>
             
          {/* Botões */}
          <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto">
            <button 
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setEditingId(skill.id)}
                >
                Editar
            </button>

            <button 
                className="text-sm text-red-600 hover:underline"
                onClick={() => onRemove(skill.id)}>Remover</button>
          </div>
            
        </div>
    )
}