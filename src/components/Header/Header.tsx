import './Header.scss';
import logo from '../../assets/icons/logo.svg';
import { Button } from '../Button/Button';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <a
          href="/"
          className="header__logo"
        >
          <img
            src={logo}
            alt="Test task logo"
          />
        </a>

        <div className="header__buttons">
          <Button text={'Users'} href="#users" />
          <Button text={'Sing up'} href="#sing_up_form" />
        </div>
      </div>
    </header>
  );
}