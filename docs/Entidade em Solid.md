# Criando nova entidade: API Solid

## DTOS

Na pasta src/modules/[escopo]/dtos
*exemplos de escopo: acounts, cars, user

Crie um arquivo para armazenar a interface da nova entidade com a nomenclatura INomeEntidade.ts (sempre inicia com a letra í maiúscula) e sufixo "DTO"
*O nome da entidade deve ser criado em inglês
A interface descrita no arquivo deve refletir a entidade(tabela) correspondente no banco de dados

Exemplo: ISpeakWithUsDTO

``interface ISpeakWithUsDTO {
    cod_fale_conosco: number;
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
    created_at?: Date;
    updated_at?: Date;
}

export { ISpeakWithUsDTO };
``

## Entities

Na pasta src/modules/[escopo]/entities

Crie um arquio para armazenar a classe que representará a entidade. Primeira letra maiúscula + padrão camuelcase

Exemplo: SpeakWithUs

``
class SpeakWithUs {
    cod_fale_conosco: number;
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
    created_at?: Date;
    updated_at?: Date;

    constructor() {
        if (!this.cod_fale_conosco) {
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}

export { SpeakWithUs };``

## Repositories

### Interface de comportamento
Essa interface serve para descrever quais ações a entidade pode executar. Exemplo: Create, update, delete, list, toogle ...

Na pasta src/modules/[escopo]/repositories

Novamente criamos com o padrão de nomenclatura em inglês, iniciando com a letra í maiúscula e com o sufixo "Repository".
Ficando INomeEmInglesRepository.ts

Exemplo: ISpeakWithUsRepository.ts

Note que referenciamos o DTO e a entitie criada. 
Para comportamentos temos:
create: Cria um registro de fale conosco
delete: apaga um registro de fale conosco
toggleRead: alterna entre lido e não lido
list: Retorna a lista de fale conosco

Observe que quando uma ação não gera retorno utilizamos "Promise<void>" e quando gera retorno, descrevemos qual o tipo de retorno
Promise<SpeakWithUs>. Caso o retorno seja um array Promise<SpeakWithUs[]>

``
import { ISpeakWithUsDTO } from "../dtos/ISpeakWithUsDTO";
import { SpeakWithUs } from "../entities/SpeakWithUs";

interface ISpeakWithUs {
    create(data: ISpeakWithUsDTO): Promise<SpeakWithUs>;
    delete(codFaleConosco: number): Promise<void>;
    toggleRead(codFaleConosco: number): Promise<void>;
    list(): Promise<SpeakWithUs[]>;
}

export { ISpeakWithUs };``










