import React from 'react';
import './Post.scss';

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <img src={post.avatar} alt="Avatar" className="post__avatar-img" />
      </div>
      <div className="post__content">
      <p className="post__text">{post.text}</p>
        {post.image && <img src={post.image} alt="Post Image" className="post__image" />}
      </div>
    </div>
  );
};

export default Post;
