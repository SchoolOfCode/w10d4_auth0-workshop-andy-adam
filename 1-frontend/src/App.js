import logo from "./logo.svg";
import "./App.css";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./component/LogoutButton";
import Profile from "./component/Profile";
import APIFetchTest from "./component/APIFetchTest";

function App() {
  return (
    <div className='App'>
      <Profile />
      <LoginButton />
      <LogoutButton />
      <APIFetchTest />
    </div>
  );
}

export default App;
