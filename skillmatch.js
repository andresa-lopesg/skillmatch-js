// Perfil do candidato
const candidato = {
    nome: "Andresa Lopes",
    vagaInteresse: "Front End",
    habilidades: ["HTML", "CSS", "JavaScript", "Git"],
    experiencia: 0
};

// Modelagem das Vagas (POO)
class Vaga {
  constructor(empresa, cargo, requisitos) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

class VagaFrontend extends Vaga {
  constructor(empresa, cargo, requisitos, nivel = "Júnior") {
    super(empresa, cargo, requisitos);
    this.nivel = nivel;
  }
}

// Lista de vagas disponíveis
const vagas = [
  new VagaFrontend("Tech Solutions", "Desenvolvedor Front-End Júnior", ["HTML", "CSS", "JavaScript", "Git", "React"]),
  new VagaFrontend("WebDev", "Desenvolvedor Web Júnior", ["HTML", "CSS", "JavaScript", "Git"]),
  new VagaFrontend("StartTech", "Front-End Developer", ["JavaScript", "React", "Git", "TypeScript"])
];

console.log(`Perfil de ${candidato.nome} carregado.`);
console.log(`${vagas.length} vagas cadastradas.`);
