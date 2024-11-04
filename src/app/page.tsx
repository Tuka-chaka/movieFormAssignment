import MovieForm from "@/components/movieForm/MovieForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <MovieForm/>
    </div>
  );
}
