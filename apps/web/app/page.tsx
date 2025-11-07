import { Button } from '@repo/ui/button';
import styles from './page.module.css';

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
