async function confirmDelete(event) {
    event.preventDefault();
  
    const password = prompt("Enter the password to delete all movies:");
  
    if (password) {
      try {
        const response = await fetch('/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: password })
        });
  
        if (response.ok) {
          alert('Movies deleted successfully');
          window.location.href = '/';
        } else {
          alert('Incorrect password');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to delete movies');
      }
    }
  }
  