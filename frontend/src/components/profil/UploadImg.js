import React, { useState } from 'react';

//bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);

    dispatch(uploadPicture(data, userData.id));
  };
  return (
    <InputGroup className="mb-3">
      <Form className="mt-2" encType="multipart/form-data" onSubmit={handlePicture}>
        <Form.Control
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          style={{ backgroundColor: '#ebc9d1' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button variant="danger" id="button-addon2" type="submit" className="mt-1">
          Envoyer
        </Button>
      </Form>
    </InputGroup>
  );
};

export default UploadImg;
