class Pessoa {
    dataNascimento: Date;
    nome: string;
    teknonym: string;
    sexo: string;
    filhos: Pessoa[];

    constructor(dataNascimento: Date, nome: string, sexo: string, filhos: Pessoa[] = []) {
        this.dataNascimento = dataNascimento;
        this.nome = nome;
        this.teknonym = '';
        this.sexo = sexo;
        this.filhos = filhos;
    }

    atribuirTeknonym(): void {
        const [descendente, distanciaGeracao] = this.encontrarDescendenteMaisDistante();
        if (descendente) {
            this.teknonym = this.construirTeknonym(descendente, distanciaGeracao);
        }
    }

    private encontrarDescendenteMaisDistante(): [Pessoa | null, number] {
        let maxDistancia = 0;
        let descendenteMaisVelho: Pessoa | null = null;

        for (let i = 0; i < this.filhos.length; i++) {
            const filho = this.filhos[i];
            const [descendente, distancia] = filho.encontrarDescendenteMaisDistanteHelper(1);

            if (descendente && distancia > maxDistancia) {
                maxDistancia = distancia;
                descendenteMaisVelho = descendente;
            } else if (
                descendente &&
                distancia === maxDistancia &&
                descendenteMaisVelho &&
                descendente.dataNascimento < descendenteMaisVelho.dataNascimento
            ) {
                descendenteMaisVelho = descendente;
            }
        }

        return [descendenteMaisVelho, maxDistancia];
    }

    private encontrarDescendenteMaisDistanteHelper(distanciaAtual: number): [Pessoa | null, number] {
        if (this.filhos.length === 0) {
            return [this, distanciaAtual];
        }

        let maxDistancia = distanciaAtual;
        let descendenteMaisVelho: Pessoa | null = this;

        for (let i = 0; i < this.filhos.length; i++) {
            const filho = this.filhos[i];
            const [descendente, distancia] = filho.encontrarDescendenteMaisDistanteHelper(distanciaAtual + 1);

            if (descendente && distancia > maxDistancia) {
                maxDistancia = distancia;
                descendenteMaisVelho = descendente;
            } else if (
                descendente &&
                distancia === maxDistancia &&
                descendenteMaisVelho &&
                descendente.dataNascimento < descendenteMaisVelho.dataNascimento
            ) {
                descendenteMaisVelho = descendente;
            }
        }

        return [descendenteMaisVelho, maxDistancia];
    }

    private construirTeknonym(descendente: Pessoa, distanciaGeracao: number): string {
        const relacao = this.obterTermoRelacao(distanciaGeracao);
        return `${relacao} de ${descendente.nome}`;
    }

    private obterTermoRelacao(distanciaGeracao: number): string {
        let termo = '';
        if (this.sexo === 'm') {
            switch (distanciaGeracao) {
                case 1:
                    termo = 'pai';
                    break;
                case 2:
                    termo = 'avô';
                    break;
                default:
                    termo = `bisavô${distanciaGeracao - 2}`;
                    break;
            }
        } else {
            switch (distanciaGeracao) {
                case 1:
                    termo = 'mãe';
                    break;
                case 2:
                    termo = 'avó';
                    break;
                default:
                    termo = `bisavó${distanciaGeracao - 2}`;
                    break;
            }
        }
        return termo;
    }
}

// Exemplo de uso:
const h = new Pessoa(new Date('1047-01-01'), 'h', 'f');
const e = new Pessoa(new Date('1043-11-01'), 'e', 'f');
const f = new Pessoa(new Date('1045-01-01'), 'f', 'f');
const g = new Pessoa(new Date('1046-01-01'), 'g', 'm');
const d = new Pessoa(new Date('1023-11-28'), 'd', 'm', [e, f, g]);
const b = new Pessoa(new Date('1020-01-01'), 'b', 'f', [h]);
const c = new Pessoa(new Date('1021-02-01'), 'c', 'm');
const a = new Pessoa(new Date('1000-01-01'), 'a', 'm', [b, c, d]);

// Atribuindo teknonyms
const familia = [a, b, c, d, e, f, g, h];
for (let i = 0; i < familia.length; i++) {
    familia[i].atribuirTeknonym();
}

// Verificando resultados
console.log(a.teknonym); // 'avô de e'
console.log(b.teknonym); // 'mãe de h'
console.log(c.teknonym); // ''
console.log(d.teknonym); // 'pai de e'
console.log(e.teknonym); // ''
console.log(f.teknonym); // ''
console.log(g.teknonym); // ''
console.log(h.teknonym); // ''
