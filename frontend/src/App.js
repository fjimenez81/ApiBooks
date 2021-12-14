import './App.css';
import Book from './components/Book';
import { Routes, Route, NavLink } from 'react-router-dom'
import CreateBook from './components/CreateBook';
import CreateAuthor from './components/CreateAuthor';


function App() {

	return (
		<div className="App">
			<header className="header">
				<nav className="nav__header">
					<h1 className='title'>LIBRARY</h1>
					<NavLink className="navlink" to="/">HOME</NavLink>
					<NavLink className="navlink" to="/createbook">CREATE BOOK</NavLink>
					<NavLink className="navlink" to="/createauthor">CREATE AUTHOR</NavLink>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<Book/>}></Route>
				<Route path="/createbook" element={<CreateBook/>}></Route>
				<Route path="/updatebook/:id" element={<CreateBook/>}></Route>
				<Route path="/createauthor" element={<CreateAuthor/>}></Route>
				<Route path="/updateauthor/:id" element={<CreateAuthor/>}></Route>
				<Route path="*" element={<Book/>}></Route>
			</Routes>
	</div>
	);
}

export default App;
