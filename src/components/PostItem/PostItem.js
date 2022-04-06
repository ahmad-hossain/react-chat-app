import React from 'react'
import './PostItem.css';

export default function PostItem({ post }) {
    console.log(post)
    return (
        <div className='post'>
            {post['username']}
        </div>
    )
}
