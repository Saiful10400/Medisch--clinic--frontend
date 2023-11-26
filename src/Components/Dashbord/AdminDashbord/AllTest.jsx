import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

const AllTest = () => {
  const axiosPublic = useAxiosPublic();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get_test");
      return res.data;
    },
  });
  console.log(users);

  // update handle.
  const updateHandle = (arg) => {
    axiosPublic.patch("/update_test", { id: arg._id }).then((res) => {
      console.log(res);
      refetch();
    });
  };

  //   dlete handle.

  const deleteHandle = (arg) => {
    axiosPublic.post("/delete_test", { id: arg._id }).then((res) => {
      refetch();
      console.log(res.data);
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Details</th>
              <th>Slots</th>
              <th>Slots</th>
              <th>Slots</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, idx) => (
              <tr key={idx}>
                <th>1</th>
                <td>{item.testName}</td>
                <td>{item.details}</td>
                <td>{item.slots}</td>
                <td>{item.price}</td>
                <td>{item.reservation}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    onClick={() => deleteHandle(item)}
                    className="btn btn-sm btn-warning"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => updateHandle(item)}
                    className="btn btn-sm btn-success"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTest;
