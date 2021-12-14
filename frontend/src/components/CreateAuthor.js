import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { saveAuthor, updateAuthor, getAuthorById } from '../services/book-service'

export default function CreateAuthor() {
    const [data, setData] = useState({
		first_name: "",
		last_name: ""
	})

	const params = useParams()
	const navigate = useNavigate()

	const getAuthorId = async (id) => {
		const author = await getAuthorById(id)
		if (author.data) {
			const { first_name, last_name } = author.data
			setData({ first_name, last_name })
		}
	}

	useEffect(() => {
		if (params.id)
			getAuthorId(params.id)
	  }, [params.id]);


	const handleChange = (e) => {
		setData({...data, [e.target.name]: e.target.value})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const author = {
				first_name: data.first_name,
				last_name: data.last_name
			}
		if (!params.id) {
			await saveAuthor(author)
		}
		else {
			await updateAuthor(params.id, author)
		}
		navigate('/')
	}

    return (
        <div>
            <div className="cont_form">
                <form className='form fauthor'>
                    <label className='action lauthor'>
						{!params.id ? "CREATE AUTHOR" : "UPDATE AUTHOR"}
					</label>
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
