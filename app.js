const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

const medicines = [
  { name: "Aspirin", content: ["Acetylsalicylic acid", "Paracetamol"] },
  { name: "Paracetamol", content: ["Acetaminophen"] },
  { name: "Ibuprofen", content: ["Ibuprofen"] },
  {
    name: "Amoxicillin",
    content: ["Amoxicillin trihydrate", "Clavulanic acid"],
  },
  { name: "Metformin", content: ["Metformin hydrochloride"] },
  { name: "Lisinopril", content: ["Lisinopril dihydrate"] },
  {
    name: "Simvastatin",
    content: [
      "Simvastatin",
      "Lactose",
      "Magnesium stearate",
      "Microcrystalline cellulose",
    ],
  },
  {
    name: "Paratusin",
    content: [
      "Paracetamol",
      "Pseudoephedrine",
      "Noscapine",
      "Ctm",
      "Guafenisin",
      "Succus Liquiritae",
      "Ethanol",
    ],
  },
  {
    name: "Cetirizine",
    content: [
      "Cetirizine hydrochloride",
      "Lactose monohydrate",
      "Microcrystalline cellulose",
      "Croscarmellose sodium",
      "Magnesium stearate",
      "Povidone",
      "Starch, pregelatinised",
      "Talc",
      "Titanium dioxide",
      "Macrogol 4000",
    ],
  },
  {
    name: "Omeprazole",
    content: [
      "Omeprazole",
      "Lactose monohydrate",
      "Maize starch",
      "Microcrystalline cellulose",
      "Magnesium stearate",
      "Sodium starch glycolate",
      "Talc",
      "Titanium dioxide",
      "Macrogol 4000",
    ],
  },
  {
    name: "Proris",
    content: [
      "Ibuprofen",
      "Paracetamol",
      "Pseudoephedrine",
      "Noscapine",
      "Ctm",
      "Guafenisin",
      "Succus Liquiritae",
      "Ethanol",
    ],
  },
];

app.post("/validasialergiobat", (req, res) => {
  const { resep, alergi } = req.body;
  const response = {
    resep: [],
  };
  for (let i = 0; i < medicines.length; i++) {
    for (j = 0; j < resep.length; j++) {
      if (medicines[i].name.toLowerCase() === resep[j].obat.toLowerCase()) {
        for (k = 0; k < medicines[i].content.length; k++) {
          for (l = 0; l < alergi.length; l++) {
            if (medicines[i].content[k].toLowerCase() === alergi[l].toLowerCase()) {
              response.resep.push({
                obat: resep[j].obat,
              });
            }
          }
        }
      }
    }
  }
  response.resep = response.resep.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.obat === thing.obat)
  );
  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
