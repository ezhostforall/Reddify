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

export async function postsListLoader({ params, request }) {
  const url = new URL(request.url);
  const after = url.searchParams.get('after') || '';
  const subreddit = params.subreddit || 'all';
  
  console.log('Loading posts with after:', after); // Debug log
  
  const data = await fetchSubredditPosts(subreddit, 'hot', 10, after);
  return { posts: data.children, after: data.after, subreddit };
}

export async function postDetailsLoader({ params }) {
  const postId = params.postId;
  if (!postId) {
    throw new Error('Post ID is required');
  }
  const postDetails = await fetchPostDetails(postId);
  return { post: postDetails };
}