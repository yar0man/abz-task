import { useEffect, useState } from "react";
import "./UsersSection.scss";
import { User } from "../../types/types";
import { getUsers } from "../../api/users";
import { UserCard } from "../UserCard/UserCard";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";

export const UsersSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    getUsers(page)
      .then((data) => {
        const isLast = data.total_pages === page;
        setIsLastPage(isLast);
        const sorted = [...data.users].sort(
          (a, b) => b.registration_timestamp - a.registration_timestamp
        );
        setUsers(sorted)
      })
      .catch(() => {
        throw new Error();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);
    setPage((prev) => prev + 1);
  };

  return (
    <section className="users" id="users">
      <h1 className="users__title">
        Working with GET request
      </h1>

      <div className="users__list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {isLoading && (
        <Loader />
      )}

      {!isLastPage && (
        <div className="users__bth" onClick={handleButtonClick}>
          <Button
            text={'Show more'}
            width={'120px'}
          />
        </div>
      )}

    </section>
  );
};