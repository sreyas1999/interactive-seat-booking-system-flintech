import { SEAT_PRICES } from '../../utils/constants';

const PriceLegend = () => {
  return (
    <div className="price-legend">
      <div className="legend-item">
        <div className="seat-sample silver"></div>
        <span>Silver - ₹{SEAT_PRICES.SILVER}</span>
      </div>
      <div className="legend-item">
        <div className="seat-sample gold"></div>
        <span>Gold - ₹{SEAT_PRICES.GOLD}</span>
      </div>
      <div className="legend-item">
        <div className="seat-sample platinum"></div>
        <span>Platinum - ₹{SEAT_PRICES.PLATINUM}</span>
      </div>
      {/* Styles moved to CSS file: src/styles/PriceLegend.css */}
    </div>
  );
};

export default PriceLegend;