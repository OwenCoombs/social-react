import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { getImages } from "./api";
import UploadImage from "./uploadImage";


const Images = () => {
  const [images, setImages] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.accessToken) {
      getImages({ auth })
        .then(response => {
          console.log('GET IMAGES: RESPONSE: ', response);
          setImages(response.data);
        })
        .catch(error => console.log('ERROR: ', error));
    }
  }, [auth.accessToken]);

  return (
    <div className="images-container">
      <UploadImage />
      <h1>Images</h1>
      <div className="images-grid">
        {images && images.map(image => (
          <div key={image.id} className="image-post">
            <img 
              src={`http://127.0.0.1:8000/${image.image}`}  
              alt={image.title}
              className="image-post-img"
            />
            <h4 className="image-post-title">{image.title}</h4>
            <p className="text-center">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
