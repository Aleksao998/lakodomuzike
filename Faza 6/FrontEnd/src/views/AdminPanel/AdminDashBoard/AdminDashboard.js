import React, { useState } from "react";
import MaterialTable from "material-table";
import tableIcons from "../../../assets/table";
import { useAlert } from "react-alert";
import { updateLanguageServiceSourceFile } from "typescript";
function DashBoard(props) {
  const alert = useAlert();
  const [users, setUsers] = useState([]);
  const [adds, setAdds] = useState([]);

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    console.log("usao");
    console.log(props.token);
    fetch("http://localhost:5000/api/v1/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
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
        var array = [];
        resData.data.forEach((element) => {
          var email = element.email;
          var role = element.role;
          var id = element._id;
          var obj = {
            email,
            role,
            id,
            password: "***************",
          };
          array.push(obj);
        });
        setUsers(array);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/api/v1/ad", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
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
        var array = [];
        resData.data.forEach((element) => {
          var id = element._id;
          var adName = element.adName;
          var description = element.description;
          var typeOfMusic = element.typeOfMusic;
          var obj = {
            id,
            adName,
            description,
            typeOfMusic,
          };
          array.push(obj);
        });
        setAdds(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteUser = (id) => {
    fetch("http://localhost:5000/api/v1/user/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUser = (data) => {
    fetch("http://localhost:5000/api/v1/user/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify({
        email: data.email,
        role: data.role,
        password: data.password,
      }),
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
  };

  return (
    <div className="adminDasboard">
      <div style={{ marginBottom: "25px" }}>
        <MaterialTable
          icons={tableIcons}
          data={users}
          columns={[
            { title: "Email", field: "email" },
            { title: "Rola", field: "role" },
            { title: "Šifra", field: "password" },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                console.log(newData);
                updateUser(newData);
                var array = [...users];
                var index = array.indexOf(oldData);
                array[index] = newData;
                setUsers(array);
                alert.success("Korisnik uspesno Ažuriran");
                resolve();
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                deleteUser(oldData.id);
                var array = [...users]; // make a separate copy of the array
                var index = array.indexOf(oldData);
                console.log(index);
                if (index !== -1) {
                  console.log("usao");
                  array.splice(index, 1);
                  setUsers(array);
                  alert.success("Korisnik uspesno Obrisan");
                }
                resolve();
              }),
          }}
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
      <MaterialTable
        icons={tableIcons}
        data={adds}
        columns={[
          { title: "Naziv oglasa", field: "adName" },
          { title: "Opis", field: "description" },
          { title: "Tip", field: "typeOfMusic" },
        ]}
        actions={[
          {
            icon: "delete",
            tooltip: "Obrisi",
            onClick: (event, rowData) => {
              fetch("http://localhost:5000/api/v1/ad/" + rowData.id, {
                method: "DELETE",
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
                  setAdds(adds.filter((item) => item.id !== rowData.id));
                  alert.success("Oglas uspešno obrisan");
                })
                .catch((err) => {
                  console.log(err);
                });
            },
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
        title="Svi oglasi"
      />
    </div>
  );
}

export default DashBoard;
