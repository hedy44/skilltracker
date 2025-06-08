// Props: skill (objeto) e onRemove (função do pai)
type SkillCardProps = {
    skill: {id: number; name: string, proficiency: string};
    onRemove: (id: number) => void;
}

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
export default function SkillCard ({ skill, onRemove} : SkillCardProps){
    return ( 
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded mb-2">
            <span className="text-blue-600 font-semibold">{skill.name}</span>
            <span className={`text-xs px-2 py-1 rounded ${getProficiencyBadgeClass(skill.proficiency)}`}>
                {skill.proficiency}
             </span>
            <button 
                className="text-sm text-red-600 hover:underline"
                onClick={() => onRemove(skill.id)}>Remover</button>
        </div>
    )
}