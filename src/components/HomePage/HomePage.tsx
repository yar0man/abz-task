import { AddForm } from "../AddForm/AddForm";
import { Description } from "../Description/Description";
import { Header } from "../Header/Header";
import { UsersSection } from "../UsersSection/UsersSection";

export const HomePage = () => {

  return (
    <>
      <Header />
      <Description />

      <div className="main">
        <UsersSection />
        <AddForm />
      </div>
    </>
  );
};