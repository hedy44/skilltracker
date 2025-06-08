// Props: skill (objeto) e onRemove (função do pai)
type SkillCardProps = {
    skill: {id: number; name: string, proficiency: string};
    onRemove: (id: number) => void;
}


// Componente filho
export default function SkillCard ({ skill, onRemove} : SkillCardProps){
    return ( 
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded mb-2">
            <span className="text-blue-600 font-semibold">{skill.name}</span>
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{skill.proficiency}</span>
            <button 
                className="text-sm text-red-600 hover:underline"
                onClick={() => onRemove(skill.id)}>Remover</button>
        </div>
    )
}