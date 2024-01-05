import styles from "./Image.module.css";

export default function Image(props){
    const {image,index,handleImageDelete,handleImageEdit,openLightBox}=props;
    return(
        <>
        <div className={styles.imageCard}>
            <div>
                <img src={image.link} alt={image} onClick={()=>openLightBox(index)}>
                </img>
            </div>
            <div className={styles.imageInfo}>
                {image.name}

                <button className={`${styles.imageBtn} ${styles.editBtn}`} 
                onClick={()=>handleImageEdit(index)}>
                    Edit
                </button>

                <button className={`${styles.imageBtn} ${styles.deleteBtn}`}
                onClick={()=>handleImageDelete(index)}>
                    X
                </button>

            </div>

        </div>
        </>
    )
}