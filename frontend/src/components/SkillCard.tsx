type SkillCardProps = {
    skill: {id: number; name: string};
    onRemove: (id: number) => void;
}

export default function SkillCard ({ skill, onRemove} : SkillCardProps){
    return ( 
        <div>
            <strong>{skill.name}</strong>
      <button onClick={() => onRemove(skill.id)}>Remover</button>
        </div>
    )
}