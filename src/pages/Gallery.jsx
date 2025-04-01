import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "../styles/Gallery.css";

// Import images
import image1 from "../assets/images/gallery1.jpg";
import image2 from "../assets/images/gallery2.jpg";
import image3 from "../assets/images/gallery3.jpg";
import image4 from "../assets/images/gallery4.jpg";
import image5 from "../assets/images/gallery5.jpg";
import image6 from "../assets/images/gallery6.jpg";

const images = [image1, image2, image3, image4, image5, image6];

function Gallery() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleShow = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <div className="gallery-page">
      <Container>
        <h1 className="text-center mb-5">Gallery</h1>
        <Row>
          {images.map((img, index) => (
            <Col key={index} md={4} sm={6} xs={12} className="mb-4">
              <div className="gallery-image-container" onClick={() => handleShow(img)}>
                <img src={img} alt={`Gallery ${index + 1}`} className="gallery-image" />
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Image Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          {selectedImage && <img src={selectedImage} alt="Enlarged" className="modal-image" />}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Gallery;
