import Album from "../Album/Album";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import {db} from "../firebaseInit";
import { useEffect, useState } from "react";
import styles from "./AlbumList.module.css";
import { collection, onSnapshot } from "firebase/firestore";
export default function AlbumList(){

    // setting albums
    const [albumList,setAlbumList]=useState([]);
    // displaying Add albumn form
    const [showAlbumForm,setShowAlbumForm]=useState(false);
    // 
    const [openAlbum,setOpenAlbum]=useState({albumId:"",open:false})

    useEffect(()=>{
        const unsub=onSnapshot(collection(db,"album"),(snapShot)=>{
            const card=snapShot.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data()
                }
            }
            );
            console.log(card);
            setAlbumList(card);
        })

    })
    
    return(
        <>
        <div>
            <div className={styles.mainContainer}>
                {!openAlbum.open ? (
                    <>
                    {/*  */}
                    <div className={styles.albumForm}>
                        {showAlbumForm && <AlbumForm/>}
                    </div>

                    {/* create album cancel button */}
                    <div className={styles.header}>
                        <span>Your Albums</span>
                        <button 
                        // className={styles.btn} 
                        className={`${styles.btn} ${showAlbumForm ? styles.cancelBtn : styles.addAlbumBtn}`}
                        onClick={()=>setShowAlbumForm(!showAlbumForm)}>
                            {!showAlbumForm?"Add Album" : "Cancel"}
                        </button>
                    </div>

                    {/* list of albums */}
                    <div className={styles.albumContainer}>
                        {albumList.map((card,i)=><Album key={i} 
                                                        info={card} 
                                                        setOpenAlbum={setOpenAlbum}/>)}
                    </div>

                    </>
                ):<ImageList openAlbum={openAlbum} 
                setOpenAlbum={setOpenAlbum} />}

            </div>

        </div>
        </>
    )
}