import { GRAB_TITLE, GRAB_POST_DATE, GRAB_POST_URL } from "./config/regex.js"
import https from 'https'

https.get("https://noticias.r7.com/carreiras/feed.xml", (response) => {
    let body = ''; 

    response.on('data', chunk => body += chunk);
    response.on('end', () => {
        displayPostsInfo(body)
    });
});


function displayPostsInfo(data) {
    let postTitles = data.match(GRAB_TITLE)
    let postDate = data.match(GRAB_POST_DATE)
    let postUrl = data.match(GRAB_POST_URL)

    console.log('#'.repeat(5) + "=".repeat(3) + "#".repeat(5));
    for(let x=0; x < postTitles.length; x++) {
        console.log(`\n${postTitles[x]}\nData de Publicação: ${postDate[x]}\nEncontra-se em: ${postUrl[x]}`);
        console.log('#'.repeat(5) + "=".repeat(3) + "#".repeat(5));
    }

}