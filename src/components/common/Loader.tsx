import React from 'react';
import { Loader as KendoLoader } from '@progress/kendo-react-indicators';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: '2rem'
};

const Loader = () => {
  return (
    <div className="loader-container" style={containerStyle}>
      <KendoLoader size="large" type="infinite-spinner" />
    </div>
  );
};

Loader.displayName = 'Loader';

export default React.memo(Loader);