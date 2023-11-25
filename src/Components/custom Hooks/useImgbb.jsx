import { useEffect, useState } from "react";

const useImgbb = (file) => {

    const[photoUrl,seturl]=useState(null)
//   const file = data.file[0];
  const image = new FormData();
  image.append("image", file);

useEffect(()=>{
    fetch("https://api.imgbb.com/1/upload?key=a141acb20e39bec8f17a125bed57972b", {
        method: "POST",
        body: image,
      })
        .then((details) => details.json())
        .then((res) =>{
            seturl(res.data.display_url)
        });
},[])

    return photoUrl
};

export default useImgbb;
