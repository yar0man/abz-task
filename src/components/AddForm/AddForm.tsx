import { ChangeEvent, useEffect, useState } from "react";
import TextField from "../TextField/TextField";
import './AddForm.scss'
import { Position } from "../../types/types";
import { getPositions } from "../../api/positions";

import { Button } from "../Button/Button";
import { EMAIL_VALIDATOR, PHONE_VALIDATOR } from "../../utils/constants";
import { getToken } from "../../api/users";
import { postUser } from "../../api/fetchCli";

export const AddForm = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [positionId, setPositionId] = useState<number>(1);
  const [photo, setPhoto] = useState<File>();
  const [token, setToken] = useState('')

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const clearErrors = () => {
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  const clearData = () => {
    setPhoto(undefined);
    setToken('');
    setName('')
    setEmail('')
    setPhone('')
    setPositionId(1);
  };

  useEffect(() => {
    getPositions()
      .then((responce) => {
        setPositions(responce.positions);
      })
      .catch((error) => {
        throw new Error(error);
      });

    getToken()
    .then(response => setToken(response.token))
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (name.length < 2 || name.length > 60) {
      setNameError('Enter valid name');
      return;
    }

    if (!EMAIL_VALIDATOR.test(email)) {
      setEmailError('Enter valid email');
      return;
    }

    if (!PHONE_VALIDATOR.test(phone)) {
      setPhoneError('Enter valid phone');
      return;
    }

    const formData:any = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', String(positionId));
    formData.append('photo', photo, `${photo?.name}`);

    postUser(formData, token);

    clearData();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <section className="form" id="sing_up_form">
      <h1 className="form__title">Working with POST request</h1>

      <form
        className="form__container"
        onSubmit={(event) => handleSubmit(event)}
      >

        <div className="form__inputs">
          <div className="form__input">
            <TextField
              type="text"
              name="name"
              label="Your name"
              value={name}
              changeHandler={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
              isRed={!!nameError}
            />
            {nameError && <span className="form__error-text">{nameError}</span>}
          </div>

          <div className="form__input">
            <TextField
              type="text"
              name="email"
              label="Email"
              value={email}
              changeHandler={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
              isRed={!!emailError}
            />
            {emailError && <span className="form__error-text">{emailError}</span>}
          </div>

          <div>
            <div className="form__phone-input">
              <TextField
                type="text"
                name="phone"
                label="Phone"
                value={phone}
                changeHandler={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPhone(event.target.value);
                }}
                isRed={!!phoneError}
              />
              {phoneError && <span className="form__error-text">{phoneError}</span>}

            </div>
            <span className="form__phone-input__text">+380 (XXX) XXX-XX-XX</span>
          </div>
        </div>

        <div className="form__checkbox">
          <h4 className="form__checkbox__title">
            Select your position
          </h4>

          {positions.map((position) => (
            <div className="form__checkbox__options" key={position.id}>
              <input
                type="radio"
                className="form__checkbox__option"
                name="position_id"
                value={position.id}
                checked={position.id === positionId}
                onChange={() => {
                  setPositionId(position.id);
                }}
              />
              <span>{position.name}</span>
            </div>
          ))}
        </div>

        <label
          htmlFor="inputTag"
          className="form__upload-label"
        >
          <span className="form__upload-label__text">
            Upload
          </span>

          <span className="form__upload-label__photo">
            {
              photo?.name ? (
                photo.name
              ) : (
                <>
                  Upload your photo
                </>
              )
            }
          </span>

          <input
            type="file"
            id="inputTag"
            className="form__upload-input"
            onChange={handleFileChange}
          />
        </label>

        <div className="form__submit">
          <Button
            width={"100px"}
            text={"Sign up"}
            type={"submit"}
            onSubmit={handleSubmit}
            disabled={!phone || !name || !email || !photo || positionId === 0}
          />
        </div>
      </form>
    </section>
  );
};