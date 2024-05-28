class No<T> {
    public esquerda: No<T> | null = null;
    public direita: No<T> | null = null;

    constructor(public valor: T) {}
}

class ArvoreBinariaDeBusca<T> {
    public raiz: No<T> | null = null;

    public inserir(valor: T): void {
        const novoNo = new No(valor);
        if (this.raiz === null) {
            this.raiz = novoNo;
        } else {
            this.inserirNo(this.raiz, novoNo);
        }
    }

    private inserirNo(no: No<T>, novoNo: No<T>): void {
        if (novoNo.valor < no.valor) {
            if (no.esquerda === null) {
                no.esquerda = novoNo;
            } else {
                this.inserirNo(no.esquerda, novoNo);
            }
        } else {
            if (no.direita === null) {
                no.direita = novoNo;
            } else {
                this.inserirNo(no.direita, novoNo);
            }
        }
    }

    public buscar(valor: T): No<T> | null {
        return this.buscarNo(this.raiz, valor);
    }

    private buscarNo(no: No<T> | null, valor: T): No<T> | null {
        if (no === null) {
            return null;
        } else if (valor < no.valor) {
            return this.buscarNo(no.esquerda, valor);
        } else if (valor > no.valor) {
            return this.buscarNo(no.direita, valor);
        } else {
            return no;
        }
    }

    public remover(valor: T): void {
        this.raiz = this.removerNo(this.raiz, valor);
    }

    private removerNo(no: No<T> | null, valor: T): No<T> | null {
        if (no === null) {
            return null;
        }
        if (valor < no.valor) {
            no.esquerda = this.removerNo(no.esquerda, valor);
            return no;
        } else if (valor > no.valor) {
            no.direita = this.removerNo(no.direita, valor);
            return no;
        } else {
            // Nó com apenas um filho ou nenhum
            if (no.esquerda === null) {
                return no.direita;
            } else if (no.direita === null) {
                return no.esquerda;
            }

            // Nó com dois filhos: Obter o sucessor (menor no da subárvore direita)
            no.valor = this.valorMinimo(no.direita);
            no.direita = this.removerNo(no.direita, no.valor);
        }
        return no;
    }

    private valorMinimo(no: No<T>): T {
        let valorMin = no.valor;
        while (no.esquerda !== null) {
            valorMin = no.esquerda.valor;
            no = no.esquerda;
        }
        return valorMin;
    }

    public emOrdem(): void {
        this.percorrerEmOrdem(this.raiz);
    }

    private percorrerEmOrdem(no: No<T> | null): void {
        if (no !== null) {
            this.percorrerEmOrdem(no.esquerda);
            console.log(no.valor);
            this.percorrerEmOrdem(no.direita);
        }
    }

    public altura(): number {
        return this.calcularAltura(this.raiz);
    }

    private calcularAltura(no: No<T> | null): number {
        if (no === null) {
            return -1;
        }
        return 1 + Math.max(this.calcularAltura(no.esquerda), this.calcularAltura(no.direita));
    }
}

// Uso da árvore binária de busca
const arvore = new ArvoreBinariaDeBusca<number>();
arvore.inserir(3);
arvore.inserir(1);
arvore.inserir(4);
arvore.inserir(2);

console.log(arvore.buscar(4)); // Saída: No { valor: 4, esquerda: null, direita: null }

console.log('Árvore em ordem antes da remoção:');
arvore.emOrdem(); // Saída: 1, 2, 3, 4

arvore.remover(3);
console.log('Árvore em ordem após a remoção:');
arvore.emOrdem(); // Saída: 1, 2, 4
