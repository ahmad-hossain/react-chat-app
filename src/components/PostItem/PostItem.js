import React from 'react'
import './PostItem.css';

export default function PostItem({ className, post }) {
    console.log(post)
    return (
        <p className={className}>{post['username']}</p>
    )
}
