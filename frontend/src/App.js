import React, { useState } from "react";

// Sample user data
const users = [
  { name: "John", message: "Brilliant", date: "2020-01-01" },
  { name: "ninja", message: "Great resource", date: "2020-01-02" },
  {
    name: "ninja",
    message:
      "Great resource like I have alwasy said all the time and I am tired",
    date: "2020-01-02",
  },
];

function App() {
  // State for form data to send message
  const [formData, setFormData] = useState({
    message: "",
  });

  // State for user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInData, setSignInData] = useState({
    user: "",
  });

  // Handle input change in the message form when message is being typed
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle input change in the authentication form
  const handleSignin = (event) => {
    setSignInData((prevData) => ({ ...prevData, user: event.target.value }));
  };

  // Handle submission of the message form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  };

  // Handle submission of the authentication form
  const handleAuth = (event) => {
    event.preventDefault();
    const signedInUser = signInData.user;

    // Check if the signed-in user's name matches any user in the array
    const matchedUser = users.find((user) => user.name === signedInUser);

    // Change user's name to "You" if matched
    if (matchedUser) {
      matchedUser.name = "You";
    }

    setIsAuthenticated(true); // Set authentication state to true
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
                <input
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
                  <div className="message">{user.message}</div>
                  <div>{user.date}</div>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
