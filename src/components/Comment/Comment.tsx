import React from 'react'
import Comment from '../../model/Comment'

interface CommentProps {
    comment: Comment
}

export default function CommentItem({ comment }: CommentProps) {
    return (
        <li>{comment.text}</li>
    )
}