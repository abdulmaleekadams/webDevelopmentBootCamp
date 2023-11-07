import { useState } from 'react';
import Input from '../../components/form/Input';

export default function Form() {
  const [fullname, setFullname] = useState({
    firstname: '',
    lastname: '',
  });

  function inputChange(e) {
    const { name, value } = e.target;

    setFullname((prevValue) => {
      if (name === 'firstname') {
        return {
          firstname: value,
          lastname: prevValue.lastname,
        };
      } else if (name === 'lastname') {
        return {
          firstname: prevValue.firstname,
          lastname: value,
        };
      }
    });
  }

  return (
    <>
      <h1>
        Hello {fullname.firstname} {fullname.lastname}
      </h1>
      <form>
        <Input
          type={'text'}
          placeholder={'Enter your name'}
          handleChange={inputChange}
          inputValue={fullname.firstname}
          name={'firstname'}
        />

        <Input
          type={'text'}
          placeholder={'Enter your name'}
          handleChange={inputChange}
          inputValue={fullname.lastname}
          name={'lastname'}
        />
        <button>Submit</button>
      </form>
    </>
  );
}
