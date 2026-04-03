import React, { useEffect, useState } from 'react';
import axios from '../services/api';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/report/all')
      .then(res => setReports(res.data))
      .catch(err => {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading reports…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (reports.length === 0) return <p>No road damage reports yet.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <h1>SafeStreet Admin Dashboard</h1>
      <p>Total Reports: <strong>{reports.length}</strong></p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reports.map((r, i) => {
          const reportedAt = r.createdAt || r.reportedAt;
          const imageUrl = `http://localhost:5000/${r.imagePath.replace(/\\/g, '/')}`;
          const mapSrc = `https://maps.google.com/maps?q=${r.latitude},${r.longitude}&z=15&output=embed`;

          return (
            <li key={i}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  gap: '1rem',
                  flexDirection: 'column'
                }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <img
                  src={imageUrl}
                  alt="Damage"
                  style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div>
                  <p><strong>Type:</strong> {r.type}</p>
                  <p><strong>Severity:</strong> {r.severity}</p>
                  <p><strong>Priority:</strong> {r.repair_priority}</p>
                  <p>
                    <strong>Reported At:</strong>{' '}
                    {reportedAt ? new Date(reportedAt).toLocaleString() : '—'}
                  </p>
                  <p>
                    <strong>Location:</strong>{' '}
                    <a href={`https://www.google.com/maps?q=${r.latitude},${r.longitude}`} target="_blank" rel="noreferrer">
                      Open in Google Maps
                    </a>
                  </p>
                </div>
              </div>

              {/* Embedded map with red marker */}
              <iframe
                title={`map-${i}`}
                width="100%"
                height="250"
                frameBorder="0"
                style={{ borderRadius: '8px' }}
                src={mapSrc}
                allowFullScreen
              ></iframe>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

