import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { saveBook, updateBook, getBookById } from '../services/book-service'

export default function CreateBook() {
	const [data, setData] = useState({
		name: "",
		isbn: "",
		first_name: "",
		last_name: ""	
	})

	const params = useParams()
	const navigate = useNavigate()

	const getBookId = async (id) => {
		const book = await getBookById(id)
		if (book.data) {
			const { name, isbn, author } = book.data
			setData({
				name,
				isbn,
				first_name: author.first_name,
				last_name: author.last_name
			})
		}
	}

	useEffect(() => {
		if (params.id)
			getBookId(params.id)
	  }, [params.id]);

	const handleChange = (e) => {
		setData({...data, [e.target.name]: e.target.value})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const book = {
			name: data.name,
			isbn: data.isbn,
			author: {
				first_name: data.first_name,
				last_name: data.last_name
			}}
		if (!params.id) {
			await saveBook(book)
		}
		else {
			await updateBook(params.id, book)
		}
		navigate('/')
	}

	return (
		<div>
			
			<div className="cont_form">
				<form className='form'>
					<label className='action'>{!params.id ? "CREATE BOOK" : "UPDATE BOOK"}</label>
					<label className='description' >TITLE</label>
					<input type="text" name="name" id="name"
						placeholder='Title' onChange={handleChange} value={data.name}/>
					<label className='description' >ISBN</label>
					<input type="text" name="isbn" id="isbn"
						placeholder='Isbn' onChange={handleChange} value={data.isbn}/>
					<label className='description' >FIRST NAME AUTHOR</label>
					<input type="text" name="first_name" id="first_name"
						placeholder='First name author'
						onChange={handleChange} value={data.first_name}/>
					<label className='description' >LAST NAME AUTHOR</label>
					<input type="text" name="last_name" id="last_name"
						placeholder='Last name author'
						onChange={handleChange} value={data.last_name}/>
					<button type="submit" onClick={handleSubmit}>
						{!params.id ? "CREATE" : "UPDATE"}
					</button>
				</form>
			</div>
		</div>
	)
}



