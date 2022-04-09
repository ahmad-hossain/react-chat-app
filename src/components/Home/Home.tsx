import React from 'react'
import { Button, TextField, Backdrop, CircularProgress, Card, Typography, CardContent } from '@mui/material';
import './Home.css';
import { useState, useEffect } from 'react';
import * as Constants from '../../constants/core'
import PostItem from '../PostItem/PostItem';
import SendIcon from '@material-ui/icons/Send';
import PostModel from '../../model/PostModel'
import FormDialog from '../FormDialog/FormDialog'

interface HomeProps {
    token: string,
    currentUsername: string
}

export default function Home({ token, currentUsername }: HomeProps) {
    let [currentUser, setCurrentUser] = useState();

    console.log(`current user is ${currentUsername}`);
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [messageText, setMessageText] = useState("");
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [newCommentText, setNewCommentText] = useState("");
    const [commentPostId, setCommentPostId] = useState("");
    const [commentPostIndex, setCommentPostIndex] = useState(-1);
    const [postsLoading, setPostsLoading] = useState(true);

    const headers: HeadersInit = {
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
                console.log(`Received posts: ${JSON.stringify(data)}`)
                setPosts(data)

                //posts are done loading, so set to false
                setPostsLoading(false);
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
                    if (data.comments !== undefined && data.comments.length === 0) {
                        delete data.comments;
                    }

                    setPosts([data, ...posts])
                })

            //clear the message TextField
            setMessageText("")
        }
    }
    const addCommentClicked = (postId: string, postIndex: number) => {
        setCommentPostId(postId);
        setCommentPostIndex(postIndex);
        setCommentDialogOpen(true);
    }
    const addCommentSubmit = () => {
        //close dialog
        setCommentDialogOpen(false);

        //POST request with comment using commentPostId
        post(
            `${Constants.baseUrl}/feed/${commentPostId}/comment`,
            headers,
            JSON.stringify({ text: newCommentText })
        )
            .then(res => res.json())
            .then(data => {
                console.log(`posted comment ${JSON.stringify(data)}`)

                //update post to have the comment in posts-state

                let updatedPosts = [...posts];
                let updatedPost = posts[commentPostIndex];

                //if comments doesn't exist for post
                if (updatedPost.comments === undefined) {
                    //set comments to be 
                    updatedPost.comments = [data];
                } else {
                    //push new comment into post
                    updatedPosts[commentPostIndex]['comments'].push(data);
                }
                console.log(`updated post: ${JSON.stringify(updatedPost.comments)}`)

                updatedPosts[commentPostIndex] = updatedPost;

                setPosts(updatedPosts)
            })


        //clear post ID, postIndex, and dialog text
        setCommentPostId("");
        setCommentPostIndex(-1);
        setNewCommentText("");

    }
    const handleDialogClose = () => {
        setCommentDialogOpen(false);
    }
    return (
        <div className="home-screen">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={postsLoading}
                >
                <Card className="card">
                    <CardContent className="card-content">
                        <CircularProgress color="inherit" />
                            {"Loading Posts"}
                    </CardContent>
                </Card>
            </Backdrop>

            <FormDialog
                open={commentDialogOpen}
                handleClose={handleDialogClose}
                handleConfirm={addCommentSubmit}
                onCommentTextChange={setNewCommentText}
                commentText={newCommentText}
                textFieldLabel={"Comment"}
                dialogTitle={"Add Comment"}
                confirmBtnText={"Add"}
                cancelBtnText={"Cancel"}
            />
            <h1>Chat</h1>

            <div className='imessage'>
                {posts.map((post: PostModel, index) =>
                    <PostItem
                        className={post.user.username === currentUsername ? 'from-me' : 'from-them'}
                        post={post}
                        key={post.id}
                        addCommentClicked={() => addCommentClicked(post.id, index)}
                    />
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

const post = (url: string, headers: HeadersInit, body: BodyInit) => {
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: body
    })
}