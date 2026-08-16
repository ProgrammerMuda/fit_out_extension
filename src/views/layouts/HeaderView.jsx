import React from 'react';
import { List, MagnifyingGlass, Bell } from '@phosphor-icons/react';

export function HeaderView({ onToggleSidebar, searchQuery, onSearchChange }) {
  return (
    <header className="top-header">
      {/* Left: Hamburger & Logo */}
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-link p-1 text-secondary border-0 d-flex align-items-center"
          onClick={onToggleSidebar}
          title="Toggle Sidebar"
          style={{ textDecoration: 'none' }}
        >
          <List size={22} weight="bold" />
        </button>

        {/* Brand Logo: (Test) PROA */}
        <div className="d-flex align-items-center user-select-none">
          <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.2rem', marginRight: '4px' }}>
            (Test)
          </span>
          <span style={{ color: '#1e293b', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            PRO
          </span>
          <span style={{ color: '#27b29b', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
            A
          </span>
        </div>
      </div>

      {/* Middle: Search bar */}
      <div className="header-search-bar d-none d-md-flex">
        <MagnifyingGlass size={16} className="text-muted" />
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Right: Notifications & User profile */}
      <div className="d-flex align-items-center gap-3">
        {/* Notification Bell */}
        <div className="position-relative cursor-pointer p-1">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: '32px', height: '32px', backgroundColor: '#e6f8f5', color: '#27b29b' }}
          >
            <Bell size={18} weight="fill" />
          </div>
          <span
            className="position-absolute top-0 end-0 bg-danger border border-white rounded-circle"
            style={{ width: '8px', height: '8px' }}
          />
        </div>

        {/* User Profile */}
        <div className="d-flex align-items-center gap-2 cursor-pointer">
          <span className="fw-semibold text-dark small d-none d-sm-inline">
            Tenant Relation
          </span>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
            alt="Avatar"
            className="rounded-circle border"
            style={{ width: '34px', height: '34px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </header>
  );
}
