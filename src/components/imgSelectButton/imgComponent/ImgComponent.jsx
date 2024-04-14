"use client"
import Image from "next/image";

const ImgComponent = ({item}) => {
  return (
    <div className="imageContainer">
        <Image src={item.url} fill alt={item.alt} />        
    </div>
  )
}

export default ImgComponent