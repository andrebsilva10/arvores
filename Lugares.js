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
var Lugar = /** @class */ (function () {
    function Lugar(continente, pais, cidade) {
        this.continente = continente;
        this.pais = pais || '';
        this.cidade = cidade || '';
    }
    return Lugar;
}());
var Mundo = /** @class */ (function () {
    function Mundo() {
        this.arvore = {};
    }
    Mundo.prototype.adicionar = function (lugar) {
        if (!lugar.continente) {
            return;
        }
        var continente = lugar.continente, pais = lugar.pais, cidade = lugar.cidade;
        this.arvore[continente] = this.arvore[continente] || {};
        if (pais) {
            this.arvore[continente][pais] = this.arvore[continente][pais] || [];
            if (cidade && !this.arvore[continente][pais].includes(cidade)) {
                this.arvore[continente][pais].push(cidade);
            }
        }
    };
    Mundo.prototype.toString = function () {
        var resultado = 'Mundo\n';
        for (var continente in this.arvore) {
            resultado += "- ".concat(continente, "\n");
            var paises = this.arvore[continente];
            for (var pais in paises) {
                resultado += "  - ".concat(pais, "\n");
                var cidades = paises[pais];
                for (var _i = 0, cidades_1 = cidades; _i < cidades_1.length; _i++) {
                    var cidade = cidades_1[_i];
                    resultado += "    - ".concat(cidade, "\n");
                }
            }
        }
        return resultado;
    };
    Mundo.prototype.remover = function (lugar) {
        var continente = lugar.continente, pais = lugar.pais, cidade = lugar.cidade;
        if (this.arvore[continente]) {
            if (pais) {
                if (cidade) {
                    var cidades = this.arvore[continente][pais];
                    this.arvore[continente][pais] = cidades.filter(function (c) { return c !== cidade; });
                    if (this.arvore[continente][pais].length === 0) {
                        delete this.arvore[continente][pais];
                    }
                }
                else {
                    delete this.arvore[continente][pais];
                }
            }
            else {
                delete this.arvore[continente];
            }
        }
    };
    Mundo.prototype.buscar = function (lugar) {
        var _a;
        var continente = lugar.continente, pais = lugar.pais, cidade = lugar.cidade;
        if (this.arvore[continente]) {
            if (pais) {
                if (cidade) {
                    if ((_a = this.arvore[continente][pais]) === null || _a === void 0 ? void 0 : _a.includes(cidade)) {
                        return new Lugar(continente, pais, cidade);
                    }
                }
                else {
                    if (this.arvore[continente][pais]) {
                        return new Lugar(continente, pais);
                    }
                }
            }
            else {
                return new Lugar(continente);
            }
        }
        return null;
    };
    Mundo.prototype.editar = function (origem, destino) {
        var lugarOriginal = this.buscar(origem);
        if (lugarOriginal) {
            this.remover(origem);
            this.adicionar(destino);
        }
    };
    Mundo.prototype.obterFolhas = function () {
        var folhas = [];
        for (var continente in this.arvore) {
            for (var pais in this.arvore[continente]) {
                var cidades = this.arvore[continente][pais];
                if (cidades.length === 0) {
                    folhas.push(new Lugar(continente, pais));
                }
                else {
                    for (var _i = 0, cidades_2 = cidades; _i < cidades_2.length; _i++) {
                        var cidade = cidades_2[_i];
                        folhas.push(new Lugar(continente, pais, cidade));
                    }
                }
            }
        }
        return folhas;
    };
    return Mundo;
}());
var mundo = new Mundo();
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
