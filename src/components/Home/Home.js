import React from 'react'
import { Button, TextField } from '@mui/material';
import './Home.css';
import { useState, useEffect } from 'react';
import * as Constants from '../../constants/core'
import PostItem from '../PostItem/PostItem'

export default function Home({ token, currentUser }) {
    console.log(`current user is ${currentUser}`)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(`Home: token is ${token}`)

        const headers = {
            'Content-Type': 'application/json',
            'authorization': token
        }
        get(
            Constants.baseUrl + "/feed?limit=5",
            JSON.stringify({ limit: 2 }),
            headers
        )
            .then(res => res.json())
            .then(data => {
                console.log(`Received posts: ${data}`)
                setPosts(data)
            })

    }, [])

    return (
        <div className="home-screen">
            <h1>Hello {token}</h1>

            <div className='imessage'>
                {posts.map(post =>
                    <PostItem
                        className={post['username'] === currentUser ? 'from-me' : 'from-them'}
                        post={post}
                        key={post} />
                )}
            </div>

        </div>
    )
}

function get(url, body, headers) {
    return fetch(url, {
        method: "GET",
        headers: headers
    })
}