# Criando nova entidade: API Solid

## DTOS

Na pasta src/modules/[escopo]/dtos
*exemplos de escopo: acounts, cars, user

Crie um arquivo para armazenar a interface da nova entidade com a nomenclatura INomeEntidade.ts (sempre inicia com a letra "i" maiúscula) e sufixo "DTO"
*O nome da entidade deve ser criado em inglês
A interface descrita no arquivo deve refletir a entidade(tabela) correspondente no banco de dados

Exemplo: ISpeakWithUsDTO

``
interface ISpeakWithUsDTO {
    cod_fale_conosco: number;
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
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
    cnpj: string;
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

Novamente criamos com o padrão de nomenclatura em inglês, iniciando com a letra "i" maiúscula e com o sufixo "Repository".
Ficando INomeEmInglesRepository.ts

Exemplo: ISpeakWithUsRepository.ts

Note que referenciamos o DTO e a entitie criada. 
Para comportamentos temos:
create: Cria um registro de fale conosco
findByCod: Utilizado para localizar um registro
delete: apaga um registro de fale conosco
toggleRead: alterna entre lido e não lido
list: Retorna a lista de fale conosco

Observe que quando uma ação não gera retorno utilizamos "Promise<void>" e quando gera retorno, descrevemos qual o tipo de retorno
Promise<SpeakWithUs>. Caso o retorno seja um array Promise<SpeakWithUs[]>

``
import { ISpeakWithUsDTO } from "../dtos/ISpeakWithUsDTO";
import { SpeakWithUs } from "../entities/SpeakWithUs";

interface ISpeakWithUsRepository {
    create(data: ISpeakWithUsDTO): Promise<SpeakWithUs>;
    findByCod(codFaleConosco: number): Promise<SpeakWithUs>;
    delete(codFaleConosco: number): Promise<void>;
    toggleRead(codFaleConosco: number): Promise<void>;
    list(): Promise<SpeakWithUs[]>;
}

export { ISpeakWithUsRepository };``

### Repository de memória
O repositório de memória é criado para possibilitar a execução de teste unitários!    

Na pasta src/modules/[escopo]/repositories/inMemory

Criamos o arquivo que ira implementar as ações descritas na interface de comportamento.
Novamente criamos com o padrão de nomenclatura em inglês, com o sufixo "RepositoryInMemory".
Ficando NomeEmInglesRepositoryInMemory.ts
 
Exemplo: SpeakWithUsRepositoryInMemory.ts

Iniciamos com    
``
import { ISpeakWithUsDTO } from "@modules/site/dtos/ISpeakWithUsDTO";
import { SpeakWithUs } from "@modules/site/entities/SpeakWithUs";

import { ISpeakWithUsRepository } from "../ISpeakWithUsRepository";

class SpeakWithUsRepositoryInMemory implements ISpeakWithUsRepository {
    speakWithUsList: SpeakWithUs[] = [];

    
}

export { SpeakWithUsRepositoryInMemory };    
``
    
- Importamos a entitie e o DTO    
- Criamos um array do tipo da entidade, para armazenas os registros em memória. No exemplo: "speakWithUsList"
- Com o vsCode passando o mouse sobre o nome da classe => "correção rápida" => "implementar a interface..."
  * Os métodos Promise devem ser acrescidos com "async" 
- Pode ser que a criação do array seja enviada para baixo. Se for o caso volte ela para o topo
- Implementamos os métodos
    
Arquivo final

``
import { ISpeakWithUsDTO } from "@modules/site/dtos/ISpeakWithUsDTO";
import { SpeakWithUs } from "@modules/site/entities/SpeakWithUs";

import { ISpeakWithUsRepository } from "../ISpeakWithUsRepository";

class SpeakWithUsRepositoryInMemory implements ISpeakWithUsRepository {
    speakWithUsList: SpeakWithUs[] = [];

    async create(data: ISpeakWithUsDTO): Promise<SpeakWithUs> {
        const speakWithUs = new SpeakWithUs();

        Object.assign(speakWithUs, {
            cod_fale_conosco: data.cod_fale_conosco,
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            cnpj: data.cnpj,
            lida: "N",
            mensagem: data.mensagem,
        });

        this.speakWithUsList.push(speakWithUs);
        return speakWithUs;
    }

    async findByCod(codFaleConosco: number): Promise<SpeakWithUs> {
        return this.speakWithUsList.find(
            (speakWithUs) => speakWithUs.cod_fale_conosco === codFaleConosco
        );
    }

    async delete(codFaleConosco: number): Promise<void> {
        const speakWithUs = this.speakWithUsList.find(
            (ct) => ct.cod_fale_conosco === codFaleConosco
        );
        this.speakWithUsList.splice(this.speakWithUsList.indexOf(speakWithUs));
    }

    async toggleRead(codFaleConosco: number): Promise<void> {
        /* semelhante a um update. Porém no update passamos o DTO */
        const speakWithUs = await this.findByCod(codFaleConosco);
        this.speakWithUsList.splice(this.speakWithUsList.indexOf(speakWithUs));
        speakWithUs.lida = speakWithUs.lida === "S" ? "N" : "S";
        this.speakWithUsList.push(speakWithUs);
    }

    async list(): Promise<SpeakWithUs[]> {
        return this.speakWithUsList;
    }
}

export { SpeakWithUsRepositoryInMemory };

``
    
### Repository do banco de dados "KNEX"
O repositório de banco de dados é o que será utilizado para se comunicar diretamente com o banco de dados.

Na pasta src/modules/[escopo]/repositories/[bibliotecaBD]
* Onde bibliotecaBD pode ser KNEX, typeORM, Driver do BD e etc    

Criamos o arquivo que ira implementar as ações descritas na interface de comportamento.
Novamente criamos com o padrão de nomenclatura em inglês, com o sufixo "Repository".
Ficando NomeEmInglesRepository.ts
 
Exemplo: SpeakWithUsRepository.ts

Iniciamos com    
``
import { db } from "@configs/mariadb";
import { AppError } from "@shared/errors/AppError";
import { ISpeakWithUsDTO } from "@modules/site/dtos/ISpeakWithUsDTO";
import { SpeakWithUs } from "@modules/site/entities/SpeakWithUs";

import { ISpeakWithUsRepository } from "../ISpeakWithUsRepository";

class SpeakWithUsRepository implements ISpeakWithUsRepository {
    
}
    
export { SpeakWithUsRepository }
``
- Note que importamos a comunicação com o banco de dados. No caso: import { db } from "@configs/mariadb"; 
- Importamos também nossa biblioteca para tratamento de erros. import { AppError } from "@shared/errors/AppError";    
- Importamos a entitie e o DTO    
- Com o vsCode passando o mouse sobre o nome da classe => "correção rápida" => "implementar a interface..."
  * Os métodos Promise devem ser acrescidos com "async" 
- Implementamos os métodos    
    
Versão final

``
import { db } from "@configs/mariadb";
import { ISpeakWithUsDTO } from "@modules/site/dtos/ISpeakWithUsDTO";
import { SpeakWithUs } from "@modules/site/entities/SpeakWithUs";

import { AppError } from "@shared/errors/AppError";

import { ISpeakWithUsRepository } from "../ISpeakWithUsRepository";

class SpeakWithUsRepository implements ISpeakWithUsRepository {
    async create(data: ISpeakWithUsDTO): Promise<SpeakWithUs> {
        await db("fale_conosco").insert(data).then();
        return data;
    }

    async delete(codFaleConosco: number): Promise<void> {
        await db("fale_conosco")
            .where({ cod_fale_conosco: codFaleConosco })
            .del();
        return null;
    }

    async findByCod(codFaleConosco: number): Promise<SpeakWithUs> {
        try {
            const customer = await db("fale_conosco")
                .where({ cod_fale_conosco: codFaleConosco })
                .first();

            return customer;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async toggleRead(codFaleConosco: number): Promise<void> {
        const speakWithUs = await this.findByCod(codFaleConosco);
        speakWithUs.lida = speakWithUs.lida === "S" ? "N" : "S";

        await db("fale_conosco")
            .update(speakWithUs)
            .where({ cod_fale_conosco: codFaleConosco })
            .then();
    }

    async list(): Promise<SpeakWithUs[]> {
        try {
            const customer = await db("fale_conosco").then();

            return customer;
        } catch (error) {
            throw new AppError(error);
        }
    }
}

export { SpeakWithUsRepository };

``
## Container
Para conseguirmos alternar entre os repositórios inMemory e database real utilizamos o injection.
Para facilitar o uso de injection utilizamos a biblioteca tsyringe.

### Adicionando container ao projeto
No arquivo src/shared/container/index.ts. Iremos adicionar um bloco referente a nosso novo repositório:
    
``
container.registerSingleton<ISpeakWithUsRepository>(
    "SpeakWithUsRepository",
    SpeakWithUsRepository
);
``    
Fazemos os importes necessários com "ctrl + ."

    
## Use cases
Para cada ação da entidade criaremos um "useCase"
    
Começamos criando uma pasta para cada useCase:
Na pasta src/modules/[escopo]/useCases/[entidade]/acaoEntidade/

Exemplo: "src/modules/site/usesCases/speakWithUs/createSpeakWithUs/"
    
Em cada pasta de useCase, criamos: o useCase o controller e se for o caso o teste referente aquele useCase

### UseCase
Arquivo que faz a conexão entre o controller(que será criado) e o repositório(memória ou banco de dados)

Começamos com:
``
import { SpeakWithUs } from "@modules/site/entities/SpeakWithUs";
import { ISpeakWithUsRepository } from "@modules/site/repositories/ISpeakWithUsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSpeakWithUsUseCase {
    constructor(
        @inject("SpeakWithUsRepository")
        private speakWithUsRepository: ISpeakWithUsRepository
    ) {}
    
}

export { CreateSpeakWithUsUseCase };    
``
    
Como iremos receber dados. Criamos uma interface que molda os dados recebidos pelo "Request"    
Via de regra essa interface se chamará "IRequest"
    
``
interface IRequest {
    cod_fale_conosco: number;
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
    mensagem: string;
}
``
    
Agora criamos o método que realiza a "ação"

``
    async execute(data: IRequest): Promise<SpeakWithUs> {
        const newSpeakWithUs = await this.speakWithUsRepository.create(data);
        return newSpeakWithUs;
    }    
``    

Versão final:
    
``
import { SpeakWithUs } from "@modules/site/entities/SpeakWithUs";
import { ISpeakWithUsRepository } from "@modules/site/repositories/ISpeakWithUsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    cod_fale_conosco: number;
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
    mensagem: string;
}

@injectable()
class CreateSpeakWithUsUseCase {
    constructor(
        @inject("SpeakWithUsRepository")
        private speakWithUsRepository: ISpeakWithUsRepository
    ) {}

    async execute(data: IRequest): Promise<SpeakWithUs> {
        const newSpeakWithUs = await this.speakWithUsRepository.create(data);
        return newSpeakWithUs;
    }
}

export { CreateSpeakWithUsUseCase };
    
``   
    
    
    
    
    
 
    
    
    








