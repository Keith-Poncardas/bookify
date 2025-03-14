let selectedItems = new Set();

document.querySelectorAll('.select-item').forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    let userId = this.getAttribute('data-id');

    if (this.checked) {
      selectedItems.add(userId);
    } else {
      selectedItems.delete(userId);
    };

  });
});

document.getElementById('selectAll').addEventListener('change', function () {
  let isChecked = this.checked;

  document.querySelectorAll('.select-item').forEach(checkbox => {
    checkbox.checked = isChecked;

    let userId = checkbox.getAttribute('data-id');

    if (isChecked) {
      selectedItems.add(userId);
    } else {
      selectedItems.delete(userId);
    };

  });
});

function restoreSelections() {
  document.querySelectorAll('.select-item').forEach(checkbox => {
    let userId = checkbox.getAttribute('data-id');

    if (selectedItems.has(userId)) {
      checkbox.checked = true;
    };

  });
};

document.getElementById('deleteAll').addEventListener('click', async function () {
  if (selectedItems.size === 0) {
    alert('No items selected.');
    return;
  }

  console.log('Sending IDs:', Array.from(selectedItems)); // 🛠 Debugging step

  try {
    const response = await fetch('/dashboard/deleteSelected', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.from(selectedItems) })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete');
    }

    const data = await response.json();
    alert(data.message); // ✅ Success message
    location.reload(); // Refresh the page after deletion

  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'An error occurred.');
  }
});

document.addEventListener('DOMContentLoaded', restoreSelections);