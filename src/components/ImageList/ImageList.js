import ImageForm from "../ImageForm/ImageForm";
import Image from "../Image/Image";
import "./ImageList.module.css";
import styles from "./ImageList.module.css";
import {db} from "../firebaseInit";
import { useEffect, useState } from "react";
import { doc,arrayRemove, onSnapshot, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";


export default function ImageList(props){

    const {openAlbum,setOpenAlbum}=props;
    const [showImageForm,setShowImageForm]=useState(false);
    const [updateImage,setUpdateImage]=useState(null);
    const [imageList,setImageList]=useState([]);
    const [search,setSearch]=useState('');

    // lightbox
    const [isOpen,setIsOpen]=useState(false);
    const [currentImageIndex,setCurrentImageIndex]=useState(0);


    // to go back to album list page
    function handleBackClick(e){
        e.preventDefault();
        setOpenAlbum({
            albumId:"",
            show:false
        })

    }

    // to get all images from database
    // useEffect(()=>{
    //     const unsub=onSnapshot(doc(db,"album",openAlbum.albumId), (doc)=>{
    //         const data=doc.data().imageList;
    //         setImageList(data);

    //     });
    //     return ()=>unsub();
    // },[openAlbum.albumId]);

    // useEffect(() => {
    //     // Check if openAlbum.albumId exists before querying the database
    //     if (openAlbum.albumId) {
    //         const albumRef = doc(db, "album", openAlbum.albumId);
    //         const unsub = onSnapshot(albumRef, (doc) => {
    //             if (doc.exists()) {
    //                 const data = doc.data()?.imageList;
    //                 setImageList(data || []);
    //             } else {
    //                 // Handle the case where the document doesn't exist
    //                 console.error("Document does not exist");
    //             }
    //         });
    
    //         return () => unsub(); // Cleanup function
    //     }
    // }, [openAlbum.albumId]);

    
// final working
    useEffect(() => {
        let unsubscribe; // Declare unsubscribe function outside the callback

        // Check if openAlbum.albumId exists before querying the database
        if (openAlbum.albumId) {
            const albumRef = doc(db, "album", openAlbum.albumId);
            
            // Use a variable to store the unsubscribe function
            unsubscribe = onSnapshot(albumRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data()?.imageList;
                    setImageList(data || []);
                } else {
                    // Handle the case where the document doesn't exist
                    console.error("Document does not exist");
                }
            });
        }

        // Cleanup function
        return () => {
            if (unsubscribe) {
                unsubscribe(); // Call the unsubscribe function if it exists
            }
        };
    }, [openAlbum.albumId]);

   

    // deleting an image from the list
    async function handleImageDelete(image){
        const albumRef=doc(db,"album",openAlbum.albumId);
        await updateDoc(albumRef,{
            imageList:arrayRemove(image)
        });
        toast.success("Image Successfully got deleted from the Album!");
    }

    // 
    function handleImageEdit(image){
        setUpdateImage(image);
        setShowImageForm(true);
    }
    // open lightbox
    const openLightBox=(index)=>{
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    // close lightbox
    const closeLightBox=(index)=>{
        setIsOpen(false);
    };


    return(
        <>
        <ToastContainer/>
        <div className="ImageList">

            {/* back button to redirect
            <button className={`${styles.btn} ${styles.backbtn}`}
              
                onClick={handleBackClick}>
                   
                   
            </button> */}
            <img className={`${styles.btn} ${styles.backbtn}`}
              
                onClick={handleBackClick} src="https://mellow-seahorse-fc9268.netlify.app/assets/back.png">
                   
                   
            </img>

            {/* to search in album */}
            <input  className={styles.inputBox} type="text" placeholder="Search Image..." onChange={(e)=>setSearch(e.target.value)}>
            </input>

            <button  
            className={`${styles.btn} ${showImageForm ? styles.cancelBtn : styles.addBtn}`}
                onClick={()=>setShowImageForm(!showImageForm)}>
                {!showImageForm?"Add Image" :"Cancel"}
            </button>

        </div>


        {/* image form to add image */}
        <div style={{textAlign:"center"}}>
            {showImageForm && <ImageForm albumId={openAlbum.albumId} 
                                        updateImage={updateImage} 
                                        setUpdateImage={setUpdateImage} 
                                        setShowImageForm={setShowImageForm}/>}
            <h1>{imageList.length!==0 ? "Your Collection":"No Images found in the album."}</h1>

        </div>
        {/* looping over image list */}
        <div>
            {imageList.filter((image)=>{
                return search.toLocaleLowerCase()===""? image : image.name.toLocaleLowerCase().includes(search);
            }).map((image,i)=><Image key={i}
                                     image={image}
                                     index={i}
                                     handleImageEdit={handleImageEdit}
                                     handleImageDelete={handleImageDelete}
                                     openLightBox={openLightBox}/>)}
        </div>
        {/* if image is clicked light box should open */}
        {isOpen && (
            <div className="lightbox" onClick={closeLightBox}>
                <div>
                    <button className="close-button" onClick={closeLightBox}>
                        Close
                    </button>
                    <img className="lightbox-image" 
                         src={imageList[currentImageIndex].link}
                         alt={`Image ${currentImageIndex}`}/>
                </div>
            </div>
        )}
        </>
    )
}

