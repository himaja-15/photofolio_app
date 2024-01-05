import { ToastContainer, toast } from "react-toastify";
import styles from "./ImageForm.module.css";
import { useRef } from "react";
import { doc, updateDoc,arrayRemove} from "firebase/firestore";
import { db } from "../firebaseInit";
import { useEffect,arrayUnion } from "react";

export default function ImageForm(props){

    const {albumId,updateImage,setUpdateImage,setShowImageForm}=props;

    const imageNameRef=useRef();
    const imageUrlRef=useRef();

    useEffect(()=>{
        if(updateImage){
            imageNameRef.current.value=updateImage.name;
            imageUrlRef.current.value=updateImage.link;
        }
    },[updateImage]);

    function clearForm(){
        imageNameRef.current.value="";
        imageUrlRef.current.value="";
        imageNameRef.current.focus();
    }

    async function handleUpdateSubmit(e){
        e.preventDefault();

        const oldData={
            name:updateImage.name,
            link:updateImage.link
        }

        const newData={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value
        }

        const albumRef=doc(db,'album',albumId);
        updateDoc(albumRef,{
            imageList:arrayUnion(newData) 
        })

        updateDoc(albumRef,{
            imageList:arrayRemove(oldData)
        })
        toast.success("Image Updated!");
        setUpdateImage(null);
        setShowImageForm(false);
        clearForm();
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        const data={
            name:imageNameRef.current.value,
            link:imageUrlRef.current.value

        }
        const albumRef=doc('db','album',albumId);
        await updateDoc(albumRef,{
            imageList:arrayUnion(data)
        })
        toast.success("New Image got added successfully!");
        clearForm();

    }


    return(
        <>
        <ToastContainer/>
        <div className={styles.formContainer}>
            <h1>{updateImage? "Add an Image":"Update Image"}</h1>
            <form onSubmit={updateImage?handleUpdateSubmit:handleSubmit}>

                {/* input box for title */}
                <input type="text" 
                placeholder="Title" 
                ref={imageNameRef} 
                className={styles.title}
                required>
                </input>

                <br></br>
                {/* input box for Image URL */}
                <input type="text"
                placeholder="Image URL"
                ref={imageUrlRef}
                className={styles.ImageURL}
                required>
                </input>

                <br></br>

                <button className={`${styles.Add} ${styles.btn}`} >
                    {!updateImage?"Add":"Update"}
                </button>

                <button className={`${styles.Clear} ${styles.btn}`}
                    onClick={clearForm}>Clear
                </button>

            </form>
        </div>
        </>
    )
}