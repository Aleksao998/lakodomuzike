import React, { useState } from "react";
import MaterialTable from "material-table";
import tableIcons from "../../../assets/table";
function DashBoard() {
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    console.log("usao");
    fetch("http://localhost:5000/api/v1/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="adminDasboard">
      <MaterialTable
        icons={tableIcons}
        data={users}
        columns={[]}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => {},
          },
          {
            icon: "search",
            tooltip: "View Add",
            onClick: (event, rowData) => {},
          },
        ]}
        options={{
          pageSize: 5,
          paging: true,
        }}
        localization={{
          pagination: {
            labelRowsPerPage: "6",
          },
        }}
        title="Prijavljeni korisnici"
      />
    </div>
  );
}

export default DashBoard;
