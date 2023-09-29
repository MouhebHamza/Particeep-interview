import React, { useEffect, useState } from "react"
import { movies$ } from "./movies"
import "./App.css"
import MovieCard from "./movieCard"
import Select from "react-select"

function App() {
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [showCategoryFilter, setShowCategoryFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(4)

    useEffect(() => {
        movies$.then(data => {
            setMovies(data)
            setFilteredMovies(data)
        })
    }, [])

    const handleDeleteMovie = movieId => {
        setMovies(prevMovies =>
            prevMovies.filter(movie => movie.id !== movieId)
        )
        setFilteredMovies(prevMovies =>
            prevMovies.filter(movie => movie.id !== movieId)
        )
    }

    const handleLikeMovie = movieId => {
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === movieId
                    ? { ...movie, likes: movie.likes + 1 }
                    : movie
            )
        )
        setFilteredMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === movieId
                    ? { ...movie, likes: movie.likes + 1 }
                    : movie
            )
        )
    }

    const handleDislikeMovie = movieId => {
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === movieId
                    ? { ...movie, dislikes: movie.dislikes + 1 }
                    : movie
            )
        )
        setFilteredMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === movieId
                    ? { ...movie, dislikes: movie.dislikes + 1 }
                    : movie
            )
        )
    }

    const uniqueCategories = [...new Set(movies.map(movie => movie.category))]

    const handleCategoryChange = selectedOptions => {
        const selectedCategoryNames = selectedOptions.map(
            option => option.value
        )
        setSelectedCategories(selectedCategoryNames)

        const updatedFilteredMovies = movies.filter(movie => {
            return (
                selectedCategoryNames.length === 0 ||
                selectedCategoryNames.includes(movie.category)
            )
        })

        setFilteredMovies(updatedFilteredMovies)
        setCurrentPage(1) 
    }

    const toggleCategoryFilter = () => {
        setShowCategoryFilter(!showCategoryFilter)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem)

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleItemsPerPageChange = event => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(1) 
    }

    return (
        <div className='App'>
            <div className='button-container'>
                <button onClick={toggleCategoryFilter} className="filters-button">
                    {showCategoryFilter
                        ? "Hide Filter"
                        : "Filter by Category"}
                </button>
                {showCategoryFilter && (
                    <Select
                        isMulti
                        options={uniqueCategories.map(category => ({
                            value: category,
                            label: category
                        }))}
                        onChange={handleCategoryChange}
                        value={selectedCategories.map(category => ({
                            value: category,
                            label: category
                        }))}
                    />
                )}
                <label>
                    Items per page:
                    <select
                        onChange={handleItemsPerPageChange}
                        value={itemsPerPage}
                        className='select-dropdown'>
                        <option value='4'>4</option>
                        <option value='8'>8</option>
                        <option value='12'>12</option>
                    </select>
                </label>
            </div>
            <div className='movies-container'>
                {currentItems.map(movie => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        category={movie.category}
                        likes={movie.likes}
                        dislikes={movie.dislikes}
                        onDelete={() => handleDeleteMovie(movie.id)}
                        onLike={() => handleLikeMovie(movie.id)}
                        onDislike={() => handleDislikeMovie(movie.id)}
                    />
                ))}
            </div>
            <div className='pagination-button-container'>
                <button
                    className='prev-button'
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <button
                    className='next-button'
                    onClick={handleNextPage}
                    disabled={indexOfLastItem >= filteredMovies.length}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default App
