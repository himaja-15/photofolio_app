import { useRef } from "react";
import {db} from "../firebaseInit";
import styles from "./AlbumForm.module.css";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AlbumForm(){

    const albumNameRef=useRef();
    // to clear Album name when clicked on clear button
    function clearForm(e){
        e.preventDefault();
        albumNameRef.current.value="";
        albumNameRef.current.focus();
    }
    async function handleSubmit(e){
        e.preventDefault();

        const docRef=await addDoc(collection(db,"album"),{
           AlbumName:albumNameRef.current.value,
           ImageList:[],
        }
        );
        toast.success("New Album Added!")
        albumNameRef.current.value="";
        albumNameRef.current.focus();
    }

    return(
        <>
        <ToastContainer/>
        <div className={styles.albumFormContainer}>
            <h1>Create an Album</h1>
            <form onSubmit={handleSubmit}>
                <input className={styles.inputField} type="text" placeholder="Album Name" ref={albumNameRef} required ></input>
                <button className={`${styles.formBtn} ${styles.clearBtn}` }onClick={clearForm}>Clear</button>
                <button className={`${styles.formBtn} ${styles.SubmitBtn}`}>Create</button>
            </form>
            
        </div>
        </>
    )
}