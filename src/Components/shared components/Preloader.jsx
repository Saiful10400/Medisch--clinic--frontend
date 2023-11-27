import loading from "../../../public/image/loading.gif"

const Preloader = () => {
    return (
        <div className={`w-[calc(100vw-319px)] bg-white h-screen border-2 top-0 left-[319px] absolute z-20 flex justify-center items-center`}>
      
        <img src={loading} alt="" />
      </div>
    );
};

export default Preloader;