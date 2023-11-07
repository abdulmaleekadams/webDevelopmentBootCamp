import styles from './note.module.css';
const Note = ({ title, content }) => {
  return (
    <div className={styles.noteCard + ' ' + styles.card}>
      <h2 className={styles.noteTitle}>{title}</h2>
      <p
        className={styles.noteContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Note;
