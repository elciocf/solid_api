No console do wsl2 > Ubuntu

#baixa instalar imagem no Ubuntu
docker pull mariadb:10.4

#Criar container do mariaDB (ficara disponível)
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=root123 -p 3306:3306 -d mariadb:10.4

##recordar o password para root##

#Fazer com o que o container sempre suba junto com o docker (ao iniciar wsl/ubuntu: sudo service docker start)
docker update --restart always mariadb


#Conectar no console do docker

docker exec -it mariadb bash
apt-get update
apt-get install nano
cd /etc/mysql/
nano my.cnf



==>localizar o setor [mysqld] e acrescentar a linha
skip-grant-table

ctrl + X
Y
<enter>

ctrl+D para sair do console do container

#reiniciar o mariadb
docker stop mariadb
docker start mariadb


docker exec -it mariadb bash
mysql -u root -p
digitar e senha <enter>

create database <nome>;


#criar rede docker
docker network create dbnet
docker network connect dbnet mariadb


#exibir imagens instaladas
docker images

#Descobrir IP do container do mariadb
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb



