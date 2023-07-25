import { BrowserRouter as Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Col, Row, Form } from "react-bootstrap";

var api_url = process.env.REACT_APP_API_URL;

const Member = (props) => (
  <tr>
    <td>{props.member.name}</td>
    <td>{props.member.email}</td>
    <td>
      <ul>
        {props.member.roles.map((role, sIndex) => {
          return <li> {role} </li>;
        })}
      </ul>
    </td>
    <td>
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteMember(props.member.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    axios
      .get(`${api_url}/members`)
      .then((response) => {
        let result = response.data;
        setMembers(result.data);
      })
      .catch((error) => {
        console.error("Error fetching members data:", error);
      });
  }, []);

  const filteredMembers =
    selectedRole === "all"
      ? members
      : members.filter((member) => member.roles.includes(selectedRole));

  const filterByRole = (event) => {
    setSelectedRole(event.target.value);
  };

  const deleteMember = (id) => {
    if (!window.confirm("Are you sure you want to delete the record?")) {
      return false;
    }

    axios
      .delete(`${api_url}/members/${id}`)
      .then((response) => {
        console.log("Record deleted successfully.");

        const newMembers = members.filter((el) => el.id !== id);
        setMembers(newMembers);
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  function recordList() {
    return filteredMembers.map((member) => {
      return (
        <Member member={member} deleteMember={() => deleteMember(member.id)} />
      );
    });
  }

  return (
    <div>
      <Container>
        <div className="border border-3 border-primary"></div>
        <Card className="shadow">
          <Card.Body>
            <div className="mb-3 mt-md-4">
              <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <h2 className="fw-bold mb-2 text-uppercase ">Member List</h2>
                </Col>
                <Col className="text-end" xs={12} sm={12} md={6} lg={6}>
                  <select
                    onChange={filterByRole}
                    className="form-control"
                  >
                    <option value="all">All Roles</option>
                    <option value="Author">Author</option>
                    <option value="Editor">Editor</option>
                    <option value="Subscriber">Subscriber</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                  {role}
                </Col>
              </Row>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{recordList()}</tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default MembersList;
