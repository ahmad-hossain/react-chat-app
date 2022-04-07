import React from 'react'
import './PostItem.css';
import PostModel from '../model/PostModel'

interface PostItemProps {
    className: string,
    post: PostModel
}

export default function PostItem({ className, post }: PostItemProps) {
    console.log(post)

    //todo make username above bubble
    //todo style username (grey color, small font)
    return (
        <div className={`${className}-container`}>
            <p className={`${className}-username`}>{post.user.username}</p>
            <p className={className}>{post.text}</p>
        </div>
    )
}