import User from './User'
import Comment from './Comment'

export default interface PostModel {
    text: string,
    user: User
    createdAt: string,
    updatedAt: string,
    id: string,
    comments: {any: Comment}
}