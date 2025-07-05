import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import "./ClaimPoints.css";

const rewardsList = [
  { id: 1, title: "Free Coffee", cost: 150, image: "/images/coffee.jpg" },
  { id: 2, title: "Movie Ticket", cost: 300 , image: "/images/movie.jpg" },
  { id: 3, title: "₹100 Gift Card", cost: 400 ,image: "/images/100gift.png" },
  { id: 4, title: "Mobile Data Pack", cost: 250, image: "/images/mobiledata.jpg"  },
  { id: 5, title: "Pizza Voucher", cost: 400 , image: "/images/Pizza.jpg" },
  { id: 6, title: "Music Subscription", cost: 350,image: "/images/music.jpg"  },
  { id: 7, title: "Online Course Coupon", cost: 600,image: "/images/course.jpg"  },
  { id: 8, title: "Gym Day Pass", cost: 200 ,image: "/images/gym.jpg" },
  { id: 9, title: "Amazon Gift Card", cost: 700,image: "/images/amagf.jpg"  },
  { id: 10, title: "Shopping Voucher of ₹5000", cost: 5000,image: "/images/5000shop.png"  },
  { id: 11, title: "Travel Coupon ₹1000", cost: 2500, image: "/images/travel.jpg"  },
  { id: 12, title: "TATA Curv Voucher ₹50,000", cost: 100000, image: "/images/tatacurv.jpg"  },
  
];

const cardColors = [
  
];

const ClaimPoints = () => {
  const [points, setPoints] = useState(0);
  const [claimed, setClaimed] = useState([]);

  const fetchPoints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/points/total-points");
      const data = await res.json();
      setPoints(data.totalPoints);
    } catch (err) {
      console.error("Error fetching points:", err);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleClaim = async (reward) => {
    if (points < reward.cost || claimed.includes(reward.id)) return;

    setClaimed((prev) => [...prev, reward.id]);

    try {
      await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNo: `CLAIM-${Date.now()}`,
          details: `Claimed: ${reward.title}`,
          quantity: 1,
          date: new Date().toISOString(),
          points: -reward.cost,
          expiry: null,
        }),
      });

      await fetchPoints(); // Refresh after claiming
    } catch (err) {
      console.error("Error claiming reward:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
        🏆Claim Your Rewards
      </h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Available Points:{" "}
        <strong style={{ color: "#6C63FF", fontSize: "1.4rem" }}>{points}</strong>
      </p>

      <div className="rewards-grid">
        {rewardsList.map((reward, index) => {
          const isClaimed = claimed.includes(reward.id);
          return (
                <Tilt
                key={reward.id}
                glareEnable
                glareMaxOpacity={0.25}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.05}
                className={`tilt-card ${isClaimed ? "claimed" : ""}`}
                style={{
                  background: `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url(${reward.image}) center/cover no-repeat`,
                  borderRadius: "18px",
                  padding: "24px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  width: "230px",
                  margin: "12px",
                  transition: "all 0.3s ease-in-out",
                  transform: isClaimed ? "scale(0.98)" : "scale(1)",
                  position: "relative",
                  border: "2px solid #eee",
                }}
              >

              <h4 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{reward.title}</h4>
              <p style={{ fontWeight: "800", marginBottom: "20px" }}>
                {reward.cost} Points
              </p>
              <button
                className="claim-btn"
                disabled={points < reward.cost || isClaimed}
                onClick={() => handleClaim(reward)}
                style={{
                  background: isClaimed ? "#aaa" : "#6C63FF",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  cursor:
                    points >= reward.cost && !isClaimed ? "pointer" : "not-allowed",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  transition: "background 0.3s ease",
                }}
              >
                {isClaimed ? "Claimed!" : "Claim"}
              </button>
              {isClaimed && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    left: 0,
                    right: 0,
                    fontSize: "12px",
                    color: "green",
                  }}
                >
                  🎉 Reward Redeemed!
                </div>
              )}
            </Tilt>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimPoints;
