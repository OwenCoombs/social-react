import { useContext, useState } from 'react';
import { AuthContext } from './context';
import { createImage } from './api';


const UploadImage = ({ updateImages }) => {
  const { auth } = useContext(AuthContext);
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState('');

  const submit = () => {
    createImage({ auth, title, image }).then(response => {
      console.log('UPLOAD IMAGE: RESPONSE: ', response);
      // Call the function to update images after successful upload
      updateImages();
    });
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Post</h1>
      <div className="input-group">
        <label className="input-label">Post Title</label>
        <input 
          type="text"
          className="input-field"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="input-group">
        <input 
          accept="image/*" 
          className="file-input"
          onChange={e => setImage(e.target.files[0])}
          type="file" 
        />
      </div>
      <div className="button-group">
        <button className="submit-button" onClick={() => submit()}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadImage;

