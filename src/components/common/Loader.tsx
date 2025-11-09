import { Loader as KendoLoader } from '@progress/kendo-react-indicators';

const Loader = () => {
  return (
    <div className="loader-container" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%', 
      padding: '2rem' 
    }}>
      <KendoLoader size="large" type="infinite-spinner" />
    </div>
  );
};

export default Loader;