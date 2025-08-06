export async function fetchSubredditPosts(subreddit, sort = 'hot', limit = 10, after = '') {
  const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&after=${after}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch /r/${subreddit}: ${response.status}`);
  }
  const json = await response.json();
  return json.data; // Contains `children`, `after`, `before`
}

export async function fetchPostDetails(postId) {
  const url = `https://www.reddit.com/comments/${postId}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch post details for ID ${postId}: ${response.status}`);
  }
  const json = await response.json();
  return json[0].data.children[0].data; // Returns the post details
}