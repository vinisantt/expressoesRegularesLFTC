const GRAB_TITLE = /(?<=<title type="html">)(.*?)(?=<\/title>)/gi;
const GRAB_POST_DATE = /(?<=<published>)(.*?)(?=<\/published>)/gi;
const GRAB_POST_URL = /(?=<url>)?(http:\/\/noticias)(.*?)(?=<\/)/gi;

export {GRAB_TITLE, GRAB_POST_DATE, GRAB_POST_URL}