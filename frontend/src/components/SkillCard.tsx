// Props: skill (objeto) e onRemove (função do pai)
type SkillCardProps = {
    skill: {id: number; name: string};
    onRemove: (id: number) => void;
}
// Componente filho
export default function SkillCard ({ skill, onRemove} : SkillCardProps){
    return ( 
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded mb-2">
            <span className="text-blue-600 font-semibold">{skill.name}</span>
            <button 
                className="text-sm text-red-600 hover:underline"
                onClick={() => onRemove(skill.id)}>Remover</button>
        </div>
    )
}