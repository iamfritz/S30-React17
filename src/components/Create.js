import React, { useState, Redirect } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Col, Row, Alert } from "react-bootstrap";

var api_url = process.env.REACT_APP_API_URL;

const Create = () => {

  const [message, setMessage] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      roles: [],
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roles: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: [...prevFormData[name], value],
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: prevFormData[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name: formData.name,
      email: formData.email,
      role: formData.roles,
    };

    const configuration = {
      method: "post",
      url: `${api_url}/members`,
      data: dataToSubmit,
      headers: {
        "Content-Type": "application/json",
      },
    };    

    // Send the data to the server using Axios
    axios(configuration)
      .then((result) => {
        let data = result.data;
        console.log(data);
        if (data.status === "success") {
          setMessage(true);
          resetForm();
          window.location.href = "/";
        } else {
          console.log(data.message);
          alert("Error submitting form.");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        alert("Error submitting form.");
      });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">
                    New Member
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={(e) => handleSubmit(e)}>
                      <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Email Address"
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPosition">
                        <Form.Label>Role</Form.Label>
                        <Form.Check
                          key="author"
                          name="roles"
                          type="checkbox"
                          value="author"
                          id="author"
                          label="Author"
                          onChange={handleChange}
                        />
                        <Form.Check
                          key="author"
                          name="roles"
                          type="checkbox"
                          value="editor"
                          id="editor"
                          label="Editor"
                          onChange={handleChange}
                        />
                        <Form.Check
                          key="author"
                          name="roles"
                          type="checkbox"
                          value="subscriber"
                          id="subscriber"
                          label="Subscriber"
                          onChange={handleChange}
                        />
                        <Form.Check
                          key="author"
                          name="roles"
                          type="checkbox"
                          value="administrator"
                          id="administrator"
                          label="Administrator"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          className="mt-5"
                          type="submit"
                        >
                          Create
                        </Button>
                      </div>
                    </Form>
                    {/* display success message */}
                    {message ? (
                      <Alert variant="success" className="mt-3">
                        <p className="mb-0">
                          You Are Registered in Successfully
                        </p>
                      </Alert>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  ); 
}

export default Create;
