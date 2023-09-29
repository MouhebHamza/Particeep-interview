import React from "react"
import "./MovieCard.css" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faTrash,
    faThumbsUp,
    faThumbsDown
} from "@fortawesome/free-solid-svg-icons"

const MovieCard = ({
    title,
    category,
    likes,
    dislikes,
    onDelete,
    onLike,
    onDislike
}) => {
    const handleDelete = () => {
        onDelete()
    }
    const handleLike = () => {
        onLike()
    }

    const handleDislike = () => {
        onDislike()
    }

    return (
        <div className='movie-card'>
            <h2>{title}</h2>
            <p>Catégorie: {category}</p>
            <div className='like-dislike-bar'>
                <div
                    className='like-bar'
                    style={{
                        width: `${(likes / (likes + dislikes)) * 100}%`
                    }}></div>
                <div
                    className='dislike-bar'
                    style={{
                        width: `${(dislikes / (likes + dislikes)) * 100}%`
                    }}></div>
            </div>
            <div className="button-container">

            </div>
                <button
                    onClick={handleDelete}
                    className='icon-button delete-button'>
                    <FontAwesomeIcon icon={faTrash} /> 
                </button>
                <button
                    onClick={handleLike}
                    className='icon-button like-button'>
                    <FontAwesomeIcon icon={faThumbsUp} /> 
                </button>
                <button
                    onClick={handleDislike}
                    className='icon-button dislike-button'>
                    <FontAwesomeIcon icon={faThumbsDown} />
                </button>
        </div>
    )
}

export default MovieCard
