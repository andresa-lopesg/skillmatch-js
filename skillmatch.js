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

// Simula busca em servidor via API
function buscarVagasDoServidor() {
  return new Promise((resolve) => {
    console.log("Buscando vagas...");
    setTimeout(() => {
      resolve(vagas);
    }, 1500);
  });
}

// Execução principal da aplicação
async function rodarSimulador() {
  console.log("=== SKILLMATCH JS - ANÁLISE DE VAGAS ===\n");

  const listaVagas = await buscarVagasDoServidor();
  console.log(`\nAnálise gerada para: ${candidato.nome}`);
  console.log(`${listaVagas.length} vagas recebidas do servidor.\n`);

  listaVagas.forEach((vaga) => {
    console.log(vaga.exibirResumo());
  });
}

rodarSimulador();
