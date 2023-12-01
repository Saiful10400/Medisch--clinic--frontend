import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { useEffect } from "react";
import { useState } from "react";

const Reservation = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/get_all_bookedData").then((res) => setData(res.data));
  }, []);
  console.log(data);

  const [id, setId] = useState("");
  // cv link past handle.

  const CvLInkPastHandle = (e) => {
    e.preventDefault();
    const link = e.target.cvLink.value;
   
    if(link.split("").length>=1){
      axiosPublic.post("/update_cv_link",{link,id})
    .then(res=>console.log(res.data))
    }
  };

  return (
    <div>
      <div className="overflow-x-auto w-[100vw] lg:w-[60vw] mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <th></th>

                <td>
                  {item.userName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.userEmail}
                  </span>
                </td>
                <td>{item.name}</td>
                <td>{item.price - item.discount}</td>
                <td>{item.report ? "Delevered" : "Pending"}</td>
                <td className="flex gap-2">
                  <form onSubmit={CvLInkPastHandle}>
                    <input
                      className="focus:outline-none border-2 rounded-md pl-2"
                      placeholder="Past Cv link."
                      type="text"
                      name="cvLink"
                    />{" "}
                    <button
                      type="submit"
                      onClick={() => setId(item._id)}
                      className="btn btn-primary btn-sm"
                    >
                      {item.report ? "Resubmit" : "Submit"}
                    </button>
                  </form>
                </td>
                <th>
                  <button className="btn  btn-xs btn-warning">cancel</button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default Reservation;
