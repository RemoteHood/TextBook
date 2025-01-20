export default function ChapterDisplay({ title, content }) {
  if (!title || !content) return <p>No chapter to display.</p>;

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

  