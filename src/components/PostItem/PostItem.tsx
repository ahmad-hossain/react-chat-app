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

    const handleExpandComments = () => {
        //if comments are being expanded now
        if (!commentsExpanded)
            setCommentsExpanded(!commentsExpanded)
    }
    console.log(post)
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
                {post.comments !== undefined && <p onClick={handleExpandComments} className="load-comments">{commentsExpanded ? "Collapse Comments" : "Expand Comments"}</p>}

                <ul>
                    {post.comments !== undefined && <Comments comments={Object.values(post.comments)} />}
                </ul>
            </div>

        </div>
    )
}