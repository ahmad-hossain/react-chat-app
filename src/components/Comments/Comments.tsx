import React from 'react'
import Comment from '../../model/Comment'

interface CommentProps {
    comments: Comment[]
}

export default function Comments({ comments }: CommentProps) {
    if (comments !== undefined) {
        const commentListItems = comments.map(item => <li key={item.id}>{item.text}</li>);

        return (
            <>
                {commentListItems}
            </>
        )
    }
    return <></>
}