/* app.js - Vanilla JS implementation for RISE Behaviour Flow */

document.addEventListener('DOMContentLoaded', () => {
  let role = null;
  let query = '';
  let selectedPath = [];

  const root = document.getElementById('root');

  function getCurrentNode() {
    if (!role) return null;
    let node = data[role];
    for (const key of selectedPath) {
      node = node[key];
      if (!node) break;
    }
    return node;
  }

  function performSearch(term) {
    const results = [];
    if (!term) return results;
    const searchTerm = term.toLowerCase();
    const roles = role ? [role] : Object.keys(data);
    roles.forEach(r => {
      function traverse(node, path, title) {
        if (typeof node === 'string') {
          if (node.toLowerCase().includes(searchTerm)) {
            results.push({ role: r, title: title || path.join(' '), content: node, path });
          }
        } else if (Array.isArray(node)) {
          const content = node.join('; ');
          if (content.toLowerCase().includes(searchTerm)) {
            results.push({ role: r, title: title || path.join(' '), content, path });
          }
        } else if (typeof node === 'object') {
          Object.keys(node).forEach(key => {
            traverse(node[key], [...path, key], key);
          });
        }
      }
      traverse(data[r], [], r);
    });
    return results;
  }

  function render() {
    root.innerHTML = '';
    // Search bar
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search actions, consequences, criteria...';
    searchInput.value = query;
    searchInput.className = 'w-full px-4 py-2 border border-gray-300 rounded-lg mb-4';
    searchInput.addEventListener('input', (e) => {
      query = e.target.value;
      selectedPath = [];
      render();
    });
    root.appendChild(searchInput);

    if (!query && !role) {
      // Role selection
      const btnContainer = document.createElement('div');
      btnContainer.className = 'flex justify-center gap-4 mb-4 flex-wrap';
      Object.keys(data).forEach(r => {
        const btn = document.createElement('button');
        btn.textContent = r;
        btn.className = 'px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700';
        btn.addEventListener('click', () => {
          role = r;
          query = '';
          selectedPath = [];
          render();
        });
        btnContainer.appendChild(btn);
      });
      root.appendChild(btnContainer);
    }

    const results = performSearch(query);
    if (query) {
      if (results.length > 0) {
        results.forEach(res => {
          const card = document.createElement('div');
          card.className = 'bg-white rounded-xl shadow p-4 mb-4';
          const small = document.createElement('div');
          small.textContent = 'Role: ' + res.role;
          small.className = 'text-sm text-gray-500 mb-1';
          const title = document.createElement('h3');
          title.textContent = res.title;
          title.className = 'font-semibold text-lg mb-2';
          const para = document.createElement('p');
          para.textContent = res.content;
          card.appendChild(small);
          card.appendChild(title);
          card.appendChild(para);
          root.appendChild(card);
        });
      } else {
        const p = document.createElement('p');
        p.textContent = 'No results found.';
        p.className = 'text-center';
        root.appendChild(p);
      }
      return;
    }

    if (role) {
      const currentNode = getCurrentNode();
      if (!currentNode) return;
      // Back button
      const backDiv = document.createElement('div');
      backDiv.className = 'flex items-center mb-4 gap-2';
      const backBtn = document.createElement('button');
      backBtn.textContent = '← Back';
      backBtn.className = 'text-blue-600 hover:underline';
      backBtn.addEventListener('click', () => {
        if (selectedPath.length === 0) {
          role = null;
        } else {
          selectedPath.pop();
        }
        render();
      });
      const span = document.createElement('span');
      span.className = 'font-semibold';
      span.textContent = role + (selectedPath.length > 0 ? ' / ' + selectedPath.join(' / ') : '');
      backDiv.appendChild(backBtn);
      backDiv.appendChild(span);
      root.appendChild(backDiv);

      if (typeof currentNode === 'string') {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow p-4';
        const p = document.createElement('p');
        p.textContent = currentNode;
        p.className = 'whitespace-pre-line';
        card.appendChild(p);
        root.appendChild(card);
      } else if (Array.isArray(currentNode)) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow p-4';
        const ul = document.createElement('ul');
        ul.className = 'list-disc list-inside';
        currentNode.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        card.appendChild(ul);
        root.appendChild(card);
      } else if (typeof currentNode === 'object') {
        Object.keys(currentNode).forEach(key => {
          const sectionVal = currentNode[key];
          const section = document.createElement('div');
          section.className = 'bg-white rounded-xl shadow p-4 mb-4';
          const h2 = document.createElement('h2');
          h2.textContent = key.replace(/-/g, ' ');
          h2.className = 'font-semibold text-lg mb-2 capitalize';
          section.appendChild(h2);
          if (typeof sectionVal === 'string') {
            const p = document.createElement('p');
            p.textContent = sectionVal;
            p.className = 'mb-2 whitespace-pre-line';
            section.appendChild(p);
          } else if (Array.isArray(sectionVal)) {
            const ul = document.createElement('ul');
            ul.className = 'list-disc list-inside mb-2';
            sectionVal.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              ul.appendChild(li);
            });
            section.appendChild(ul);
          } else if (typeof sectionVal === 'object') {
            const div = document.createElement('div');
            div.className = 'space-y-2';
            Object.keys(sectionVal).forEach(subKey => {
              const btn = document.createElement('button');
              btn.textContent = subKey.replace(/-/g, ' ');
              btn.className = 'w-full text-left bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2';
              btn.addEventListener('click', () => {
                selectedPath.push(key);
                selectedPath.push(subKey);
                render();
              });
              div.appendChild(btn);
            });
            section.appendChild(div);
          }
          root.appendChild(section);
        });
      }
    }
  }

  render();
});
