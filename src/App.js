import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Addnote from "./components/Addnote";
import Login from "./components/Login";
import Signup from "./components/Signup";
import View from "./components/View";
import React,{useState} from 'react';
import Forgot from "./components/Forgot";
import Changepassword from "./components/Changepassword";
import Editprofile from "./components/Editprofile";
import Resetpassword from "./components/Resetpassword";
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      typ:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  return (
    
    <>
    <NoteState>
        <Router>
          <Navbar />
         <Alert alert={alert}/> 
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/addNotes" element={<Addnote showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route exact path="/view" element={<View/>} />
              <Route exact path="/forgot" element={<Forgot showAlert={showAlert}/>} />
              <Route exact path="/changepassword" element={<Changepassword showAlert={showAlert}/>}/>
              <Route exact path="/resetpassword" element={<Resetpassword showAlert={showAlert}/>}/>
              <Route exact path="/editprofile" element={<Editprofile showAlert={showAlert}/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
