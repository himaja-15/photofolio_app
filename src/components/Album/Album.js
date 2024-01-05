import styles from "./Album.module.css";
import myImg from "../images/download.png"
export default function Album(props){

    var {info,setOpenAlbum}=props;

    function handleClick(){
        setOpenAlbum({albumId:info.id,open:true})
    }
    return(
        <>
        <div className={styles.AlbumCardContainer}>
            <div className={styles.cardImage} onClick={handleClick}>
                <img src={myImg}></img>
                <div className={styles.cardName}>
                    {info.AlbumName}
                </div>
            </div>

        </div>
        </>
    )
}