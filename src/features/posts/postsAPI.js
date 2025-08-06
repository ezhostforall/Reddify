export async function fetchSubredditPosts(subreddit, sort = 'hot', limit = 10, after = '') {
  const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&after=${after}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  return data;
}