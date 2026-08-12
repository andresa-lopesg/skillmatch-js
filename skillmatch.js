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

// Closure para contar quantas analises foram feitas
function criarContador() {
  let contador = 0;
  return function() {
    contador++;
    return contador;
  };
}

const proximoIdAnalise = criarContador();

// Callback simples
function processarRelatorio(vaga, callback) {
  return callback(vaga);
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

// Sugere o que estudar com base nos requisitos faltantes
function sugerirEstudos(listaFaltantes) {
  if (listaFaltantes.length === 0) {
    return "Você já preenche todos os requisitos dessas vagas!";
  }
  const tecnologiasUnicas = [...new Set(listaFaltantes)];
  return `Focar em: ${tecnologiasUnicas.join(", ")}`;
}

// Execução principal da aplicação
async function rodarSimulador() {
  console.log("=== SKILLMATCH JS - ANÁLISE DE VAGAS ===\n");
  
  const listaVagas = await buscarVagasDoServidor();
  console.log(`\nAnálise gerada para: ${candidato.nome}\n`);

  let todasTecnologiasFaltantes = [];

  const resultados = listaVagas.map((vaga) => {
    const id = proximoIdAnalise();
    const percentual = calcularCompatibilidade(vaga, candidato);
    const nivelMatch = classificarCompatibilidade(percentual);
    const faltantes = obterFaltantes(vaga, candidato);

    todasTecnologiasFaltantes.push(...faltantes);

    return {
      id,
      resumo: vaga.exibirResumo(),
      percentual,
      nivelMatch,
      faltantes
    };
  });

  resultados.forEach((res) => {
    console.log(`[ Análise #${res.id} ]`);
    console.log(`Vaga: ${res.resumo}`);
    console.log(`Compatibilidade: ${res.percentual}% (${res.nivelMatch})`);
    console.log(`Habilidades a desenvolver: ${res.faltantes.length > 0 ? res.faltantes.join(", ") : "Nenhuma"}`);
    console.log("-----------------------------------\n");
  });

  // Identifica a vaga com maior compatibilidade
  const vagaIdeal = resultados.reduce((melhor, atual) => {
    return atual.percentual > melhor.percentual ? atual : melhor;
  }, resultados[0]);

  console.log("=== RESULTADO DA TRIAGEM ===");
  console.log(`🎯 Melhor opção: ${vagaIdeal.resumo} (${vagaIdeal.percentual}% de match)`);
  console.log(`📚 Recomendação de estudos: ${sugerirEstudos(todasTecnologiasFaltantes)}`);
}

rodarSimulador();