class SkillTree {
    tree: number[];
    required: number[];

    constructor(tree: number[], required: number[]) {
        this.tree = tree;
        this.required = required;
    }

    countSkills(): number {
        const allPrerequisites: { [key: number]: boolean } = {};

        // Para cada habilidade requerida, encontramos todos os pré-requisitos
        for (let i = 0; i < this.required.length; i++) {
            const skill = this.required[i];
            const prerequisites = this.findPrerequisites(skill, {});
            for (let key in prerequisites) {
                allPrerequisites[key] = true;
            }
        }

        // Contamos o número de chaves únicas no objeto allPrerequisites
        let count = 0;
        for (let key in allPrerequisites) {
            if (allPrerequisites.hasOwnProperty(key)) {
                count++;
            }
        }

        return count;
    }

    private findPrerequisites(skill: number, visited: { [key: number]: boolean }): { [key: number]: boolean } {
        const prerequisites: { [key: number]: boolean } = {};

        // Se já visitamos esta habilidade, retornamos um conjunto vazio para evitar ciclos
        if (visited[skill]) {
            return prerequisites;
        }

        visited[skill] = true;

        // Adiciona a habilidade atual ao conjunto de pré-requisitos
        prerequisites[skill] = true;

        // Adiciona os pré-requisitos da habilidade atual (se não for a raiz)
        if (this.tree[skill] !== skill) {
            const parent = this.tree[skill];
            const parentPrerequisites = this.findPrerequisites(parent, visited);
            for (let key in parentPrerequisites) {
                if (parentPrerequisites.hasOwnProperty(key)) {
                    prerequisites[key] = true;
                }
            }
        }

        return prerequisites;
    }
}

// Exemplos de uso:
const tree1 = new SkillTree([0, 0, 0, 1, 3, 3, 2], [6]);
console.log(tree1.countSkills()); // 3

const tree2 = new SkillTree([0, 0, 0, 1, 3, 3, 2], []);
console.log(tree2.countSkills()); // 0

const tree3 = new SkillTree([0, 0, 0, 1, 3, 3, 2], [1, 2]);
console.log(tree3.countSkills()); // 3
