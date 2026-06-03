import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("/auth/profile");

      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>

        <div className="profile-item">
          <span>Name</span>
          <h3>{profile.name}</h3>
        </div>

        <div className="profile-item">
          <span>Email</span>
          <h3>{profile.email}</h3>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <h2>{profile.total_resumes}</h2>
            <p>Resumes</p>
          </div>

          <div className="stat-box">
            <h2>{profile.avg_score || 0}</h2>
            <p>Average Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
