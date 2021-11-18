import { GRAB_TITLE, GRAB_POST_DATE, GRAB_POST_URL, GRAB_POST_DESCRIPTION, FORMAT_POST_DATE } from "./config/regex.js"
import https from 'https'

https.get("https://noticias.r7.com/carreiras/feed.xml", (response) => {
    let body = '';

    response.on('data', chunk => body += chunk);
    response.on('end', () => {
        displayPostsInfo(body)
    });
});


function displayPostsInfo(data) {
    let posts = transformDataIntoPosts(data);

    console.log('#'.repeat(5) + "=".repeat(3) + "#".repeat(5));
    for (let post of posts) {

        console.log(`\nTítulo da Notícia: ${post.title}\nData de Publicação: ${post.date}\nDescrição da notícia: ${post.description}\nEncontra-se em: ${post.url}`);
        console.log('#'.repeat(5) + "=".repeat(3) + "#".repeat(5));
    }

}

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