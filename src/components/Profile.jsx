import React, { useEffect, useState } from "react";
import "./Profile.css"; // Optional if you want to add more

const Profile = () => {
  const [user, setUser] = useState({
    name: "Vaishnav More",
    email: "vaishnav@example.com",
    joinedDate: "January 2024",
    referralCode: "VAISH200",
    loyaltyPoints: 0,
    
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/points/total-points")
      .then((res) => res.json())
      .then((data) =>
        setUser((prev) => ({ ...prev, loyaltyPoints: data.totalPoints }))
      )
      .catch((err) => console.error("Error loading profile points", err));
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Optional: Send data to backend here if needed
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileBox}>
        <h2 style={styles.heading}>
          Welcome,{" "}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            user.name
          )}
        </h2>

        <div style={styles.infoRow}>
          <span style={styles.label}>Email:</span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Joined On:</span>
          <span>{user.joinedDate}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Referral Code:</span>
          <span>{user.referralCode}</span>
        </div>

        <div style={{ ...styles.infoRow, ...styles.pointsRow }}>
          <span style={styles.label}>Loyalty Points:</span>
          <span style={styles.points}>{user.loyaltyPoints}</span>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          {!isEditing ? (
            <button style={styles.editBtn} onClick={handleEditClick}>
              Edit Profile
            </button>
          ) : (
            <button style={styles.saveBtn} onClick={handleSaveClick}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "4rem 2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    background: "linear-gradient(to right, #f3f4f7, #e9efff)",
  },
  profileBox: {
    background: "#fff",
    padding: "3rem",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
    maxWidth: "600px",
    width: "100%",
    transition: "all 0.4s ease",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#1e1e2f",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.2rem",
    fontSize: "1.1rem",
  },
  label: {
    fontWeight: "600",
    color: "#444",
    marginRight: "10px",
    minWidth: "120px",
  },
  pointsRow: {
    fontWeight: "bold",
    color: "#0f62fe",
  },
  points: {
    fontSize: "1.3rem",
    background: "#e0f3ff",
    padding: "4px 12px",
    borderRadius: "10px",
  },
  editBtn: {
    backgroundColor: "#0f62fe",
    color: "#fff",
    padding: "0.7rem 1.6rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  saveBtn: {
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "0.7rem 1.6rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  input: {
    padding: "6px 10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "60%",
  },
};

export default Profile;
