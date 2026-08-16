import React, { useState } from 'react';
import {
  Gear,
  Gauge,
  Megaphone,
  Table,
  Buildings,
  Stack,
  Door,
  House,
  CheckSquare,
  Users,
  FileText,
  Tray,
  ChatsCircle,
  ClipboardText,
  ShieldCheck,
  Briefcase,
  Package,
  CalendarCheck,
  Receipt,
  Sliders,
  ChartBar,
  Star,
  Wrench,
  CaretDown,
  CaretRight,
} from '@phosphor-icons/react';

export function SidebarView({ isOpen, activeMenu, onSelectMenu }) {
  const [openSubmenus, setOpenSubmenus] = useState({
    system: false,
    trParameter: false,
  });

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen) return null;

  return (
    <aside className="sidebar-container d-flex flex-column py-2">
      {/* SECTION: Main */}
      <div className="sidebar-section-title">Main</div>
      
      <div
        className="sidebar-menu-item"
        onClick={() => toggleSubmenu('system')}
      >
        <div className="d-flex align-items-center gap-2">
          <Gear size={16} />
          <span>System</span>
        </div>
        {openSubmenus.system ? <CaretDown size={12} /> : <CaretRight size={12} />}
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Dashboard')}
      >
        <div className="d-flex align-items-center gap-2">
          <Gauge size={16} />
          <span>Dashboard</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Announcement' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Announcement')}
      >
        <div className="d-flex align-items-center gap-2">
          <Megaphone size={16} />
          <span>Announcement</span>
        </div>
      </div>

      {/* SECTION: Master Table */}
      <div className="sidebar-section-title">Master Table</div>
      
      <div
        className="sidebar-menu-item"
        onClick={() => toggleSubmenu('trParameter')}
      >
        <div className="d-flex align-items-center gap-2">
          <Table size={16} />
          <span>TR Parameter</span>
        </div>
        {openSubmenus.trParameter ? <CaretDown size={12} /> : <CaretRight size={12} />}
      </div>

      {/* SECTION: Building Profile */}
      <div className="sidebar-section-title">Building Profile</div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Tower' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Tower')}
      >
        <div className="d-flex align-items-center gap-2">
          <Buildings size={16} />
          <span>Tower</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'ID Floor' ? 'active' : ''}`}
        onClick={() => onSelectMenu('ID Floor')}
      >
        <div className="d-flex align-items-center gap-2">
          <Stack size={16} />
          <span>ID Floor</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Rooms' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Rooms')}
      >
        <div className="d-flex align-items-center gap-2">
          <Door size={16} />
          <span>Rooms</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Unit' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Unit')}
      >
        <div className="d-flex align-items-center gap-2">
          <House size={16} />
          <span>Unit</span>
        </div>
      </div>

      {/* SECTION: Tenant Relation */}
      <div className="sidebar-section-title">Tenant Relation</div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Quick Voting' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Quick Voting')}
      >
        <div className="d-flex align-items-center gap-2">
          <CheckSquare size={16} />
          <span>Quick Voting</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Visitor Management' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Visitor Management')}
      >
        <div className="d-flex align-items-center gap-2">
          <Users size={16} />
          <span>Visitor Management</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Fitout Permit' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Fitout Permit')}
      >
        <div className="d-flex align-items-center gap-2">
          <FileText size={16} />
          <span>Fitout Permit</span>
        </div>
        <span className="sidebar-badge-count">17</span>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Open Request' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Open Request')}
      >
        <div className="d-flex align-items-center gap-2">
          <Tray size={16} />
          <span>Open Request</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Chat' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Chat')}
      >
        <div className="d-flex align-items-center gap-2">
          <ChatsCircle size={16} />
          <span>Chat</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Work Request' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Work Request')}
      >
        <div className="d-flex align-items-center gap-2">
          <ClipboardText size={16} />
          <span>Work Request</span>
        </div>
        <span className="sidebar-badge-count">44</span>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Request Permit' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Request Permit')}
      >
        <div className="d-flex align-items-center gap-2">
          <ShieldCheck size={16} />
          <span>Request Permit</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Work Permit' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Work Permit')}
      >
        <div className="d-flex align-items-center gap-2">
          <Briefcase size={16} />
          <span>Work Permit</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'In&Out Goods' ? 'active' : ''}`}
        onClick={() => onSelectMenu('In&Out Goods')}
      >
        <div className="d-flex align-items-center gap-2">
          <Package size={16} />
          <span>In&Out Goods</span>
        </div>
        <span className="sidebar-badge-count">8</span>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Request Reservation' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Request Reservation')}
      >
        <div className="d-flex align-items-center gap-2">
          <CalendarCheck size={16} />
          <span>Request Reservation</span>
        </div>
      </div>

      {/* SECTION: Finance */}
      <div className="sidebar-section-title">Finance</div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Invoice' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Invoice')}
      >
        <div className="d-flex align-items-center gap-2">
          <Receipt size={16} />
          <span>Invoice</span>
        </div>
      </div>

      {/* SECTION: Inspection */}
      <div className="sidebar-section-title">Inspection</div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Fitout Parameter' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Fitout Parameter')}
      >
        <div className="d-flex align-items-center gap-2">
          <Sliders size={16} />
          <span>Fitout Parameter</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Inspection Reports' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Inspection Reports')}
      >
        <div className="d-flex align-items-center gap-2">
          <ChartBar size={16} />
          <span>Inspection Reports</span>
        </div>
      </div>

      {/* SECTION: Handyman */}
      <div className="sidebar-section-title">Handyman</div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Home Service Reviews' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Home Service Reviews')}
      >
        <div className="d-flex align-items-center gap-2">
          <Star size={16} />
          <span>Home Service Reviews</span>
        </div>
      </div>

      <div
        className={`sidebar-menu-item ${activeMenu === 'Home Service' ? 'active' : ''}`}
        onClick={() => onSelectMenu('Home Service')}
      >
        <div className="d-flex align-items-center gap-2">
          <Wrench size={16} />
          <span>Home Service</span>
        </div>
      </div>
    </aside>
  );
}
