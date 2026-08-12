const candidato = {
  nome: "Andresa Lopes",
  vagaInteresse: "Front End",
  habilidades: ["HTML", "CSS", "JavaScript", "Git"],
  experienciaAnos: 1
};

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
  constructor(empresa, cargo, requisitos, nivel = "Júnior", remoto = false) {
    super(empresa, cargo, requisitos);
    this.nivel = nivel;
    this.remoto = remoto;
  }

  exibirResumo() {
    const modalidade = this.remoto ? "Remoto" : "Presencial";
    return `${super.exibirResumo()} | Nível ${this.nivel} | ${modalidade}`;
  }
}

const vagas = [
  new VagaFrontend("Tech Solutions", "Desenvolvedor Front-End Júnior", ["HTML", "CSS", "JavaScript", "Git", "React"], "Júnior", true),
  new VagaFrontend("WebDev", "Desenvolvedor Web Júnior", ["HTML", "CSS", "JavaScript", "Git"], "Júnior", false),
  new VagaFrontend("StartTech", "Front-End Developer", ["JavaScript", "React", "Git", "TypeScript"], "Júnior", true)
];

// Simula a resposta de um servidor, com o atraso da rede
function buscarVagasDoServidor() {
  return new Promise((resolve, reject) => {
    console.log("Buscando vagas...");
    setTimeout(() => {
      if (vagas.length === 0) {
        reject("O servidor não retornou nenhuma vaga.");
        return;
      }
      resolve(vagas);
    }, 1500);
  });
}

function criarContador() {
  let contador = 0;
  return function() {
    contador++;
    return contador;
  };
}

const proximoIdAnalise = criarContador();

function processarRelatorios(analises, callback) {
  for (let i = 0; i < analises.length; i++) {
    callback(analises[i]);
  }
}

function exibirAnalise(analise) {
  console.log(`[ Análise #${analise.id} ]`);
  console.log(`Vaga: ${analise.resumo}`);
  console.log(`Compatibilidade: ${analise.percentual}% (${analise.classificacao})`);
  console.log(`Habilidades a desenvolver: ${analise.faltantes.length > 0 ? analise.faltantes.join(", ") : "Nenhuma"}`);
  console.log("-----------------------------------\n");
}

function obterFaltantes(vaga, candidato) {
  return vaga.requisitos.filter(req => !candidato.habilidades.includes(req));
}

function calcularCompatibilidade(vaga, faltantes) {
  const total = vaga.requisitos.length;
  const atendidos = total - faltantes.length;

  return Math.round((atendidos / total) * 100);
}

function classificarCompatibilidade(porcentagem) {
  if (porcentagem >= 80) return "Alta compatibilidade";
  if (porcentagem >= 50) return "Média compatibilidade";
  return "Baixa compatibilidade";
}

// Quanto mais vagas exigem a habilidade, mais alto ela fica na lista
function priorizarEstudos(listaFaltantes) {
  const contagem = {};

  for (let i = 0; i < listaFaltantes.length; i++) {
    const habilidade = listaFaltantes[i];
    if (contagem[habilidade]) {
      contagem[habilidade]++;
    } else {
      contagem[habilidade] = 1;
    }
  }

  const habilidades = Object.keys(contagem);
  habilidades.sort((a, b) => contagem[b] - contagem[a]);

  return habilidades.map((habilidade) => {
    const vezes = contagem[habilidade];
    return `${habilidade} (exigida em ${vezes} ${vezes > 1 ? "vagas" : "vaga"})`;
  });
}

function sugerirEstudos(listaFaltantes) {
  if (listaFaltantes.length === 0) {
    return "Você já preenche todos os requisitos dessas vagas!";
  }
  const prioridades = priorizarEstudos(listaFaltantes);
  return `Focar em: ${prioridades.join(" > ")}`;
}

async function rodarSimulador() {
  console.log("=== SKILLMATCH JS - ANÁLISE DE VAGAS ===\n");

  try {
    const listaVagas = await buscarVagasDoServidor();
    const tempoExperiencia = candidato.experienciaAnos === 1 ? "1 ano" : `${candidato.experienciaAnos} anos`;
    console.log(`\nCandidato: ${candidato.nome} | Área: ${candidato.vagaInteresse} | Experiência: ${tempoExperiencia}\n`);

    const todasTecnologiasFaltantes = [];

    const resultados = listaVagas.map((vaga) => {
      const id = proximoIdAnalise();
      const faltantes = obterFaltantes(vaga, candidato);
      const percentual = calcularCompatibilidade(vaga, faltantes);
      const classificacao = classificarCompatibilidade(percentual);

      todasTecnologiasFaltantes.push(...faltantes);

      return {
        id,
        resumo: vaga.exibirResumo(),
        percentual,
        classificacao,
        faltantes
      };
    });

    processarRelatorios(resultados, exibirAnalise);

    const vagaIdeal = resultados.reduce((melhor, atual) => {
      return atual.percentual > melhor.percentual ? atual : melhor;
    }, resultados[0]);

    console.log("=== RESULTADO DA TRIAGEM ===");
    console.log(`Melhor opção: ${vagaIdeal.resumo} (${vagaIdeal.percentual}% de match)`);
    console.log(`Recomendação de estudos: ${sugerirEstudos(todasTecnologiasFaltantes)}`);
  } catch (erro) {
    console.log(`Não foi possível gerar a análise: ${erro}`);
  }
}

rodarSimulador();
