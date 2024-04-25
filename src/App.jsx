import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "./ContextProvider.jsx";
import axios from 'axios';

export default function App() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params ? params.id : null;

  const [permission, setPermission] = useState({
    permissions: [],
    group_name: "",
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://estatelex.com.ng/api/role/create")
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        //console.log("API response data:", data.permissions);
        if (data && data.permissions) {
          setPermission(data.permissions); // Set permissions directly
        } else {
          console.error("Data structure is incorrect:", data);
        }
      })
      .catch(() => {
        setLoading(false);
      });

    if (id) {
      setLoading(true);
      axios
        .get(`/role/${id}/edit`)
        .then(({ data }) => {
          setLoading(false);
          if (data && data.permissions && data.roles) {
            setPermission(data.permissions); // Set permissions directly
          } else {
            console.error("Data structure is incorrect:", data);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPermission((prevPermission) => ({
      ...prevPermission,
      [name]: value,
    }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();

    // used by the update page route which has an id
    if (permission.id) {
      formData.append("_method", "PUT");
    }

    formData.append("name", permission.name);
    formData.append("guard_name", permission.guard_name);
    formData.append("group_name", permission.group_name);

    const endpoint = permission.id ? `/role/${permission.id}` : "/role/store";

    axios
      .post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setNotification("Permission was successfully updated");
        navigate("/role-permission");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <h1>{id ? "Update Role/Permissions" : "Create New Role/Permissions"}</h1>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="role">Role Name:</label>
          <input
            type="text"
            name="role"
            value={permission.name}
            onChange={handleInputChange}
            placeholder="Role Name"
          />
        </div>

        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <div>
                {permission.permissions &&
                  Object.keys(permission.permissions).map((groupName) => (
                    <div key={groupName}>
                      <p>
                        <b>{groupName}:</b>
                      </p>
                      <div className="row">
                        {permission.permissions[groupName].map((permission) => (
                          <div
                            className="form-group col-md-2"
                            key={permission.id}
                          >
                            <label className="custom-switch mt-2">
                              <input
                                type="checkbox"
                                value={permission.name}
                                onChange={handleInputChange}
                                name="permissions[]"
                                className="custom-switch-input"
                              />
                              <span className="custom-switch-indicator"></span>
                              <span className="custom-switch-description">
                                {permission.name}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btnn">
                {id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
