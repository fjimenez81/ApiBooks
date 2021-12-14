import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
    const {id, name, isbn, author} = props.data
    return (
        <div className='card'>
            <Link className='link' to={`/updatebook/${id}`}>BOOK {id}</Link>
            <hr />
            <label>TITLE</label>
            <p>{name}</p>
            <label>ISBN</label>
            <p>{isbn}</p>
            <Link className='link' to={`/updateauthor/${author.id}`}>AUTHOR</Link>
            <p>{author.first_name + " " + author.last_name}</p>
        </div>
    )
}
