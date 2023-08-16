import { UserEntry } from '../types/types';
const API_BASE_URL = 'http://localhost:8080'; // Update with your backend URL

// In getAllUsers function:
export async function getAllUsers(): Promise<UserEntry[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/getUsers`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json() as UserEntry[];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const addMessageToDb = async (user:string, message:string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user,
        message: message
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message.");
    }

  } catch (error) {
    throw new Error("Failed to send keywords.");
  }
};
