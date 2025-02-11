import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import FamilyRepository from "./FamilyRepository.js";
import Families from "./Families.js";

dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.json());

const familyRepository = new FamilyRepository();

// Criar uma família
app.post("/cadastrador", async (req, res) => {
  try {
    const { parents_name, address, number, children_name, children_age } =
      req.body;
    const family = new Families(
      null,
      parents_name,
      address,
      number,
      children_name,
      children_age
    );
    const id = await familyRepository.create(family);
    res.status(201).json({ id });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao criar família", message: error.message });
  }
});

// Listar todas as famílias
app.get("/cadastrador", async (req, res) => {
  try {
    const families = await familyRepository.getAll();
    res.json(families);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar famílias", message: error.message });
  }
});

// Buscar uma família por ID
app.get("/cadastrador/:id", async (req, res) => {
  try {
    const family = await familyRepository.getById(req.params.id);
    if (!family)
      return res.status(404).json({ error: "Família não encontrada" });
    res.json(family);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar família", message: error.message });
  }
});

// Atualizar uma família
app.put("/cadastrador/:id", async (req, res) => {
  try {
    const { parents_name, address, number, children_name, children_age } =
      req.body;
    const family = new Families(
      req.params.id,
      parents_name,
      address,
      number,
      children_name,
      children_age
    );
    await familyRepository.update(req.params.id, family);
    res.json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar família", message: error.message });
  }
});

app.patch("/frequencias", async (req,res) =>{
  try {
    const {id} = req.body
    const today = new Date().toISOString().split("T")[0]

    await familyRepository.addAttendance(id,today);

    res.json({ success: true})

  } catch (error) {
    res.status(500).json({ error: "erro ao marcar frequencia ", message: error.message})
  }
});

// Deletar uma família
app.delete("/cadastrador/:id", async (req, res) => {
  try {
    await familyRepository.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar família", message: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
