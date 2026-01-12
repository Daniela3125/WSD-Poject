export default function DarkModeToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      className="px-3 py-1 border rounded"
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
