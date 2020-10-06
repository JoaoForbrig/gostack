# Recuperação de Senha

**Requisitos Funcionais(RF)**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruçoes de recuperação de senha;
- O usuario deve poder resetar sua senha;

**Requisitos Não Funcionais(RNF)**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de email deve aconttecer em segundo plano (backgound job)

**Regras de Negocio(RN)**

- O link enviado por email para resetar sua senha, deve expirar em 2h;
- O usuario precisa confirmar a nova senha ao resetar sua senha;

# Atualização do  perfil

**Requisitos Funcionais(RF)**

- O usuário deve poder atualizar seu nome, email e senha;


**Requisitos Não Funcionais(RNF)**

**Regras de Negocio(RN)**

- O usuario nao pode alterar seu email ppara um email ja cadastrado;
- Para atualizar sua senha, o usuario  deve infomar a senha antiga;
- Para atualizar sua senha,  o usuaio precisa confirmar a nova senha;


# Painel do Prestador

**Requisitos Funcionais(RF)**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualiza as notificações nao lidas;

**Requisitos Não Funcionais(RNF)**

- Os agendamentos do prestador deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificaçoes do prestador devem ser enviadas em tempo-real utilizando Socket.io

**Regras de Negocio(RN)**

- A notificação deve e um status de lida e nao lida para que o presador possa controlar


# Agendamento de Serviços

**Requisitos Funcionais(RF)**

- O usuario deve poder listar todos os prestadores de serviço cadastrado;
- O usuário deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador;
- O usuário deve poder listar horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;


**Requisitos Não Funcionais(RNF)**

- A listagem de prestadores deve ser armazenada em cache;


**Regras de Negocio(RN)**

- Cada aggendamento deve durar 1h exatamente;
- Os agendamenos devem estar disponiveis ente 8h as 18h(primeiro agendamento as 8h e o ultimo as 17h);
- O usuario nao pode agendar em um hoario já ocupado;
- O usuaio nao pode agenda em um horário que já passou;
- O usuáio nao pode agendar serviços consiggo mesmo;
