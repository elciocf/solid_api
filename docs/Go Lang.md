Instalar plugin do "Go" no visual studio

Usar estratégia do docker

*** Na pasta do projeto ***

criar arquivo: Dockerfile

FROM golang:1.16

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}"

RUN apt-get update && \
    apt-get install build-essential librdkafka-dev -y

CMD ["tail", "-f", "/dev/null"]


------

criar arquivo docker-compose.yaml

version: "3"

services:
  app:
    build: .
    container_name: simulator
    volumes:
      - .:/go/src/
    extra_hosts:
      - "host.docker.internal:172.17.0.1"

----------

*** subir o container ***

docker-compose up -d

*** acessar o container ***
docker exec -it simulator bash
docker exec -it [nome_do_container] bash

*** inicializar o pacote do go ***
--O Go trabalha com pacotes para gerenciar as versões

no console do container que possui o Go.. de o compando para criar o pacote/projeto

go mod init github.com/elciocf/fullcycle-simulator

com isso será criado o arquivo go.mod, que indica o que está sendo usado pelo projeto (similar a package.json do node)










