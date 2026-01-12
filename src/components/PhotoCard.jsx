export default function PhotoCard({ photo }) {
  return (
    <div className="rounded shadow overflow-hidden">
      <img
        src={photo.media.m}
        alt={photo.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
    </div>
  )
}
