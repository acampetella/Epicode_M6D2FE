import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import BlogSearch from "../../components/blog/blog-search/BlogSearch";

const Home = (props) => {
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
      <BlogSearch/>
      <BlogList />
    </Container>
  );
};

export default Home;
