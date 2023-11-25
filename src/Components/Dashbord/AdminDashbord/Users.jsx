import { useEffect, useState } from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/get_users").then((res) => setUsers(res.data));
  }, [axiosPublic]);
  console.log(users);

  // modal handle.
  const [modalData, setModalData] = useState(null);
  const modalHandle = (data) => {
    setModalData(data);
    document.getElementById("my_modal_3").showModal();
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.photoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {`${item.upazila} , ${item.district}`}
                  </span>
                </td>
                <td>{item.bloodGroup}</td>
                <th>
                  <button
                    onClick={() => modalHandle(item)}
                    className="btn btn-ghost btn-xs"
                  >
                    see info
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Name</td>
                  <td className="font-bold text-black text-lg">{modalData?.name}</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>E-mail</td>
                  <td className="font-bold text-black text-lg">{modalData?.email}</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Login Password</td>
                  <td className="font-bold text-black text-lg">{modalData?.password}</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>Blood Group</td>
                  <td className="font-bold text-black text-lg">{modalData?.bloodGroup}</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>District</td>
                  <td className="font-bold text-black text-lg">{modalData?.district}</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Upazila</td>
                  <td className="font-bold text-black text-lg">{modalData?.upazila}</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>Role</td>
                  <td className="font-bold text-black text-lg">{modalData?.role}</td>
                </tr>
                <tr>
                  <th>8</th>
                  <td>Status</td>
                  <td className="font-bold text-black text-lg">{modalData?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Users;
