function NotesLoader() {
  return (
    <div className="flex flex-col gap-3 p-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg bg-notesbg">
          {/* title */}
          <div className="h-6 w-2/3 bg-highlightednotecolor rounded"></div>

          {/* date and preview */}
          <div className="flex gap-4">
            <div className="h-4 w-20 bg-highlightednotecolor rounded"></div>
            <div className="h-4 w-full bg-highlightednotecolor rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesLoader;
