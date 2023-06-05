import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { blogSearchTerm, blogSearchSetTerm } from "../../../reducers/blogSearchReducer";
import { useDispatch, useSelector } from "react-redux";

const BlogSearch = () => {
    const dispatch = useDispatch();
    const term = useSelector(blogSearchTerm);

  return (
    <Form className="d-flex mb-3">
      <Form.Group className="mb-3 w-25" controlId="formBasicText">
        <Form.Control 
            type="text" 
            placeholder="Enter search key"
            onChange={(event) => dispatch(blogSearchSetTerm(event.target.value))}
            value={term}
            className="fs-4"
        />
      </Form.Group>
    </Form>
  );
};

export default BlogSearch;
