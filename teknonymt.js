var Pessoa = /** @class */ (function () {
    function Pessoa(dataNascimento, nome, sexo, filhos) {
        if (filhos === void 0) { filhos = []; }
        this.dataNascimento = dataNascimento;
        this.nome = nome;
        this.teknonym = '';
        this.sexo = sexo;
        this.filhos = filhos;
    }
    Pessoa.prototype.atribuirTeknonym = function () {
        var _a = this.encontrarDescendenteMaisDistante(), descendente = _a[0], distanciaGeracao = _a[1];
        if (descendente) {
            this.teknonym = this.construirTeknonym(descendente, distanciaGeracao);
        }
    };
    Pessoa.prototype.encontrarDescendenteMaisDistante = function () {
        var maxDistancia = 0;
        var descendenteMaisVelho = null;
        for (var i = 0; i < this.filhos.length; i++) {
            var filho = this.filhos[i];
            var _a = filho.encontrarDescendenteMaisDistanteHelper(1), descendente = _a[0], distancia = _a[1];
            if (descendente && distancia > maxDistancia) {
                maxDistancia = distancia;
                descendenteMaisVelho = descendente;
            }
            else if (descendente &&
                distancia === maxDistancia &&
                descendenteMaisVelho &&
                descendente.dataNascimento < descendenteMaisVelho.dataNascimento) {
                descendenteMaisVelho = descendente;
            }
        }
        return [descendenteMaisVelho, maxDistancia];
    };
    Pessoa.prototype.encontrarDescendenteMaisDistanteHelper = function (distanciaAtual) {
        if (this.filhos.length === 0) {
            return [this, distanciaAtual];
        }
        var maxDistancia = distanciaAtual;
        var descendenteMaisVelho = this;
        for (var i = 0; i < this.filhos.length; i++) {
            var filho = this.filhos[i];
            var _a = filho.encontrarDescendenteMaisDistanteHelper(distanciaAtual + 1), descendente = _a[0], distancia = _a[1];
            if (descendente && distancia > maxDistancia) {
                maxDistancia = distancia;
                descendenteMaisVelho = descendente;
            }
            else if (descendente &&
                distancia === maxDistancia &&
                descendenteMaisVelho &&
                descendente.dataNascimento < descendenteMaisVelho.dataNascimento) {
                descendenteMaisVelho = descendente;
            }
        }
        return [descendenteMaisVelho, maxDistancia];
    };
    Pessoa.prototype.construirTeknonym = function (descendente, distanciaGeracao) {
        var relacao = this.obterTermoRelacao(distanciaGeracao);
        return "".concat(relacao, " de ").concat(descendente.nome);
    };
    Pessoa.prototype.obterTermoRelacao = function (distanciaGeracao) {
        var termo = '';
        if (this.sexo === 'm') {
            switch (distanciaGeracao) {
                case 1:
                    termo = 'pai';
                    break;
                case 2:
                    termo = 'avô';
                    break;
                default:
                    termo = "bisav\u00F4".concat(distanciaGeracao - 2);
                    break;
            }
        }
        else {
            switch (distanciaGeracao) {
                case 1:
                    termo = 'mãe';
                    break;
                case 2:
                    termo = 'avó';
                    break;
                default:
                    termo = "bisav\u00F3".concat(distanciaGeracao - 2);
                    break;
            }
        }
        return termo;
    };
    return Pessoa;
}());
// Exemplo de uso:
var h = new Pessoa(new Date('1047-01-01'), 'h', 'f');
var e = new Pessoa(new Date('1043-11-01'), 'e', 'f');
var f = new Pessoa(new Date('1045-01-01'), 'f', 'f');
var g = new Pessoa(new Date('1046-01-01'), 'g', 'm');
var d = new Pessoa(new Date('1023-11-28'), 'd', 'm', [e, f, g]);
var b = new Pessoa(new Date('1020-01-01'), 'b', 'f', [h]);
var c = new Pessoa(new Date('1021-02-01'), 'c', 'm');
var a = new Pessoa(new Date('1000-01-01'), 'a', 'm', [b, c, d]);
// Atribuindo teknonyms
var familia = [a, b, c, d, e, f, g, h];
for (var i = 0; i < familia.length; i++) {
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
