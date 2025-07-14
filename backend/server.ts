import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/skills", async (req, res) => {
  const skills = await prisma.skill.findMany();
  res.json(skills);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
