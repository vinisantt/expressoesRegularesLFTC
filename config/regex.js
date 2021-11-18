const GRAB_TITLE = /(?<=<title type="html">)(.*?)(?=<\/title>)/gi;
const GRAB_POST_DATE = /(?<=<published>)(.*?)(?=<\/published>)/gi;
const GRAB_POST_URL = /(?=<url>)?(http:\/\/noticias)(.*?)(?=<\/)/gi;
const GRAB_POST_DESCRIPTION = /(?<=<description>)(.*?)(?=<\/description>)/gi;
const FORMAT_POST_DATE = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/

export { GRAB_TITLE, GRAB_POST_DATE, GRAB_POST_URL, GRAB_POST_DESCRIPTION, FORMAT_POST_DATE };