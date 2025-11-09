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
      <style jsx>{`
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .seat-sample {
          width: 20px;
          height: 20px;
          border-radius: 4px;
        }
        .silver {
          background-color: #C0C0C0;
        }
        .gold {
          background-color: #FFD700;
        }
        .platinum {
          background-color: #E5E4E2;
        }
      `}</style>
    </div>
  );
};

export default PriceLegend;