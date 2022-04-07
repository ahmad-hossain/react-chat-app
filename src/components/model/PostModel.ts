import User from './User'

export default interface PostModel {
    text: string,
    user: User
    createdAt: string,
    updatedAt: string,
    id: string,
    comments: []
}