import store from './store.js';

describe('Redux store', () => {
  it('should be created without errors', () => {
    expect(store).toBeDefined();
    expect(typeof store.getState).toBe('function');
    expect(typeof store.dispatch).toBe('function');
  });
});
