import React from 'react'
import { Button, TextField } from '@mui/material';
import './Home.css';
import { useState, useEffect } from 'react';
import * as Constants from '../../constants/core'
import PostItem from '../PostItem/PostItem';
import SendIcon from '@material-ui/icons/Send';
import PostModel from '../../model/PostModel'

interface HomeProps {
    token: string,
    currentUsername: string
}

export default function Home({ token, currentUsername }: HomeProps) {
    let [currentUser, setCurrentUser] = useState();

    console.log(`current user is ${currentUsername}`)
    const [posts, setPosts] = useState<PostModel[]>([])
    const [messageText, setMessageText] = useState("")
    const headers = {
        'Content-Type': 'application/json',
        'authorization': token
    }

    useEffect(() => {
        console.log(`Home: token is ${token}`)
        //get all posts from feed
        get(
            Constants.baseUrl + "/feed",
            headers
        )
            .then(res => res.json())
            .then(data => {
                console.log(`Received posts: ${data}`)
                setPosts(data)
            })

        //GET current user and save in variable
        get(Constants.baseUrl + "/user/", headers)
            .then(res => res.json())
            .then(data => {
                console.log(`currentUser is ${data} ,${JSON.stringify(data)}`);
                setCurrentUser(data)
            })
    }, [])

    const onMessageChanged = (newMessage: string) => {
        console.log("Message Changed")
        setMessageText(newMessage)
    }
    const onSendClicked = () => {
        console.log("Send clicked")
        if (messageText.length > 0) {
            let params: RequestInit = {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ text: messageText })
            }
            //send post request with user's message
            fetch(Constants.baseUrl + "/feed/post", params)
                .then(res => res.json())
                .then(data => {
                    data.user = currentUser;

                    //delete comments key if empty. Prevents 'Expand Comments' from showing
                    if (data.comments != undefined && data.comments.length == 0) {
                        delete data.comments;
                    }

                    setPosts([data, ...posts])
                })

            //clear the message TextField
            setMessageText("")
        }
    }

    return (
        <div className="home-screen">
            <h1>Hello {token}</h1>

            <div className='imessage'>
                {posts.map(post =>
                    <PostItem
                        className={post.user.username === currentUsername ? 'from-me' : 'from-them'}
                        post={post}
                        key={post.createdAt} />
                )}
            </div>

            <div className="sticky-footer">
                <TextField value={messageText} onChange={(e) => onMessageChanged(e.target.value)} className="message-input" id="outlined-basic" label="Message" variant="outlined" />
                <Button onClick={onSendClicked} variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </div>


        </div>
    )
}

function get(url: string, headers: any) {
    return fetch(url, {
        method: "GET",
        headers: headers
    })
}