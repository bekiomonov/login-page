import React from "react"
import PropTypes from 'prop-types'
import {equals, path, prop} from "ramda";
import Select from "react-select";

function Auth(props) {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setFormState,
    control,
    Controller,
    phoneValidation,
    loginError
  } = props
  const error = {
    isNameErr: equals( path(['name', 'type'], errors), 'required') ||
    equals( path(['name', 'type'], errors), 'maxLength') ? ' error-form__field': '',
    isEmailErr: equals( path(['email', 'type'], errors), 'required') ||
      equals( path(['name', 'type'], errors), 'maxLength') ? ' error-form__field': '',
    isPasswordErr: equals( path(['password', 'type'], errors), 'required') ? ' error-form__field': '',
    isPhoneErr: equals( path(['phone', 'type'], errors), 'pattern') ||
      equals( path(['phone', 'type'], errors), 'required') ? ' error-form__field': '',
    isCityErr: equals( path(['city', 'type'], errors), 'required') ? ' error-form__field': '',
    isCountryErr: equals( path(['country', 'type'], errors), 'required') ? ' error-form__field': '',
    isOSErr: equals( path(['OS', 'type'], errors), 'required') ? ' error-form__field': '',
  }
  function handleChange(e, key) {
    e.preventDefault()
    setFormState(formState => ({
      ...formState,
      [key]: e.target.value
    }))
  }

  const customStyles = {
    option: (provided, {isSelected}) => {
      return {
        ...provided,
        [':active']: {
          backgroundColor: 'transparent',
        },
        ':hover': {
          backgroundColor: '#bed8fa'
        },
        backgroundColor: isSelected ? '#caedd5': '',
        borderBottom: '1px dotted pink',
        color: '#11998e',
      }
    },
    control: () => {
      return {
        cursor: 'pointer',
        height: '25px',
        display: 'flex',
      }
    },
    placeholder: () => ({
      display: 'none'
    }),
    singleValue: () => {
      return {  };
    }
  }
  return(
    <div className='auth-form'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className="bg">
          <div className='greeting' style={{ marginTop: phoneValidation ? '0' : '-150px' }}>Привет!</div>
        </div>
        <div className='form__container'>
          <div className='form__title'>
            Войти
          </div>
          {
            phoneValidation ? (
              <>
                {
                  loginError && <h6 style={{ color: 'red' }}>{loginError}</h6>
                }
                <span style={{ fontSize: '10px' }}>На Ваш номер был отправлен код</span>
                <div className='container__item form__group'>
                  <input
                    className={`form__field ${prop('isValidationErr', error)}`}
                    name='validation'
                    ref={register({ required: true, pattern: /[0-9]/, })}
                    onChange={(e) => handleChange(e, 'validation')}
                    type='number'
                    id='validation'
                    placeholder='123'
                  />
                  <label htmlFor="validation" className='form__label'>Код</label>
                </div>
              </>
            ) : (
              <>
                <div className='container__item form__group'>
                  <input
                    className={`form__field ${prop('isNameErr', error)}`}
                    name='name'
                    ref={register({ required: true, maxLength: 30 })}
                    onChange={(e) => handleChange(e, 'name')}
                    type="text"
                    id='name'
                    placeholder='Александр Сергеевич Пушкин'
                  />
                  <label htmlFor="name" className='form__label'>ФИО</label>
                </div>
                <div className='container__item form__group'>
                  <input
                    className={`form__field field ${prop('isEmailErr', error)}`}
                    name='email'
                    type="email"
                    id='email'
                    onChange={(e) => handleChange(e, 'email')}
                    required
                    placeholder='alexPush@gmail.com'
                    ref={register({ required: true })}
                  />
                  <label htmlFor="email" className='form__label'>E-mail</label>
                </div>
                <div className='container__item form__group'>
                  <input
                    className={`form__field ${prop('isPasswordErr', error)}`}
                    name='password'
                    ref={register({ required: true })}
                    onChange={(e) => handleChange(e, 'password')}
                    type="text"
                    id='password'
                    placeholder='123'
                  />
                  <label htmlFor="password" className='form__label'>Пароль</label>
                </div>
                <div className='container__item form__group'>
                  <input
                    className={`form__field field ${prop('isPhoneErr', error)}`}
                    name='phone'
                    type="tel"
                    onChange={(e) => handleChange(e, 'phone')}
                    id='phone'
                    placeholder='123456789'
                    ref={register({ required: true, pattern: /[0-9]/, minLength: 5 })}
                  />
                  <label htmlFor="phone" className='form__label'>Телефон</label>
                </div>
                <div className='container__item form__group'>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue={false}
                    rules={{ required: true }}
                    render={props =>
                      <Select
                        onChange={(v) => {
                          setFormState(formState => ({
                            ...formState,
                            city: v?.value,
                          }))
                          props.onChange(v.value)
                        }}
                        id='city'
                        className={`form__field ${prop('isCityErr', error)}`}
                        styles={customStyles}
                        options={[
                          {
                            value: 'Moscow', label: 'Moscow'
                          },
                          {
                            value: 'Tashkent', label: 'Tashkent',
                          }
                        ]}
                      />
                    }
                  />
                  <label htmlFor="city" className='form__label'>Город</label>
                </div>
                <div className='container__item form__group'>

                  <Controller
                    name="country"
                    control={control}
                    defaultValue={false}
                    rules={{ required: true }}
                    render={props =>
                      <Select
                        onChange={(v) => {
                          props.onChange(v.value)
                          setFormState(formState => ({
                            ...formState,
                            country: v?.value,
                          }))
                        }}
                        id='country'
                        className={`form__field ${prop('isCountryErr', error)}`}
                        styles={customStyles}
                        options={[
                          {
                            value: 'Uzbekistan', label: 'Uzbekistan'
                          },
                          {
                            value: 'Russia', label: 'Russia',
                          }
                        ]}
                      />
                    }
                  />
                  <label htmlFor="country" className='form__label'>Страна</label>
                </div>
                <div className='container__item form__group'>
                  <Controller
                    name="OS"
                    control={control}
                    defaultValue={false}
                    rules={{ required: true }}
                    render={props =>
                      <Select
                        onChange={(v) => {
                          props.onChange(v.value)
                          setFormState(formState => ({
                            ...formState,
                            OS: v?.value,
                          }))
                        }}
                        id='OS'
                        className={`form__field ${prop('isOSErr', error)}`}
                        styles={customStyles}
                        options={[
                          {
                            value: 'IOS', label: 'IOS'
                          },
                          {
                            value: 'Android', label: 'Android',
                          }
                        ]}
                      />
                    }
                  />
                  <label htmlFor="OS" className='form__label'>ОС мобильного телефона</label>
                </div>
              </>
            )
          }
          <div className='form__submit button' onSubmit={handleSubmit(onSubmit)}>
            <button className='btn-hover'>Отправить</button>
          </div>
        </div>
      </form>
    </div>
  )
}
Auth.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
  formState: PropTypes.object,
  setFormState: PropTypes.func,
  onSubmit: PropTypes.func,
  phoneValidation: PropTypes.bool,
  loginError: PropTypes.string,
}
export default Auth