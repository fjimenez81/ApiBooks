import axios from "axios";

export const getAllBooks = () => {
    return axios.get('http://localhost:5000/books')
}

export const getBookById = (id) => {
    return axios.get(`http://localhost:5000/book/${id}`)
}

export const saveBook = (book) => {
    return axios.post('http://localhost:5000/book', book)
}

export const updateBook = (id, book) => {
    return axios.put(`http://localhost:5000/book/${id}`, book)
}

export const saveAuthor = (author) => {
    return axios.post('http://localhost:5000/author', author)
}

export const updateAuthor = (id, author) => {
    return axios.put(`http://localhost:5000/author/${id}`, author)
}

export const getAuthorById = (id) => {
    return axios.get(`http://localhost:5000/author/${id}`)
}