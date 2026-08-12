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

// Verifica habilidades que o candidato não tem
function obterFaltantes(vaga, candidato) {
  return vaga.requisitos.filter(req => !candidato.habilidades.includes(req));
}

// Calcula o percentual de compatibilidade
function calcularCompatibilidade(vaga, candidato) {
  const faltantes = obterFaltantes(vaga, candidato);
  const total = vaga.requisitos.length;
  const atendidos = total - faltantes.length;

  return Math.round((atendidos / total) * 100);
}

// Classifica por faixa percentual
function classificarCompatibilidade(porcentagem) {
  if (porcentagem >= 80) return "Alta compatibilidade";
  if (porcentagem >= 50) return "Média compatibilidade";
  return "Baixa compatibilidade";
}

// Execução principal da aplicação
async function rodarSimulador() {
  console.log("=== SKILLMATCH JS - ANÁLISE DE VAGAS ===\n");

  const listaVagas = await buscarVagasDoServidor();
  console.log(`\nAnálise gerada para: ${candidato.nome}\n`);

  const resultados = listaVagas.map((vaga) => {
    const percentual = calcularCompatibilidade(vaga, candidato);
    const nivelMatch = classificarCompatibilidade(percentual);
    const faltantes = obterFaltantes(vaga, candidato);

    return {
      resumo: vaga.exibirResumo(),
      percentual,
      nivelMatch,
      faltantes
    };
  });

  resultados.forEach((res) => {
    console.log(`Vaga: ${res.resumo}`);
    console.log(`Compatibilidade: ${res.percentual}% (${res.nivelMatch})`);
    console.log(`Habilidades a desenvolver: ${res.faltantes.join(", ")}`);
    console.log("-----------------------------------\n");
  });
}

rodarSimulador();
