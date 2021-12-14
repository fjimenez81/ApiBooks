import React, { useState, useEffect } from 'react'
import Card from './Card';
import { getAllBooks } from '../services/book-service';

export default function Book() {
	const [data, setData] = useState([]);

	const getBooks = async () => {
		const books = await getAllBooks()
		setData(books.data)
	}
	
	useEffect(() => {
		getBooks()
	}, []);
	
	return (
		<div className='container'>
			{
				data.sort((a, b) => parseInt(a.id) - parseInt(b.id))
					.map(obj => {
						return (
							<Card data={obj} key={obj.id}></Card>
						)
					})
			}
		</div>
	)
}
