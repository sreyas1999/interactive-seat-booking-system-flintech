import React from "react";
import "../../styles/SeatLegend.css";

interface SeatLegendProps {
  showLimitMsg: boolean;
}

const SEAT_TYPES = [
  {
    name: "Silver",
    price: 100,
    image: "/assets/logos/seat_silver.svg",
    color: "#888",
  },
  {
    name: "Gold",
    price: 150,
    image: "/assets/logos/seat_gold.svg",
    color: "#b8860b",
  },
  {
    name: "Platinum",
    price: 200,
    image: "/assets/logos/seat_platinum.svg",
    color: "#555",
  },
] as const;

const SeatLegendComponent: React.FC<SeatLegendProps> = ({ showLimitMsg }) => {
  return (
    <div className="seat-legend">
      <h3 className="seat-legend-title">Seat Pricing</h3>

      <div className="seat-legend-list">
        {SEAT_TYPES.map((seatType) => (
          <div key={seatType.name} className="seat-legend-item">
            <img
              src={seatType.image}
              alt={`${seatType.name} Seat`}
              className="seat-legend-icon"
            />
            <span
              className="seat-legend-name"
              style={{ color: seatType.color }}
            >
              {seatType.name}
            </span>
            <span className="seat-legend-price">₹{seatType.price}</span>
          </div>
        ))}
      </div>

      {showLimitMsg && (
        <div className="seat-legend-limit-message">
          You can only book a maximum of 8 seats at a time.
        </div>
      )}
    </div>
  );
};

SeatLegendComponent.displayName = 'SeatLegend';

export const SeatLegend = React.memo(SeatLegendComponent);
