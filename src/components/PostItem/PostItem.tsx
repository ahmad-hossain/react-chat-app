import React from 'react'
import './PostItem.css';
import PostModel from '../../model/PostModel'
import { useState } from 'react'
import { IconButton } from '@mui/material';
import { AddComment } from '@material-ui/icons'
import Comment from '../Comment/Comment';

interface PostItemProps {
    className: string,
    post: PostModel,
    addCommentClicked: () => void
}

export default function PostItem({ className, post, addCommentClicked }: PostItemProps) {
    const [commentsExpanded, setCommentsExpanded] = useState(false)
    const handleToggleComments = () => {
        setCommentsExpanded(!commentsExpanded)
    }
    return (
        <div className={`${className}-container`}>
            <IconButton className={`${className} add-comment`} onClick={addCommentClicked}>
                <AddComment />
            </IconButton>
            <div className={`profile-pic-container ${className}`}>
                <img className="profile-pic" src={post.user.profilePic} />
            </div>

            <div>
                <p className={`${className}-username`}>{post.user.username}</p>
                <p className={className}>{post.text}</p>
                {post.comments !== undefined &&
                    <p onClick={handleToggleComments} className="load-comments">
                        <a href="javascript:void(0);">
                            {commentsExpanded ? "Collapse Comments" : "Expand Comments"}
                        </a>
                    </p>}

                <ul className='comment-section'>
                    {(post.comments !== undefined && commentsExpanded) &&
                        post.comments.map(comment => <Comment comment={comment} key={comment.id} />)}
                </ul>
            </div>

        </div>
    )
}