export async function fetchCommentsForPost(postId, limit = 10, after = '') {
  const url = `https://www.reddit.com/comments/${postId}.json?limit=${limit}&after=${after}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comments for post ID ${postId}: ${response.status}`
    );
  }
  const json = await response.json();
  return json[1].data; // Contains `children`, `after`, `before`
}

export async function fetchCommentDetails(commentId) {
  const url = `https://www.reddit.com/api/info.json?id=t1_${commentId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comment details for ID ${commentId}: ${response.status}`
    );
  }
  const json = await response.json();
  return json.data.children[0].data; // Returns the comment details
}
