import React from 'react';
import { Navbar, Container, Button, Badge } from 'react-bootstrap';
import {
  Buildings,
  PlusCircle,
  MagnifyingGlass,
  Bell,
  SlidersHorizontal,
} from '@phosphor-icons/react';

export function NavbarView({ onOpenNewProjectModal, searchQuery, onSearchChange }) {
  return (
    <Navbar expand="lg" className="bg-white border-bottom sticky-top py-2 shadow-sm">
      <Container fluid className="px-3 px-md-4">
        {/* Brand Logo & Name */}
        <Navbar.Brand href="#home" className="navbar-brand-custom text-dark d-flex align-items-center">
          <div
            className="icon-box"
            style={{
              backgroundColor: '#e6f8f5',
              color: '#27b29b',
              width: '40px',
              height: '40px',
            }}
          >
            <Buildings size={24} weight="duotone" />
          </div>
          <div>
            <span style={{ color: '#27b29b', fontWeight: 800 }}>FITOUT</span>
            <span className="text-secondary fw-semibold fs-6 ms-1">PRO</span>
          </div>
        </Navbar.Brand>

        {/* Search Bar */}
        <div className="d-none d-md-flex align-items-center mx-auto" style={{ maxWidth: '420px', width: '100%' }}>
          <div className="search-input-group w-100">
            <MagnifyingGlass size={18} className="text-muted" />
            <input
              type="text"
              placeholder="Cari proyek, klien, lokasi..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Actions & Profile */}
        <div className="d-flex align-items-center gap-2">
          {/* Notification Button */}
          <Button
            variant="light"
            className="rounded-circle p-2 position-relative border-0"
            style={{ width: '40px', height: '40px' }}
            title="Notifikasi"
          >
            <Bell size={20} className="text-secondary" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </Button>

          {/* New Project Action Button */}
          <Button
            variant="primary"
            className="d-flex align-items-center gap-2 px-3 fw-semibold shadow-sm"
            onClick={onOpenNewProjectModal}
          >
            <PlusCircle size={20} weight="bold" />
            <span className="d-none d-sm-inline">Proyek Baru</span>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
