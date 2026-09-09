# App SPA de Pestiscos de Pets

## Contexto

Criar uma aplicação SPA, com a stack HTML, CSS, JS puro, sem pacotes ou depedência para hospedar no GitHub Pages.
A aplicação será um cardápio, estilo "lanchonete", porém, para pets: cachorros e gatos.

## Recursos do App

1. Carregar os dados do cardápio a partir de uma **estrutura jSon** contendo todas as informações do produto, organizado por tipo de pet, categoria do produto, outros dados triviais e um destaque para eventuais produtos em promoção.
2. O aplicativo SPA irá carregar, já na primeira tela, a lista de produtos. Ao clicar em qualquer produto, é exibido o Modal de Detalhes com descrição completa, informações nutricionais e botão de adição rápida. Não exige cadastro até o checkout.
3. O SPA deverá usar a **localstorage** para armazenar os itens no carrinho.
4. Ao finalizar a compra no carrinho, o usuário então deverá se cadastrar (nome, whatsapp, email e endereço) e durante o cadastro adicionar a localização (**geolocation**).  _"Se a geolocalização for negada ou indisponível, o cadastro prossegue normalmente usando o endereço digitado."_
5. Após o cadastro, pedir as credenciais do dispositivo (**CredentialsContainer**) como uma camada extra de segurança e prova de vida. _"O app tenta `navigator.credentials.get()`. Se a API não existir, não houver autenticador, ou o usuário cancelar, o fluxo exibe um aviso e continua para o pagamento. O resultado da tentativa é logado no console para fins de estudo."_
6. Após validar as credenciais, simular um gateway de pagamento genêrico.
7. Gerar um link para o WA, número +5511999212704. _"O link `wa.me/5511999212704` abre com texto pré-preenchido contendo: nome do cliente, itens do pedido (nome × qtd), valor total e endereço."_

## O que o aplicativo não deve fazer:

1. Processar o pagamento. Será apenas uma simulação.
2. Cadastrar produtos. Iremos carregar os dados de um arquivo jSon fictício, gerado por IA.
3. O aplicativo não controla delivery.
4. Controle de estoque,
5. Calcular Frete

## JSon Exemplo

	{
	  "config": { "whatsapp": "5511999212704" },
	  "produtos": [
	    {
	      "id": "racao-cao-001",
	      "nome": "Bifinho de Frango",
	      "pet": "cao",
	      "categoria": "petiscos",
	      "preco": 12.90,
	      "precoPromocional": 9.90,
	      "descricao": "..."
	    }
	  ]
	}

## UI / UX

1. Utilize a paleta de cores: `#24FCFF` `#68FFCE` `#BEE9FF` `#20FF6B` `#77A7FF`
2. Utilize Google Fonts: `Poppins` para títulos e `Open Sans` para texto corrido. E aplique versões condensadas das fontes quando conveniente.
3. **Não use emojis**. Utilize Google Icons.
4. Interface minimalista, fundo branco
5. Adicione pequenas animações em botões e transições de telas.
