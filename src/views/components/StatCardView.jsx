import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
  Briefcase,
  CurrencyCircleDollar,
  ChartLineUp,
  CheckCircle,
} from '@phosphor-icons/react';

export function StatCardView({ statistics }) {
  const statItems = [
    {
      title: 'Total Proyek Aktif',
      value: statistics.active,
      subtext: `dari total ${statistics.total} proyek`,
      icon: <Briefcase size={26} weight="duotone" />,
      bgColor: '#e6f8f5',
      iconColor: '#27b29b',
    },
    {
      title: 'Total Anggaran (Budget)',
      value: statistics.formattedTotalBudget,
      subtext: `Terealisasi: ${statistics.formattedTotalSpent}`,
      icon: <CurrencyCircleDollar size={26} weight="duotone" />,
      bgColor: '#e0f2fe',
      iconColor: '#0284c7',
    },
    {
      title: 'Rata-Rata Progres',
      value: `${statistics.avgProgress}%`,
      subtext: 'Seluruh tahap fitout',
      icon: <ChartLineUp size={26} weight="duotone" />,
      bgColor: '#fef3c7',
      iconColor: '#d97706',
    },
    {
      title: 'Proyek Selesai (Handover)',
      value: statistics.completed,
      subtext: 'Selesai 100%',
      icon: <CheckCircle size={26} weight="duotone" />,
      bgColor: '#f3e8ff',
      iconColor: '#9333ea',
    },
  ];

  return (
    <Row className="g-3 mb-4">
      {statItems.map((stat, idx) => (
        <Col xs={12} sm={6} lg={3} key={idx}>
          <Card className="custom-card border-0 h-100 p-2">
            <Card.Body className="d-flex align-items-center gap-3">
              <div
                className="icon-box flex-shrink-0"
                style={{
                  backgroundColor: stat.bgColor,
                  color: stat.iconColor,
                  width: '52px',
                  height: '52px',
                }}
              >
                {stat.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-muted small fw-semibold mb-1 text-truncate">
                  {stat.title}
                </p>
                <h4 className="fw-bold mb-0 text-truncate text-dark">
                  {stat.value}
                </h4>
                <small className="text-muted" style={{ fontSize: '0.76rem' }}>
                  {stat.subtext}
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
