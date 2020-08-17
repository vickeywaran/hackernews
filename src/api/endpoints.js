const baseUrl = 'https://hacker-news.firebaseio.com/v0';
const topStoriesUrl = baseUrl + '/topstories.json';
const itemUrl = (id) => `${baseUrl}/item/${id}.json`;

export { topStoriesUrl, itemUrl };