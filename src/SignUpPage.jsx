import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../global";
import * as yup from "yup";

const formValidationSchema = yup.object({
  name: yup.string().required("required"),
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required").min(8),
});

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        fetch(`${API}/signup`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
        navigate("/");
      },
    });

  const reDirect = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="login-container">
        <h2>Sign up</h2>
        <CardContent className="card-content">
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            variant="outlined"
            error={touched.name && errors.name}
            helperText={touched.name && errors.name ? errors.name : null}
          />
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="email"
            variant="outlined"
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <TextField
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="password"
            variant="outlined"
            type="password"
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          <Button type="submit" color="success" variant="contained">
            Register
          </Button>
          <small style={{ opacity: 0.5 }}>already registered ?</small>
          <h5 className="signin" onClick={() => reDirect()}>
            sign in
          </h5>
        </CardContent>
      </Card>
    </form>
  );
};
