import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const BlogTable = ({ blogs, onEditClick, onDeleteClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [blogsPerPage] = useState(10);
  const pageCount = Math.ceil(blogs.length /blogsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <Table bgcolor='#ffffff' bordered  responsive>
      <thead className='heading_user'>
        <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.slice(
                      currentPage * blogsPerPage,
                      (currentPage + 1) * blogsPerPage
                    ).map((blog) => (
                  <tr key={blog.id}>
                    <td className='text-id'>{blog.id}</td>
                    <td>
                      <img className='text-user' src={blog.image} alt={blog.title} width="100" height={"100"}/>
                    </td>
                    <td className='text-user'>{blog.title}</td>
                    <td className='text-user'>{blog.description}</td>
                    <td>
                      <Link 
                        variant="primary" 
                        onClick={() => onEditClick(blog)}
                        className="mr-2 edit_users"
                        // className=""
                      >
                        Edit
                      </Link>
                      <Link 
                      className='edit_users'
                        variant="danger" 
                        onClick={() => onDeleteClick(blog.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
              ))}

              <tr>
              <td colSpan="8" className="pagination-row">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </td>
            </tr>
      </tbody>
    </Table>
  );
};

export default BlogTable;
