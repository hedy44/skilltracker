import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Ver lista de skills (Funcional)
app.get("/skills", async (req, res) => {
  const skills = await prisma.skill.findMany();
  res.json(skills);
});

// GET /skills/:id - Buscar uma skill por ID
app.get("/skills/:id", async (req, res) =>{
  const {id} = req.params;
  const skillId = Number(id);

  if(isNaN(skillId)){
    return res.status(400).json({ error: "Skill ID must be a number"});
  }

  try {
    const skill = await prisma.skill.findUnique({
      where: {id: skillId},
    });

    if(!skill){
      return res.status(400).json({ error: "Skill not found"});
    }
    res.json(skill);
    
  } catch (error) {
    return res.status(500).json({error: "Internal server error"});
  }
})

//Adicionar uma skill (Funcional)
app.post("/skills", async (req, res)=>{
  const {name, proficiency} = req.body;

  if(
    !name || typeof name !== "string" ||
    !proficiency || typeof proficiency !== "string"
    ) {
      return res.status(400).json({ error: "Missing or invalid fields"});
    }

    try {
      const newSkill = await prisma.skill.create({
        data: {
          name,
          proficiency,
        },
      });
      return res.status(201).json(newSkill);
    } catch (error) {
      return res.status(500).json({error: "Failed to create skill"});
    }
  })

  //EDITAR SKILLS
  app.put("/skills/:id", async (req, res)=>{
    const id= Number (req.params.id);
    const {name, proficiency} = req.body;

    if(!name || typeof name !== "string" || !proficiency || typeof proficiency !== "string"){
      return res.status(400).json({ error: "Missing or invalid fields"});
    }

    try {
      const updatedSkill = await prisma.skill.update({
      where: { id },
      data: { name, proficiency },
    });
    return res.json(updatedSkill);
    } catch (error) {
      return res.status(404).json({ error: "Skill not found or update failed"});
    }
  })

  //APAGAR SKILLs
  app.delete("/skills/:id", async (req, res)=>{
    const {id} = req.params;

    const skillId= Number(id);
    if(!skillId || isNaN(skillId)){
      return res.status(400).json({error: "Invalid skill ID"})
    }

    try {
      await prisma.skill.delete({ where: { id: skillId } });
      return res.status(204).send();

    } catch (error) {
      
       if (typeof error === "object" && error !== null && "code" in error) {
      if ((error as any).code === "P2025") {
        return res.status(404).json({ error: "Skill not found" });
      }
    }
    return res.status(500).json({ error: "Failed to delete skill" });
    }
  })

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
