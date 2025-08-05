import { fetchComments } from './commentsAPI';

describe('commentsAPI', () => {
  it('fetches comments for a given postId from Reddit API', async () => {
    const postId = 't3_abc123';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ data: { children: [{ data: { id: 'c1', body: 'Test comment' } }] } }]),
      })
    );

    const comments = await fetchComments(postId);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(postId)
    );
    expect(comments[0].data.children[0].data.body).toBe('Test comment');
  });
});