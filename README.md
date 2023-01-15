# Testando rabbitmq

Conexão direta com amqp

## Rodar o projeto

- Installar as dependências

```sh

    make install

```

- Iniciar o projeto

```sh

    make start

```

- Visualizar logs

```sh

    make logs

```

- Parar o projeto

```sh

    make stop

```

- Deletar apps

```sh

    make delete

```

Enviando dados para a routing-key-01

```sh

curl --location --request POST 'http://localhost:4000/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "some": "any data to route 1"
}'

```

Enviando dados para a routing-key-02

```sh

curl --location --request POST 'http://localhost:4000/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "some": "any data to route 2"
}'

```