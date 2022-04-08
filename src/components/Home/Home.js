import React from 'react'
import { Button, TextField } from '@mui/material';
import './Home.css';
import { useState, useEffect } from 'react';
import * as Constants from '../../constants/core';
import PostItem from '../PostItem/PostItem';
import SendIcon from '@mui/material/Icon/Icon';
// import SendIcon from'@material-ui/icons/Menu';

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
            Constants.baseUrl + "/feed",
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
                        className={post['user']['username'] === currentUser ? 'from-me' : 'from-them'}
                        post={post}
                        key={post} />
                )}
            </div>

            <div className="sticky-footer">
                <TextField className="message-input" id="outlined-basic" label="Message" variant="outlined" />
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </div>


        </div>
    )
}

function get(url, headers) {
    return fetch(url, {
        method: "GET",
        headers: headers
    })
}