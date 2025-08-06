export async function fetchSubredditPosts(subreddit, sort = 'hot', limit = 10, after = '') {
  const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&after=${after}`;
  console.log('Fetching:', url); // Debug log
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

export async function fetchSearchResults(query, sort = 'relevance', limit = 10, after = '') {
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=${sort}&limit=${limit}&after=${after}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to search for "${query}": ${response.status}`);
  }
  const json = await response.json();
  return json.data; // Contains `children`, `after`, `before`
}

// Helper function to get user preferences from localStorage
function getUserPreferences() {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading preferences:', error);
  }
  return { postsPerPage: 10, defaultSort: 'hot' };
}

export async function postsListLoader({ params, request }) {
  const url = new URL(request.url);
  const after = url.searchParams.get('after') || '';
  const subreddit = params.subreddit || 'all';
  
  // Get user preferences for limit and sort
  const preferences = getUserPreferences();
  const limit = parseInt(url.searchParams.get('limit') || preferences.postsPerPage);
  const sort = url.searchParams.get('sort') || preferences.defaultSort;
  
  console.log('Loading posts with:', { subreddit, sort, limit, after, preferences }); // Debug log
  
  const data = await fetchSubredditPosts(subreddit, sort, limit, after);
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

export async function searchLoader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const after = url.searchParams.get('after') || '';
  
  if (!query) {
    return { posts: [], after: null, query: '', error: 'No search query provided' };
  }
  
  try {
    const preferences = getUserPreferences();
    const limit = parseInt(url.searchParams.get('limit') || preferences.postsPerPage);
    
    const data = await fetchSearchResults(query, 'relevance', limit, after);
    return { posts: data.children, after: data.after, query };
  } catch (error) {
    return { posts: [], after: null, query, error: error.message };
  }
}