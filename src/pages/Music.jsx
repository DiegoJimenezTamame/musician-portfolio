import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import AudioPlayer from '../components/AudioPlayer';
import '../styles/Music.css';

// Import album and single cover images
import album1Cover from '../assets/images/album1-cover.jpg';
import album2Cover from '../assets/images/album2-cover.jpg';
import album3Cover from '../assets/images/album3-cover.jpg';
import single1Cover from '../assets/images/single1-cover.jpg';
import single2Cover from '../assets/images/single2-cover.jpg';
import single3Cover from '../assets/images/single3-cover.jpg';
import single4Cover from '../assets/images/single4-cover.jpg';

// Import audio files (replace these with actual file paths)
import track1Audio from '../assets/audio/dawn.mp3';
import track2Audio from '../assets/audio/morning-dew.mp3';
import track3Audio from '../assets/audio/afternoon-sun.mp3';
import track4Audio from '../assets/audio/sunset-dreams.mp3';
import track5Audio from '../assets/audio/surface-ripples.mp3';
import track6Audio from '../assets/audio/descent.mp3';
import track7Audio from '../assets/audio/abyssal-plain.mp3';
import track8Audio from '../assets/audio/bioluminescence.mp3';
import track9Audio from '../assets/audio/morning-commute.mp3';
import track10Audio from '../assets/audio/coffee-shop-ambience.mp3';
import track11Audio from '../assets/audio/skyscraper-views.mp3';
import track12Audio from '../assets/audio/night-lights.mp3';
import single1Audio from '../assets/audio/single1.mp3';
import single2Audio from '../assets/audio/single2.mp3';
import single3Audio from '../assets/audio/single3.mp3';
import single4Audio from '../assets/audio/single4.mp3';

function Music() {
  // This would come from your backend API in a real application
  const musicData = {
    albums: [
      {
        id: 1,
        title: "First Light",
        year: 2014,
        cover: album1Cover, // Imported image
        description: "My debut album exploring themes of beginnings and discovery.",
        tracks: [
          { id: 1, title: "Dawn", duration: "3:45", audioSrc: track1Audio },
          { id: 2, title: "Morning Dew", duration: "4:20", audioSrc: track2Audio },
          { id: 3, title: "Afternoon Sun", duration: "5:15", audioSrc: track3Audio },
          { id: 4, title: "Sunset Dreams", duration: "4:05", audioSrc: track4Audio }
        ]
      },
      {
        id: 2,
        title: "Ocean Depths",
        year: 2018,
        cover: album2Cover, // Imported image
        description: "A journey through the mysteries and wonders beneath the waves.",
        tracks: [
          { id: 1, title: "Surface Ripples", duration: "3:30", audioSrc: track5Audio },
          { id: 2, title: "Descent", duration: "5:10", audioSrc: track6Audio },
          { id: 3, title: "Abyssal Plain", duration: "6:25", audioSrc: track7Audio },
          { id: 4, title: "Bioluminescence", duration: "4:45", audioSrc: track8Audio }
        ]
      },
      {
        id: 3,
        title: "Urban Echoes",
        year: 2022,
        cover: album3Cover, // Imported image
        description: "Sounds inspired by city life and modern landscapes.",
        tracks: [
          { id: 1, title: "Morning Commute", duration: "3:55", audioSrc: track9Audio },
          { id: 2, title: "Coffee Shop Ambience", duration: "4:30", audioSrc: track10Audio },
          { id: 3, title: "Skyscraper Views", duration: "5:20", audioSrc: track11Audio },
          { id: 4, title: "Night Lights", duration: "4:15", audioSrc: track12Audio }
        ]
      }
    ],
    singles: [
      { id: 1, title: "Summer Breeze", year: 2015, cover: single1Cover, audioSrc: single1Audio },
      { id: 2, title: "Winter's Embrace", year: 2017, cover: single2Cover, audioSrc: single2Audio },
      { id: 3, title: "Autumn Leaves", year: 2019, cover: single3Cover, audioSrc: single3Audio },
      { id: 4, title: "Spring Awakening", year: 2021, cover: single4Cover, audioSrc: single4Audio }
    ]
  };

  const [selectedAlbum, setSelectedAlbum] = useState(musicData.albums[0]);

  return (
    <div className="music-page">
      <Container>
        <h1 className="text-center mb-5">My Music</h1>

        <Tab.Container defaultActiveKey="albums">
          <Nav variant="pills" className="justify-content-center mb-4">
            <Nav.Item>
              <Nav.Link eventKey="albums">Albums</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="singles">Singles</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="albums">
              <Row>
                <Col md={4} className="mb-4">
                  <div className="albums-list">
                    {musicData.albums.map(album => (
                      <Card
                        key={album.id}
                        className={`album-card mb-3 ${selectedAlbum.id === album.id ? 'selected' : ''}`}
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <Card.Body className="d-flex align-items-center">
                          <div className="album-thumbnail-container me-3">
                            <div className="album-thumbnail">
                              {/* Display the album cover image */}
                              <img src={album.cover} alt={album.title} className="album-cover" />
                            </div>
                          </div>
                          <div>
                            <Card.Title className="mb-0">{album.title}</Card.Title>
                            <Card.Subtitle className="text-muted">{album.year}</Card.Subtitle>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Col>
                <Col md={8}>
                  <div className="album-details">
                    <div className="album-header mb-4">
                      <div className="album-cover">
                        {/* Display the selected album cover image */}
                        <img src={selectedAlbum.cover} alt={selectedAlbum.title} className="album-cover" />
                      </div>
                      <div className="album-info">
                        <h2>{selectedAlbum.title}</h2>
                        <p className="text-muted">{selectedAlbum.year}</p>
                        <p>{selectedAlbum.description}</p>
                      </div>
                    </div>
                    <div className="tracks-list">
                      {selectedAlbum.tracks.map(track => (
                        <AudioPlayer
                          key={track.id}
                          title={track.title}
                          audioSrc={track.audioSrc}
                        />
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="singles">
              <Row>
                {musicData.singles.map(single => (
                  <Col md={6} lg={3} key={single.id} className="mb-4">
                    <Card className="single-card h-100">
                      <div className="single-cover-placeholder">
                        <img src={single.cover} alt={single.title} className="single-cover" />
                      </div>
                      <Card.Body>
                        <Card.Title>{single.title}</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">{single.year}</Card.Subtitle>
                        <AudioPlayer
                          title={single.title}
                          audioSrc={single.audioSrc}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default Music;
