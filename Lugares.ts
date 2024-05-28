/* Em implementação de árvore, é comum a utilização de classes para representar os nós. Cada nó pode ter um valor e uma lista de nós filhos. A classe abaixo representa nós de uma árvore genérica. Implemente o método toString() que deve retornar uma string com a representação de continentes, países e cidades. A classe Mundo representa a raiz da árvore. Implemente o método adicionar(Lugar lugar) que deve adicionar um lugar na árvore. Implemente o método toString() que deve retornar uma string com a representação de continentes, países e cidades.

Classe Lugar
Atributos (string)
- Continente
- País
- Cidade

Classe Mundo
Método
- adicionar(Lugar lugar);
- toString();

Exemplos de Lugares
- América do Norte \ Estados Unidos \ Nova Iorque
- América do Norte \ Estados Unidos \ Nova Jérsei
- América do Sul \ Colômbia
- América do Sul \ Brasil \ Curitiba
- América do Sul \ Argentina
- Europa \ Inglaterra \ Londres
- América do Sul \ Brasil \ Florianópolis
- Europa \ Itália \ Roma
- Europa \ Inglaterra \ Lancaster
- Ásia

Exemplo de retorno do toString()
Mundo
- América do Norte
  - Estados Unidos
    - Nova Iorque
    - Nova Jérsei

- América do Sul
  - Brasil
    - Curitiba
    - Florianópolis
  - Argentina

- Europa
  - Inglaterra
    - Londres
    - Lancaster
  - Itália
    - Roma

- Ásia */

class Lugar {
    continente: string;
    pais: string;
    cidade: string;

    constructor(continente: string, pais?: string, cidade?: string) {
        this.continente = continente;
        this.pais = pais || '';
        this.cidade = cidade || '';
    }
}

class Mundo {
    private arvore: { [continente: string]: { [pais: string]: string[] } };

    constructor() {
        this.arvore = {};
    }

    adicionar(lugar: Lugar): void {
        if (!lugar.continente) {
            return;
        }

        const { continente, pais, cidade } = lugar;

        this.arvore[continente] = this.arvore[continente] || {};

        if (pais) {
            this.arvore[continente][pais] = this.arvore[continente][pais] || [];

            if (cidade && !this.arvore[continente][pais].includes(cidade)) {
                this.arvore[continente][pais].push(cidade);
            }
        }
    }

    toString(): string {
        let resultado = 'Mundo\n';
        for (const continente in this.arvore) {
            resultado += `- ${continente}\n`;

            const paises = this.arvore[continente];
            for (const pais in paises) {
                resultado += `  - ${pais}\n`;

                const cidades = paises[pais];
                for (const cidade of cidades) {
                    resultado += `    - ${cidade}\n`;
                }
            }
        }
        return resultado;
    }

    remover(lugar: Lugar): void {
        const { continente, pais, cidade } = lugar;

        if (this.arvore[continente]) {
            if (pais) {
                if (cidade) {
                    const cidades = this.arvore[continente][pais];
                    this.arvore[continente][pais] = cidades.filter((c) => c !== cidade);

                    if (this.arvore[continente][pais].length === 0) {
                        delete this.arvore[continente][pais];
                    }
                } else {
                    delete this.arvore[continente][pais];
                }
            } else {
                delete this.arvore[continente];
            }
        }
    }

    buscar(lugar: Lugar): Lugar | null {
        const { continente, pais, cidade } = lugar;

        if (this.arvore[continente]) {
            if (pais) {
                if (cidade) {
                    if (this.arvore[continente][pais]?.includes(cidade)) {
                        return new Lugar(continente, pais, cidade);
                    }
                } else {
                    if (this.arvore[continente][pais]) {
                        return new Lugar(continente, pais);
                    }
                }
            } else {
                return new Lugar(continente);
            }
        }

        return null;
    }

    editar(origem: Lugar, destino: Lugar): void {
        const lugarOriginal = this.buscar(origem);

        if (lugarOriginal) {
            this.remover(origem);
            this.adicionar(destino);
        }
    }

    obterFolhas(): Lugar[] {
        const folhas: Lugar[] = [];

        for (const continente in this.arvore) {
            for (const pais in this.arvore[continente]) {
                const cidades = this.arvore[continente][pais];
                if (cidades.length === 0) {
                    folhas.push(new Lugar(continente, pais));
                } else {
                    for (const cidade of cidades) {
                        folhas.push(new Lugar(continente, pais, cidade));
                    }
                }
            }
        }

        return folhas;
    }
}

const mundo = new Mundo();

mundo.adicionar(new Lugar('América do Norte', 'Estados Unidos', 'Nova Iorque'));
mundo.adicionar(new Lugar('América do Norte', 'Estados Unidos', 'Nova Jérsei'));
mundo.adicionar(new Lugar('América do Sul', 'Colômbia'));
mundo.adicionar(new Lugar('América do Sul', 'Brasil', 'Curitiba'));
mundo.adicionar(new Lugar('América do Sul', 'Argentina'));
mundo.adicionar(new Lugar('América do Sul', 'Brasil', 'Florianópolis'));
mundo.adicionar(new Lugar('Europa', 'Itália', 'Roma'));
mundo.adicionar(new Lugar('Europa', 'Inglaterra', 'Londres'));
mundo.adicionar(new Lugar('Europa', 'Inglaterra', 'Lancaster'));
mundo.adicionar(new Lugar('Ásia'));

mundo.adicionar(new Lugar('América do Sul', 'Brasil', 'Guarapuava'));
mundo.adicionar(new Lugar('América do Norte', 'Canadá', 'Toronto'));
mundo.adicionar(new Lugar('América do Norte', 'Canadá', 'Vancouver'));
mundo.adicionar(new Lugar('América do Norte', 'México', 'Cidade do México'));
mundo.adicionar(new Lugar('Europa', 'França', 'Paris'));
mundo.adicionar(new Lugar('Europa', 'França', 'Marselha'));
mundo.adicionar(new Lugar('Oceania', 'Austrália', 'Sydney'));
mundo.adicionar(new Lugar('Oceania', 'Nova Zelândia', 'Auckland'));
mundo.adicionar(new Lugar('África', 'África do Sul', 'Cidade do Cabo'));
mundo.adicionar(new Lugar('África', 'Nigéria', 'Lagos'));
mundo.adicionar(new Lugar('Europa', 'Alemanha', 'Berlim'));
mundo.adicionar(new Lugar('Europa', 'Alemanha', 'Hamburgo'));
mundo.adicionar(new Lugar('Ásia', 'Japão', 'Tóquio'));
mundo.adicionar(new Lugar('Ásia', 'China', 'Pequim'));
mundo.adicionar(new Lugar('Ásia', 'China', 'Xangai'));

mundo.adicionar(new Lugar('América do Sul', 'Uruguai'));
mundo.adicionar(new Lugar('', 'Brasil', 'Guarapuava'));
mundo.adicionar(new Lugar('Ásia', ''));
mundo.adicionar(new Lugar('Europa', 'Itália'));
mundo.adicionar(new Lugar('Ásia', 'Japão'));
mundo.adicionar(new Lugar('Ásia', 'China'));
mundo.adicionar(new Lugar('Oceania', '', 'Sydney'));
mundo.adicionar(new Lugar('Ásia', 'Japão', 'Tóquio'));
mundo.adicionar(new Lugar('Europa'));

mundo.adicionar(new Lugar('', 'Brasil', 'Curitiba'));
mundo.adicionar(new Lugar('África', '', ''));
mundo.adicionar(new Lugar('Europa', ''));
mundo.adicionar(new Lugar('Europa', 'Itália'));

mundo.remover(new Lugar('América do Norte', 'Estados Unidos', 'Nova Jérsei')); // Remove cidade específica
mundo.remover(new Lugar('América do Sul', 'Brasil')); // Remove país com todas as cidades
mundo.remover(new Lugar('Ásia')); // Remove continente

// console.log(mundo.buscar(new Lugar('América do Norte', 'Estados Unidos', 'Nova Iorque'))); // Deve retornar o lugar
// console.log(mundo.buscar(new Lugar('América do Sul', 'Brasil', 'Curitiba'))); // Não deve retornar (foi removido)
// console.log(mundo.buscar(new Lugar('Oceania', 'Nova Zelândia', 'Auckland'))); // Deve retornar o lugar
// console.log(mundo.buscar(new Lugar('Ásia'))); // Não deve retornar (foi removido)

mundo.editar(new Lugar('América do Norte', 'Canadá', 'Toronto'), new Lugar('América do Norte', 'Canadá', 'Montreal'));
mundo.editar(new Lugar('Europa', 'Itália', 'Roma'), new Lugar('Europa', 'Itália', 'Milão'));

/* console.log(mundo.toString()); */

console.log(mundo.obterFolhas());

/* COM adicionar RECEBENDO STRING */
/* class Lugar {
    continente: string;
    pais: string;
    cidade: string;

    constructor(continente: string, pais?: string, cidade?: string) {
        this.continente = continente;
        this.pais = pais || '';
        this.cidade = cidade || '';
    }
}

class Mundo {
    private arvore: { [continente: string]: { [pais: string]: string[] } };

    constructor() {
        this.arvore = {};
    }

    adicionar(lugarStr: string): void {
        const partes = lugarStr.split(' \\ ');
        const continente = partes[0] || '';
        const pais = partes.length > 1 ? partes[1] : '';
        const cidade = partes.length > 2 ? partes[2] : '';
        const lugar = new Lugar(continente, pais, cidade);

        if (!lugar.continente) {
            return;
        }

        this.arvore[continente] = this.arvore[continente] || {};

        if (pais) {
            this.arvore[continente][pais] = this.arvore[continente][pais] || [];

            if (cidade && !this.arvore[continente][pais].includes(cidade)) {
                this.arvore[continente][pais].push(cidade);
            }
        }
    }

    toString(): string {
        let resultado = 'Mundo\n';
        for (const continente in this.arvore) {
            resultado += `- ${continente}\n`;

            const paises = this.arvore[continente];
            for (const pais in paises) {
                resultado += `  - ${pais}\n`;

                const cidades = paises[pais];
                for (const cidade of cidades) {
                    resultado += `    - ${cidade}\n`;
                }
            }
        }
        return resultado;
    }

    remover(lugar: Lugar): void {
        const { continente, pais, cidade } = lugar;

        if (this.arvore[continente]) {
            if (pais) {
                if (cidade) {
                    const cidades = this.arvore[continente][pais];
                    this.arvore[continente][pais] = cidades.filter((c) => c !== cidade);

                    if (this.arvore[continente][pais].length === 0) {
                        delete this.arvore[continente][pais];
                    }
                } else {
                    delete this.arvore[continente][pais];
                }
            } else {
                delete this.arvore[continente];
            }
        }
    }

    buscar(lugar: Lugar): Lugar | null {
        const { continente, pais, cidade } = lugar;

        if (this.arvore[continente]) {
            if (pais) {
                if (cidade) {
                    if (this.arvore[continente][pais]?.includes(cidade)) {
                        return new Lugar(continente, pais, cidade);
                    }
                } else {
                    if (this.arvore[continente][pais]) {
                        return new Lugar(continente, pais);
                    }
                }
            } else {
                return new Lugar(continente);
            }
        }

        return null;
    }

    editar(origem: Lugar, destino: Lugar): void {
        const lugarOriginal = this.buscar(origem);

        if (lugarOriginal) {
            this.remover(origem);
            this.adicionar(`${destino.continente} \\ ${destino.pais} \\ ${destino.cidade}`);
        }
    }

    obterFolhas(): Lugar[] {
        const folhas: Lugar[] = [];

        for (const continente in this.arvore) {
            for (const pais in this.arvore[continente]) {
                const cidades = this.arvore[continente][pais];
                if (cidades.length === 0) {
                    folhas.push(new Lugar(continente, pais));
                } else {
                    for (const cidade of cidades) {
                        folhas.push(new Lugar(continente, pais, cidade));
                    }
                }
            }
        }

        return folhas;
    }
}

const mundo = new Mundo();

mundo.adicionar('América do Norte \\ Estados Unidos \\ Nova Iorque');
mundo.adicionar('América do Norte \\ Estados Unidos \\ Nova Jérsei');
mundo.adicionar('América do Sul \\ Colômbia');
mundo.adicionar('América do Sul \\ Brasil \\ Curitiba');
mundo.adicionar('América do Sul \\ Argentina');
mundo.adicionar('Europa \\ Inglaterra \\ Londres');
mundo.adicionar('América do Sul \\ Brasil \\ Florianópolis');
mundo.adicionar('Europa \\ Itália \\ Roma');
mundo.adicionar('Europa \\ Inglaterra \\ Lancaster');
mundo.adicionar('Ásia');

console.log(mundo.toString());
 */
