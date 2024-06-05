import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./context"
import { getImages } from "./api"


const Images = () => {
    const [images, setImages] = useState([])
    const {auth} = useContext(AuthContext)

    useEffect(() => {
        if (auth.accessToken){
            getImages({auth})
            .then(response => {
                console.log('GET IMAGES: RESPONSE ', response)
                setImages(response.data)
            })
            .catch(error => console.log('ERROR ', error))
        }
    },[auth.accessToken])
    
    
    return (
        <div>

        </div>
    )
}

export default Images