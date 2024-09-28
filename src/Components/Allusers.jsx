import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL, endURL } from '../api/ApiURL';
import Table from 'react-bootstrap/Table';
import { Button, Modal, Form } from 'react-bootstrap'; // Import Form for the search input

const Allusers = () => {
  let api = baseURL + endURL.users;

  const [state, setState] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  const getData = () => {
    axios.get(api)
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.log("Axios Error", err);
      });
  };

  useEffect(() => {
    getData();
  }, [setState, api]);

  // Handler to open the modal with user details
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Handler to reset the search input
  const handleReset = () => {
    setSearchQuery(''); // Clear the search query
  };

  // Filter the users based on the search query
  const filteredUsers = state.filter((user) =>
    user.username.toLowerCase().includes(searchQuery) ||
    user.name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      {/* Search bar and Reset button */}
      <div className="search-container d-flex justify-content-center mt-2 mb-2">
        <input
          type="text"
          className="search-bar border rounded-3 p-2"
          placeholder="Search Users"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button variant="danger" className='mx-3' onClick={handleReset}>
          Reset
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL no.</th>
            <th>UserName</th>
            <th>Full Name</th>
            <th>Details</th>
          </tr>
        </thead>
        {filteredUsers.map((value) => (
          <tbody key={value.id}>
            <tr>
              <td>{value.id}</td>
              <td>{value.username}</td>
              <td>{value.name}</td>
              <td>
                <Button variant="info" onClick={() => handleShowModal(value)}>
                  Details
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      {/* Modal to display user details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <div>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Full Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>Occupation:</strong> {selectedUser.occupation}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Website:</strong> {selectedUser.website}</p><br />
              <h4>Address:</h4>
              <p><strong>City:</strong> {selectedUser.address.city}</p>
              <p><strong>Street:</strong> {selectedUser.address.street}</p>
              <p><strong>Zip Code:</strong> {selectedUser.address.zip}</p><br />
              <h4>Hobbies:</h4>
              <p>{selectedUser.hobbies.map(String).join(', ')}</p>
            </div>
          ) : (
            <p>No user selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Allusers;
