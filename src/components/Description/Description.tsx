import { Button } from "../Button/Button";
import "./Description.scss";

export const Description = () => {
  return (
    <section className="description">
      <div className="description__container">
        <h1 className="description__title">
          Test assignment for front-end developer
        </h1>

        <p className="description__text">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>

        <Button text={'Sing up'} href="#sing_up_form" />
      </div>
    </section>
  );
}