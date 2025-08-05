import Div from "../Div/Div";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <Div className={styles.searchBar}>
      <input type="search" className={styles.searchInput} placeholder="Search..." />
      <button type="button" className={styles.searchButton}>Search</button>
    </Div>
  );
}