import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { updatePreferences } from '../../features/user/userSlice';
import Div from '../Div/Div';
import styles from './PostsFilter.module.css';

export default function PostsFilter({
  showSortOptions = true,
  showLimitOptions = true,
  className = '',
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { postsPerPage, defaultSort } = useSelector(
    (state) => state.user.preferences
  );

  const handleSortChange = (newSort) => {
    // Update Redux preferences
    dispatch(updatePreferences({ defaultSort: newSort }));

    // Update URL immediately for instant feedback
    const params = new URLSearchParams(location.search);
    params.set('sort', newSort);
    params.delete('after'); // Reset pagination when changing sort

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleLimitChange = (newLimit) => {
    const limit = parseInt(newLimit);

    // Update Redux preferences
    dispatch(updatePreferences({ postsPerPage: limit }));

    // Update URL immediately for instant feedback
    const params = new URLSearchParams(location.search);
    params.set('limit', limit);
    params.delete('after'); // Reset pagination when changing limit

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <Div className={`${styles.postsFilter} ${className}`}>
      {showSortOptions && (
        <Div className={styles.filterGroup}>
          <label htmlFor="sort-select" className={styles.filterLabel}>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={defaultSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="hot">🔥 Hot</option>
            <option value="new">🆕 New</option>
            <option value="top">⭐ Top</option>
            <option value="rising">📈 Rising</option>
            <option value="controversial">⚡ Controversial</option>
          </select>
        </Div>
      )}

      {showLimitOptions && (
        <Div className={styles.filterGroup}>
          <label htmlFor="limit-select" className={styles.filterLabel}>
            Posts per page:
          </label>
          <select
            id="limit-select"
            value={postsPerPage}
            onChange={(e) => handleLimitChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </Div>
      )}

      <Div className={styles.filterInfo}>
        <span className={styles.activeFilters}>
          Showing {defaultSort} posts, {postsPerPage} per page
        </span>
      </Div>
    </Div>
  );
}
