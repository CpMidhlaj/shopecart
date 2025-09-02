import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ListUsers.css";
import {  deleteUserThunk, ListAllUserThunk, updateUserRoleThunk, updateUserStatusThunk } from "../redux/userSlice"
import { useEffect } from "react"
import useToastAndNavigate from "../hooks/useToastAndNavigate"
import { useState } from "react"
function ListUsers(){
 const {users} = useSelector((state)=> state.userData)
  const dispatch = useDispatch();
  const toastAndNavigate = useToastAndNavigate();
  const [show, setShow] = useState(false);
  const [deleteUserID,setDeleteUesrID] = useState(null);

  const handleClose = () => setShow(false);


 

   
    

  useEffect(() => {
    dispatch(ListAllUserThunk());
  }, [dispatch]);

  const handleUserRoleChange = (userId, role)=>{
    dispatch(updateUserRoleThunk({_id:userId,role}))
    .unwrap()
    .then((data) => toastAndNavigate(data.success,data.message, '/listusers'))
    .catch((err)=> toastAndNavigate(false, err.message))
  } 

  const handleUserStatusUpdate =(userID)=>{
  dispatch(updateUserStatusThunk(userID))
    .unwrap()
    .then((data) => toastAndNavigate(data.success,data.message, '/listusers'))
    .catch((err)=> toastAndNavigate(false, err.message))
  }
    const handleUserDelete = ()=>{
     dispatch(deleteUserThunk(deleteUserID))
    .unwrap()
    .then((data) => toastAndNavigate(data.success,data.message, '/listusers'))
    .catch((err)=> toastAndNavigate(false, err.message))
    setShow(false);
    setDeleteUesrID(null)
    }

    const handleModal = (userID)=>{
      setDeleteUesrID(userID)
      setShow(true)
    }

    return(

        <>
        <Container>
          <Row>
            <Col className="tp">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>User FullName</th>
                    <th>User Email</th>
                    <th>User Age</th>
                    <th>User Role</th>
                    <th>User status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.map((user, indext) =>(
                  <tr key={indext}>
                    <td>{indext +1 }</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Form.Select 
                      onChange={(event) => handleUserRoleChange(user._id, event.target.value)}
                      value={user?.role}
                      >
                       <option value="admin">Admin</option>
                       <option value="user">User</option>
                      </Form.Select>
                    </td>
                    <td>   <Form.Check // prettier-ignore
                       type="switch"
                        id="custom-switch"
                      label={user?.status? "Active" : "Inactive"}
                      onChange={()=>handleUserStatusUpdate(user._id)}
                      checked={user?.status}
                     /></td>
                    <td>
                      <Link to={`/admin/edituser/${user.id}`}><FaEdit/></Link></td>
                    <td><Link onClick={()=> handleModal(user._id)}>
                    <MdDelete />
                    </Link></td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleUserDelete}>
            Yes,Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )

}
export default ListUsers