import type { Board } from '@repo/api';
import styles from './page.module.css';

async function getBoards(): Promise<Board[]> {
  try {
    // This will be proxied to http://localhost:3000/boards
    const res = await fetch('http://localhost:3001/api/boards', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch boards');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching boards:', error);
    return [];
  }
}

export default async function Home() {
  const boards = await getBoards();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <h2>My Boards</h2>
          {boards.length > 0 ? (
            <div className={styles.ctas}>
              {boards.map((board) => (
                <div key={board.id} className={styles.secondary}>
                  {board.title}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#666' }}>
              No boards found. Make sure the NestJS API is running.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
