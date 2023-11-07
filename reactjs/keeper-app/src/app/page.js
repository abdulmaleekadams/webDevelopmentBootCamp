import Image from 'next/image';
import styles from './page.module.css';
import Note from '../../components/header/notes/Note';

import notesData from '../../utils/data';

export default function Home() {
  return (
    <main className={styles.main}>
      {notesData.notes.map((note, idx) => (
        <Note
          key={`note-${idx}`}
          title={note.title}
          content={note.content.replaceAll('\n', '<br/>')}
        />
      ))}
    </main>
  );
}
