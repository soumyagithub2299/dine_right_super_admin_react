import React, { useState } from "react";
import "../../HomePageBannerImg/HomeHeroSectionTable/HomeHeroSectionTable.css";
import ReactPaginate from "react-paginate";
import { MdDelete } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import AddCourseModal from "../AddCourseModal/AddCourseModal"; // Import the add banner modal
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal"; // Import the delete modal
import EditCourseModal from "../EditCourseModal/EditCourseModal"; // Import the edit modal

function CourseImgTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(5);
  const [banners, setBanners] = useState([]); // Store added banners
  const [showAddModal, setShowAddModal] = useState(false); // Handle add modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Handle delete modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // Handle edit modal visibility
  const [bannerToDelete, setBannerToDelete] = useState(null); // Store the banner to be deleted
  const [bannerToEdit, setBannerToEdit] = useState(null); // Store the banner to be edited

  const pageCount = Math.ceil(banners.length / usersPerPage); // Dynamic page count

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSave = (text, image, sideImage, description) => {
    // Add the new banner to the banners array
    const newBanner = {
      id: banners.length + 1,
      text: text,
      image: image,
      sideImage: sideImage,
      description: description, // Include description in the banner
    };
    setBanners([...banners, newBanner]); // Update state with new banner
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setShowDeleteModal(true);
  };

  const handleEditClick = (banner) => {
    setBannerToEdit(banner);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    // Remove the selected banner
    setBanners(banners.filter((banner) => banner.id !== bannerToDelete.id));
    setShowDeleteModal(false); // Close the modal
  };

  const handleUpdate = (updatedBanner) => {
    // Update the selected banner, including Course Side Image and Course Image
    setBanners(
      banners.map((banner) =>
        banner.id === updatedBanner.id ? updatedBanner : banner
      )
    );
  };

  const indexOfLastBanner = (currentPage + 1) * usersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - usersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  return (
    <div className="container">
      <button
        className="btn-HomeHeroSectionTable"
        onClick={() => setShowAddModal(true)}
      >
        +Add New
      </button>

      <div className="p-3 mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-BannerImg">
            <thead className="heading_BannerImg">
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Course Side Image</th> {/* New Column */}
                <th scope="col">Course Image</th>
                <th scope="col">Course Name</th>
                <th scope="col">Description</th> {/* New Description Column */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBanners.map((banner, index) => (
                <tr key={banner.id}>
                  <th scope="row" className="id-BannerImg">
                    {indexOfFirstBanner + index + 1}
                  </th>
                  <td>
                    <img
                      src={banner.sideImage}
                      alt="Course Side"
                      style={{ width: "70px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <img
                      src={banner.image}
                      alt="Course Banner"
                      style={{ width: "70px", height: "50px" }}
                    />
                  </td>
                  <td className="text-BannerImg">{banner.text}</td>
                  <td className="text-BannerImg">{banner.description}</td> {/* Display Description */}
                  <td className="action-BannerImg">
                    <LiaEdit
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => handleEditClick(banner)} // Trigger edit modal
                    />
                    <MdDelete
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDeleteClick(banner)} // Trigger delete confirmation modal
                    />
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="6" className="pagination-row">
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
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <AddCourseModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSave={handleSave}
      />

      {/* Edit Modal */}
      {bannerToEdit && (
        <EditCourseModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          bannerToEdit={bannerToEdit}
          handleUpdate={handleUpdate}
        />
      )}

      {/* Delete Modal */}
      {bannerToDelete && (
        <DeleteCourseModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default CourseImgTable;
