type SkillCardProps = {
    skill: {id: number; name: string}
}

export default function SkillCard ({ skill} : SkillCardProps){
    return ( 
        <div>
            <strong>{skill.name}</strong>
        </div>
    )
}