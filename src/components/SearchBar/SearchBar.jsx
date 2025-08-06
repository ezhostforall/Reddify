import { useNavigate } from 'react-router';
import Div from "../Div/Div";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('searchInput')?.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <Div className={styles.searchBar}>
        <input 
          type="search" 
          name="searchInput"
          className={styles.searchInput} 
          placeholder="Search..." 
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </Div>
    </form>
  );
}