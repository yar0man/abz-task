import React from "react";
import './UserCard.scss'
import { User } from "../../types/types";

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.photo} alt="user-card" className="user-card__photo"/>

      <h3
        className="user-card__name"
        data-tooltip-id="my-tooltip"
      >
        {user.name}
      </h3>

      <div className="user-card__details">
        <p className="user-card__details-position">
          {user.position}
        </p>

        <a href={`mailto:${user.email}`} className="user-card__details-email">
          {user.email}
        </a>

        <a href={`tel:+${user.phone}`} className="user-card__details-phone">
          {user.phone}
        </a>
      </div>
    </div>
  );
};