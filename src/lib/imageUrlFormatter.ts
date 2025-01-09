export default function imageUrlFormatter(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/next2-app-5a30b.firebasestorage.app/o/${encodeURIComponent(
    imagePath
  )}?alt=media`;
}
