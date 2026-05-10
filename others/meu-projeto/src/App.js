import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Contato from './pages/Contato'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Form from './components/Form'

function App() {


  function createPost(project){

    console.log(project.profession.id)
    switch(true){
      case (project.profession.id === "1"):
        project.salary = 10000
        break;
      case (project.profession.id === "2"):
        project.salary = 8000
        break;
      case (project.profession.id === "3"):
        project.salary = 6000
        break;
      case (project.profession.id === "4"):
        project.salary = 12000
        break;
      case (project.profession.id === "5"):
        project.salary = 9000
        break;
      default:
          project.salary = 0
    }

    project.rate = "5/5"

    fetch('http://localhost:5000/projetos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log(data)
    })
    .catch((err)=>console.log(err))
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <Form handleSubmit={createPost}/>
      <Footer />
    </Router>
  );

}

export default App;
