// Props: skill (objeto) e onRemove (função do pai)
type SkillCardProps = {
    skill: {id: number; name: string};
    onRemove: (id: number) => void;
}
// Componente filho
export default function SkillCard ({ skill, onRemove} : SkillCardProps){
    return ( 
        <div>
            <strong>{skill.name}</strong>
      <button onClick={() => onRemove(skill.id)}>Remover</button>
        </div>
    )
}