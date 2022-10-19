# KNEX

npm install knex -g

npm install mysql

### criar arquivo de config 

knex init -x ts

## knexfile.ts 
// eslint-disable-next-line import/no-import-module-exports
import type { Knex } from "knex";

// Update with your config settings.

`const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql",
        connection: {
            host: "localhost",
            database: "databasename",
            user: "usuario",
            password: "senha",
            port: 3306,
            timezone: "UTC",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "migrations",
            directory: "./src/shared/knex/migrations",
        },
        seeds: {
            directory: "./src/shared/knex/seeds",
        },
    },

    production: {

    },
};

module.exports = config; `

--------------------------


## MIGRATIONS

### criar migration
knex migrate:make nome_migration

### rodar todas migrations
knex migrate:latest
knex migrate:latest --env production

### desfazer ultima migration
knex migrate:rollback

### desfazer todas
knex migrate:rollback --all

### rodar uma migration acima
knex migrate:up

### desfazer uma migration
knex migrate:down

### desfazer uma migration especifica
knex migrate:down migration_name.js


### listar migrations 
knex migrate:list


## Exemplos de migrations

import { Knex } from "knex";

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("permissoes", (t) => {
        t.integer("cod_permissao");
        t.string("descricao", 150);
        t.text("informacao");
        t.integer("cod_setor");
        t.primary(["cod_permissao"]);
        t.string("method", 10);
        t.string("path", 150);
        t.timestamps(true, true);
        t.foreign(["cod_setor"], "FK_cod_setor_permissoes")
            .references(["cod_setor"])
            .inTable("setores");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("permissoes", (t) => {
        t.dropForeign(["cod_setor"], "FK_cod_setor_permissoes");
    });

    return knex.schema.dropTable("permissoes");
}
  
  
## SEEDS
  
### Criar seed
knex seed:make seed_name
  
### Rodar todos seeds
knex seed:run

### Rodar seed especifico
knex seed:run --specific=seed-filename.js
  
  
  
## USO
    data = {
       nome: "Elcio",
       idade: 34,
       login: "elcio",
       cod_cicom: 123
    }
  
    async create(data: ICustomerDTO): Promise<Customer> {
        await db("clientes").insert(data).then();

        return data;
    }

    async update(data: ICustomerDTO): Promise<Customer> {
        await db("clientes")
            .update(data)
            .where({ cod_cicom: data.cod_cicom })
            .then();

        return data;
    }  

  
  async findByCodCicom(codCicom: number): Promise<Customer> {
        try {
            const customer = await db("clientes")
                .where({ cod_cicom: codCicom })
                .first();

            if (!customer) {
                throw new AppError("Cliente não localizado.", 406);
            }

            return customer;
        } catch (error) {
            throw new AppError(error);
        }
    }
  
  await db(table)
                .update(updatedata)
                .whereRaw("?? = ?", [pkField, updatedata[pkField]])
                .then()
                .catch(() => {
                    throw new AppError(
                        `Erro: "erro interno - insert exceptionError"`,
                        409
                    );
                });
  
  
  











