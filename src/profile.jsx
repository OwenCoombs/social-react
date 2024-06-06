import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { getUserPosts } from "./api";
import UploadImage from "./uploadImage";


const YourFeed = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { auth } = useContext(AuthContext);

  const fetchUserPosts = async () => {
    try {
      const posts = await getUserPosts(auth.accessToken);
      setUserPosts(posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    if (auth.accessToken) {
      fetchUserPosts();
    }
  }, [auth.accessToken]);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId, { auth });
      // Refresh user posts after deletion
      fetchUserPosts();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="images-container">
      <UploadImage updateImages={fetchUserPosts} />
      <h1 className="text-center p-4">Your Feed</h1>
      <div className="images-grid">
        {userPosts.map(post => (
          <div key={post.id} className="image-post">
            <img 
              src={`http://127.0.0.1:8000/${post.image}`}  
              alt={post.title}
              className="image-post-img"
            />
            <h4 className="image-post-title">{post.title}</h4>
            <p className="text-center">{post.description}</p>
            <img 
              id='trash' 
              alt="Delete" 
              onClick={() => handleDeletePost(post.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourFeed;