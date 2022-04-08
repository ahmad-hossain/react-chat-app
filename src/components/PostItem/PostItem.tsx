import React from 'react'
import './PostItem.css';
import PostModel from '../../model/PostModel'
import { useState } from 'react'
import Comments from '../Comments/Comments'

interface PostItemProps {
    className: string,
    post: PostModel
}

export default function PostItem({ className, post }: PostItemProps) {
    const [commentsExpanded, setCommentsExpanded] = useState(false)
    const handleToggleComments = () => {
        setCommentsExpanded(!commentsExpanded)
    }
    // console.log(post)
    //todo make username above bubble
    //todo style username (grey color, small font)
    return (
        <div className={`${className}-container`}>
            <div className={`profile-pic-container ${className}`}>
                <img className="profile-pic" src={post.user.profilePic} />
            </div>

            <div>
                <p className={`${className}-username`}>{post.user.username}</p>
                <p className={className}>{post.text}</p>
                {post.comments !== undefined && <p onClick={handleToggleComments} className="load-comments"><a href="javascript:void(0);">{commentsExpanded ? "Collapse Comments" : "Expand Comments"}</a></p>}

                <ul className='comment-section'>
                    {(post.comments !== undefined && commentsExpanded) && <Comments comments={Object.values(post.comments)} />}
                </ul>
            </div>

        </div>
    )
}