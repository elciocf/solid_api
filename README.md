# Cadastro de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um novo carro.


**RN** => Regras de negócio
Não dever possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado por padrão, com disponibilidade.
* Apenas usuários do tipo administrador podem cadastrar carros.


# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pela categoria.
Deve ser possível listar todos os carros disponíveis pela marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
Não é necessário estar logado no sistema.


# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar especificações para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar um especificação para um carro não existente.
Não deve ser possível cadastrar especificação repetida para um mesmo carro.
Apenas usuários do tipo administrador pode cadastrar uma especificação para o carro.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar imagens para o carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
Não deve ser possível cadastrar uma imagem para um carro não existente.
Apenas usuários do tipo administrador pode cadastrar uma imagem para o carro.

# Aluguel

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas
Não deve ser possível cadastrar um aluguel, para um usuário que já possui um aluguel em aberto
Não deve ser possível cadastrar um aluguel, para um carro que já possui um aluguel em aberto
