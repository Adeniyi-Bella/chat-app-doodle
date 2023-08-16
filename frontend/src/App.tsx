import React, { useState } from "react";
// import logic to fetch and get data from the backend
import { getAllUsers, addMessageToDb } from "./api/backendServices";
import { User } from './types/types'; // Adjust the path as needed

function App() {
  // set data retrieved from get request
  const [users, setUsers] = useState<User[]>([]);
  // set data when send button is clicked
  const [formData, setFormData] = useState({
    message: "",
  });
  // State for user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // To get current user
  const [signInData, setSignInData] = useState({
    user: "",
  });

  // Fetch data from the backend, sort it according to the date and set it to the user state
  async function fetchData() {
    try {
      const usersData = await getAllUsers();
      let newData: User[] = [];
      usersData.forEach((entry) => {
        entry.messages.forEach((message) => {
          newData.push({
            id: entry.id,
            name: entry.name,
            messages: [
              {
                message: message.message,
                date: formatDate(message.date),
                sortableDate: sortableDate(message.date),
              },
            ],
          });
        });
      });
      const sortedData = [...newData].sort((a, b) => {
        const timestampA = new Date(a.messages[0].sortableDate).getTime();
        const timestampB = new Date(b.messages[0].sortableDate).getTime();
        return timestampA - timestampB;
      });
      signInData.user ? handleAuth(sortedData) : setUsers(sortedData);
    } catch (error) {
      // Handle error if needed
    }
  }

  // Handle submission of the message form, add the message to the database, and re-fetch the data
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.message) {
      alert("Message has to be added");
      return;
    }
    await addMessageToDb(signInData.user, formData.message);
    // After adding a new message, re-fetch the data to update the user list
    fetchData();
    setFormData({ message: "" });
  };

  // Handle input change in the message form when message is being typed
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  // Handle input change in the sign in form when name is being typed
  const handleSignin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData((prevData) => ({ ...prevData, user: event.target.value }));
  };

  // Format the date to display in the UI. Called from fetch function
  function formatDate(timestamp: string | number | Date) {
    const dateObj = new Date(timestamp);
    const formattedDate = `${dateObj.getDate()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
    return formattedDate;
  }
  // format data to be used for sorting. Called from fetch function
  function sortableDate(timestamp: string | number | Date) {
    const dateObj = new Date(timestamp);
    const formattedDate = dateObj.getTime();
    return formattedDate;
  }

  // Handle submission of the authentication form
  const handleAuth = (event: React.FormEvent | User[]) => {
    // Prevent user from signing in without a name
    // if (event instanceof Event) {
      if (!signInData.user) {
        alert("Name has to be provided");
        return;
      }
      const signedInUser = signInData.user;
      // if event is a form submission
      if ("preventDefault" in event) {
        event.preventDefault();
        fetchData();
        // Map over users and change the name to "You" for all matching users
        const updatedUsers = users.map((user) => {
          if (user.name === signedInUser) {
            return { ...user, name: "You" };
          }
          return user;
        });
        setUsers(updatedUsers);
        setIsAuthenticated(true);
      } else {
        // Map over users and change the name to "You" for all matching users
        const updatedUsers = event.map((user) => {
          if (user.name === signedInUser) {
            return { ...user, name: "You" };
          }
          return user;
        });

        setUsers(updatedUsers);
      }
    // }
  };

  // Handle going back to the sign in page
  const handleGoBack = () => {
    setIsAuthenticated(false);
    setSignInData({ user: "" });
  };
  // Render the component
  return (
    <div className="main">
      <div className="questionTag">
        {!isAuthenticated ? ( // Conditional rendering based on isAuthenticated
          <>
            Who are You?{" "}
            <form onSubmit={handleAuth} className="questionTag">
              <div>
                <label htmlFor="user">Your Name:</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={signInData.user}
                  onChange={handleSignin}
                />
              </div>
              <button className="sign-in" type="submit">
                Sign in
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="border">
              <div className="user-div">
                {/* Map over users and conditionally add a border for matching username */}
                {users.map((user, index) => (
                  <div
                    key={index}
                    className={`user-details ${
                      user.name === "You" ? "highlighted" : ""
                    }`}
                  >
                    <div>{user.name}</div>
                    <div className="message">
                      {user.messages.map((msg) => msg.message)}
                    </div>
                    <div>{user.messages.map((msg) => msg.date)}</div>
                  </div>
                ))}
              </div>
              <div>
                {/* Main form */}
                <form onSubmit={handleSubmit} className="form">
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit">Send</button>
                </form>
              </div>
              <button type="button" onClick={handleGoBack}>
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
