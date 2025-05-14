
import React from 'react';
import BathymetryViewer from "./bathymetry/BathymetryViewer";

// Adding SEO-friendly context for batimetry component
const BathymetryViewerWithSEO: React.FC = () => {
  return (
    <>
      <h1 className="sr-only">Bridvaišio ežero batimetrijos žemėlapis</h1>
      <div aria-hidden="true" className="hidden">
        <p>Bridvaišio ežero gylio žemėlapis nardytojams ir žvejams. Žemėlapyje pateikiama detali ežero dugno topografija, gylio linijos, ir nardymo maršrutai.</p>
        <p>Šis batimetrinis žemėlapis rodo Bridvaišio ežero gylio kontūrus, kur giliausios vietos siekia 42 metrus.</p>
      </div>
      <BathymetryViewer />
    </>
  );
};

export default BathymetryViewerWithSEO;
