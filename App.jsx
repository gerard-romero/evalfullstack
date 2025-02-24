import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to ='/register'>Inscription</Link></li>
          <li><Link to ='/'>Connexion</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path = '/' element={<Login/>} />
        <Route path ='/register' element={<Register/>} />
      </Routes>

    </Router>
      
  )
}

export default App
