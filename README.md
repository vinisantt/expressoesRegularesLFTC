# ⚒️ Extração de dados com expressões regulares

## Do que se trata o código deste repositório?

O código aqui implementado visa obter os dados do feed disponibilizado pelo RSS (Rich Site Summary) do site R7.com, que é uma forma simplificada de se apresentar as notícias do site. 

Utilizando o NodeJs, nós criamos um script para obtenção do conteúdo do Feed RSS e com a utilização das Expressões Regulares, tornamos a informação apresentável. 

---

## Obtenção dos dados

``` javascript=
https.get("https://noticias.r7.com/carreiras/feed.xml", (response) => {
    let body = '';

    response.on('data', chunk => body += chunk);
    response.on('end', () => {
        displayPostsInfo(body)
    });
}); 
```

O trecho de código acima faz uma requição GET ao site do R7 notícias e obtém o conteúdo da página, passando o resultado para a função de exibição `displayPostsInfo`.

---

## Transformação dos dados com Regex

---
Para transformar o conteúdo da página obtida, utilizamos as seguintes expressões regulares, sendo cada uma responsável por uma determinada finalidade.
``` javascript=
const GRAB_TITLE = /(?<=<title type="html">)(.*?)(?=<\/title>)/gi;
const GRAB_POST_DATE = /(?<=<published>)(.*?)(?=<\/published>)/gi;
const GRAB_POST_URL = /(?=<url>)?(http:\/\/noticias)(.*?)(?=<\/)/gi;
const GRAB_POST_DESCRIPTION = /(?<=<description>)(.*?)(?=<\/description>)/gi;
const FORMAT_POST_DATE = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/
```
Finalidades essas descritas abaixo:
(Obs: A barra `/` é utilizada para informar a linguagem que se trata de uma expressão regular e `/gi` serve para realizar uma busca global insensitiva, ou seja, busca todas as ocorrências sem considerar maiúsculas ou minúsculas)
- `GRAB_TITLE` - obter todos os títulos das notícias presentes na página;

    1. `(?<=<title type="html">)` - Procurar o texto após a tag `<title type="html">`
    2. `(.*?)` - `.` corresponde à caracteres únicos e `*` permite a ocorrência de um ou mais deles, com essa expressão, obtem-se assim, tudo que está entre as tags dos passos 1 e 3.
    3. `(?=<\/title>)` - Procurar o texto antes do fechamento de tag `</title>`.

- `GRAB_POST_DATE` - obter todas as datas das postagens;

    1. `(?<=<published>)` - Procurar o texto após a tag `<published>`
    2. `(.*?)` - `.` corresponde à caracteres únicos e `*` permite a ocorrência de um ou mais deles, com essa expressão, obtem-se assim, tudo que está entre as tags dos passos 1 e 3
    3. `(?=<\/published>)` - Procurar o texto antes do fechamento de tag `</published>`.

- `GRAB_POST_URL` - obter todas as URL's presentes nas postagens;



- `GRAB_POST_DESCRIPTION` - obter todas as descrições das postagens;

    1. `(?<=<description>)` - Procurar o texto após a tag `<description>`
    2. `(.*?)` - `.` corresponde à caracteres únicos e `*` permite a ocorrência de um ou mais deles, com essa expressão, obtem-se assim, tudo que está entre as tags dos passos 1 e 3
    3. `(?=<\/description>)` - Procurar o texto antes do fechamento de tag `</description>`.

- `FORMAT_POST_DATE` - auxiliar na formatação da data das postagens.

    1. `(?<year>[0-9]{4})` - atribui a tag `<year>` os 4 primeiros dígitos;
    2. `-` - delimitador entre cada tag;
    3. `(?<month>[0-9]{2})` - atribui a tag `<month>` os dois primeiros dígitos, após os 4 primeiros o passo 1.
    4. `(?<day>[0-9]{2})` - atribui a tag `<day>` os dois primeiros dígitos, após os dois dígitos do passo 3.

Com base nas expressões exibidas acima, foi criada uma função responsável por verificar cada conteúdo e gerar uma lista para cada um, como pode-se ver abaixo:

``` javascript=
function transformDataIntoPosts(data) {
    let postsTitles = data.match(GRAB_TITLE)
    let postsDates = data.match(GRAB_POST_DATE)
    let postsUrls = data.match(GRAB_POST_URL)
    let postsDescriptions = data.match(GRAB_POST_DESCRIPTION)

    let posts = []

    Object.values(postsTitles).forEach((title, index) => {
        posts.push({
            title: title ?? '* Sem título *',
            date: postsDates[index] ? formatDateToBrFormatRegex(postsDates[index]) : '* Sem data *',
            url: postsUrls[index] ?? '* Sem URL *',
            description: postsDescriptions[index] ?? '* Sem descrição *'
        })
    })

    return posts
}
    
function formatDateToBrFormatRegex(date) {
    return date.replace(FORMAT_POST_DATE, "$<day>/$<month>/$<year>").substring(0, 10)
}
```

A função utiliza as expressões criadas e retorna uma lista de objetos já com seus respectivos valores transformados, sendo eles:
- title
- date
- url
- description

Essa função utiliza uma outra função `formatDateToBrFormatRegex` que faz uso do regex para substituir a string da data com formato americano para uma string com formato de data brasileiro.

---


## Visualização dos dados obtidos

Após a transformação dos dados, uma função exibe o conteúdo de cada notícia obtida, sendo ela exibida abaixo:
    
```javascript=
function displayPostsInfo(data) {
    let posts = transformDataIntoPosts(data);

    console.log('#'.repeat(5) + "=".repeat(3) + "#".repeat(5));
    for (let post of posts) {

        console.log(`\nTítulo da Notícia: ${post.title}\nData de Publicação: ${post.date}\nDescrição da notícia: ${post.description}\nEncontra-se em: ${post.url}`);
        console.log('#'.repeat(5) + "=".repeat(3) + "#".repeat(5));
    }

}    
```
    
A saída destes dados podem ser vistos abaixo:

![](https://i.imgur.com/bPzx635.png)

---

## Como executar?

Após clonar o repositório, dê o seguinte comando:

`npm run start`

---
## Contribuidores

| [<img src="https://avatars0.githubusercontent.com/u/24749522?s=400&u=b51b1b15d99cf90269cea31d92823e3ff192a41d&v=4" width=115><br><sub>@vinisantt</sub>](https://github.com/vinisantt) | [<img src="https://avatars.githubusercontent.com/u/47464761?v=4" width=115><br><sub>@jomrs</sub>](https://github.com/jomrs) |
| :---: | :---: |

---