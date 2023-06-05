import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";

const NewBlogPost = (props) => {

  const formDataInitialState = {
    title: '',
    category: "Category1",
    author: {
      name: "Andrea Campetella"
    },
    content: ''
  }

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [formData, setFormData] = useState(formDataInitialState);
  const [html, setHTML] = useState(null);

  const checkFields = () => {
    if (formData.title !== '' && formData.content !== '' && formData.content !== null) {
      return true;
    }
    return false;
  };
  
  const sendPost = async (event) => {
    event.preventDefault();
    if (checkFields()) {
      try {
        const data = await fetch("http://localhost:5050/blogPosts", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();
        checkStausCode(response.statusCode);
      } catch (error) {
        toast.error("Errore nell'invio del post");
      }
    } else {
      toast.error("I campi del post devono essere tutti valorizzati");
    }
    resetFields();
  };

  const resetFields = () => {
    setFormData(formDataInitialState);
    setEditorState(EditorState.createEmpty());
    setHTML(convertToHTML(editorState.getCurrentContent()));
  };

  const checkStausCode = (code) => {
    switch(code) {
      case 201:
        toast.success("Post inviato correttamente");
        break;
      case 400:
        toast.error("Problemi nella validazione del post");
        break;
      case 409:
        toast.error("Post duplicato");
        break;
      case 500:
        toast.error("Problemi interni del server");
        break;
      default:
        toast.error("errore sconosciuto");
    }
  };

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Container className="new-blog-container">
        <Form className="mt-5">
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value
                })
              }
            >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
              value={html}
              onChange={() =>
                setFormData({
                  ...formData,
                  content: html,
                })
              }
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{
                marginLeft: "1em",
              }}
              onClick={sendPost}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default NewBlogPost;
