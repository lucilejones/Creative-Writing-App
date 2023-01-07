import React from 'react'
import Comment from './Comment'

export default function CommentList(props){
    const {comments, deleteComment} = props

    return (
        <div className='comments-list'>
            {comments.map(comment => <Comment {...comment} key={comment._id} deleteComment={deleteComment}/>)}
        </div>
    )
}