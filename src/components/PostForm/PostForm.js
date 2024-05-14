import React, { useState } from 'react';
import './PostForm.scss';
import axios from 'axios'; 
import pictureIcon from '../../assets/images/pictureIcon.png';

const PostForm = ({ onSubmit, avatar }) => {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const placeholderAvatar = 'https://via.placeholder.com/150'; // Placeholder avatar URL

  const handlePostChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/posts', { text: postText, image: postImage, avatar });
      console.log(response.data.message);
      onSubmit({ text: postText, image: response.data.image, avatar }); 
      setPostText('');
      setPostImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="post-form">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="post-form__avatar">
          <img src={avatar || placeholderAvatar} alt="Avatar" className="post-form__avatar-img" />
        </div>
        <label htmlFor="fileInput" className="post-form__media-label">
          <span className="post-form__media-icon"><img className="post-form__media-icon" src={pictureIcon} alt="picture icon"/></span> Media
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handlePostChange}
          className="post-form__post-input"
        />
        {postImage && <img src={postImage} alt="Post Preview" className="post-form__post-preview" />}
        <textarea
          placeholder="Start a post..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="post-form__post-textarea"
        ></textarea>
        <button type="submit" className="post-form__submit-button">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
