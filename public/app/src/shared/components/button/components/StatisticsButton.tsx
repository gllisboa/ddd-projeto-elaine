import React from 'react';
import "../styles/Button.sass"

interface StatisticsButtonProps {
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  disabled: boolean;
}

const StatisticsButton: React.FC<StatisticsButtonProps> = (props) => {
  const handleLogoutClick = () => {
    props.onLogout();
  };

  const handleJoinClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/join';
    }
  };

  return props.isLoggedIn ? (
    <div>
      <span>
        <a href={`./member/${props.username}`} style={{ color: 'white' }}>
          {`${props.username} / `}
        </a>
        <u onClick={handleLogoutClick}>logout</u>
      </span>
    </div>
  ) : (
    <div>
      <button onClick={handleJoinClick}>Join</button>
    </div>
  );
};

export default StatisticsButton;
