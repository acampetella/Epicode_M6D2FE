import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './style.css';
import { blogSearchTerm } from "../../../reducers/blogSearchReducer";
import { useDispatch, useSelector } from "react-redux";
import { getPostsList, blogListLoading, blogListError, postsList } from "../../../reducers/blogListReducer";
import {RingLoader} from 'react-spinners';

const BlogList = (props) => {

  const dispatch = useDispatch();
  const searchKey = useSelector(blogSearchTerm);
  const myPosts = useSelector(postsList);
  const isLoading = useSelector(blogListLoading);
  const error = useSelector(blogListError);
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 1,
    totalPages: 0
  });

  const onClickFn = (event) => {
    if (event.isNext) {
      nextPage();
    } else if (event.isPrevious) {
      previousPage();
    } else {
      if (event.nextSelectedPage === undefined) {
        setCurrentPage(event.selected + 1);
      } else {
        setCurrentPage(event.nextSelectedPage + 1);
      }
    }
  };

  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setCurrentPage(pagination.currentPage + 1);
    }
  };

  const previousPage = () => {
    if (pagination.currentPage > 1) {
      setCurrentPage(pagination.currentPage - 1);
    }
  };

  const setCurrentPage = (value) => {
    setPagination({
      ...pagination,
      currentPage: value
    });
  };

  useEffect(() => {
    dispatch(getPostsList([pagination.currentPage, searchKey])).then(response => {
      const payload = response.payload;
      setPagination({
        count: payload.count,
        currentPage: payload.currentPage,
        totalPages: payload.totalPages
        });
      }
    ).catch(error => toast.error(`Si è verificato il seguente errore: ${error}`));
  }, [dispatch, pagination.currentPage, searchKey]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Row>
        {isLoading && !error && <RingLoader color="#36d7b7" size={100}/>}
        {!isLoading && error && toast.error(`Si è verificato il seguente errore: ${error}`)}
        {!isLoading && !error && myPosts &&
          myPosts.map((post) => (
            <Col
              md={4}
              style={{
                marginBottom: 50,
              }}
            >
              <BlogItem key={post.title} {...post} />
            </Col>
          ))}
      </Row>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={20}
        pageCount={pagination.totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        onClick={onClickFn}
        activeClassName="activeClassName"
      />
    </>
  );
};

export default BlogList;
