// app.js
// React application for RISE Behaviour Flow

const { useState } = React;

function App() {
  const [role, setRole] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState([]);

  // Helper to reset navigation when role changes
  const selectRole = (r) => {
    setRole(r);
    setQuery("");
    setSelectedPath([]);
  };

  // Determine current node based on selectedPath
  const getCurrentNode = () => {
    if (!role) return null;
    let node = data[role];
    for (const key of selectedPath) {
      node = node[key];
      if (!node) break;
    }
    return node;
  };

  const currentNode = getCurrentNode();

  // Collect search results across all roles and nested objects
  const performSearch = (term) => {
    const results = [];
    if (!term) return results;
    const searchTerm = term.toLowerCase();
    const searchRole = role ? [role] : Object.keys(data);
    searchRole.forEach((r) => {
      const traverse = (node, path, title) => {
        if (typeof node === "string") {
          if (node.toLowerCase().includes(searchTerm)) {
            results.push({
              role: r,
              title: title || path.join(" "),
              content: node,
              path: path
            });
          }
        } else if (Array.isArray(node)) {
          const content = node.join("; ");
          if (content.toLowerCase().includes(searchTerm)) {
            results.push({ role: r, title: title || path.join(" "), content: content, path });
          }
        } else if (typeof node === "object") {
          Object.keys(node).forEach((key) => {
            traverse(node[key], [...path, key], key);
          });
        }
      };
      traverse(data[r], [], r);
    });
    return results;
  };

  const searchResults = performSearch(query);

  // Render cards for start / minor / major sections
  const renderSection = (key, node) => {
    if (!node) return null;
    // node can be string, array, or object
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4">
        <h2 className="font-semibold text-lg mb-2 capitalize">{key.replace(/-/g, ' ')}</h2>
        {typeof node === 'string' && <p className="mb-2 whitespace-pre-line">{node}</p>}
        {Array.isArray(node) && (
          <ul className="list-disc list-inside mb-2">
            {node.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {typeof node === 'object' && !Array.isArray(node) && (
          <div className="space-y-2">
            {Object.keys(node).map((subKey) => (
              <button
                key={subKey}
                className="w-full text-left bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-4 py-2"
                onClick={() => setSelectedPath([...selectedPath, subKey])}
              >
                {subKey.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">RISE Behaviour Flow</h1>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search actions, consequences, criteria..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedPath([]); }}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4"
        />
        {/* Role selection buttons */}
        {!role && (
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            {Object.keys(data).map((r) => (
              <button
                key={r}
                onClick={() => selectRole(r)}
                className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {r}
              </button>
            ))}
          </div>
        )}
        {/* Search results */}
        {query && searchResults.length > 0 && (
          <div className="space-y-4">
            {searchResults.map((res, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <div className="text-sm text-gray-500 mb-1">Role: {res.role}</div>
                <h3 className="font-semibold text-lg mb-2">{res.title}</h3>
                <p>{res.content}</p>
              </div>
            ))}
          </div>
        )}
        {query && searchResults.length === 0 && (
          <p className="text-center">No results found.</p>
        )}
        {/* Role workflow */}
        {!query && role && currentNode && (
          <div>
            {/* Back button within role path */}
            <div className="flex items-center mb-4 gap-2">
              <button
                onClick={() => {
                  if (selectedPath.length === 0) {
                    setRole(null);
                  } else {
                    const newPath = [...selectedPath];
                    newPath.pop();
                    setSelectedPath(newPath);
                  }
                }}
                className="text-blue-600 hover:underline"
              >
                ← Back
              </button>
              <span className="font-semibold">{role}{selectedPath.length > 0 && ' / ' + selectedPath.join(' / ')}</span>
            </div>
            {/* If current node is string or array, show content */}
            {typeof currentNode === 'string' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <p className="whitespace-pre-line">{currentNode}</p>
              </div>
            )}
            {Array.isArray(currentNode) && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <ul className="list-disc list-inside">
                  {currentNode.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {typeof currentNode === 'object' && !Array.isArray(currentNode) && (
              <div>
                {Object.keys(currentNode).map((key) => (
                  renderSection(key, currentNode[key])
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
