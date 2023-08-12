// api.js

const API_BASE_URL = 'http://localhost:8080'; // Update with your backend URL

export async function getAllUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/getUsers`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
