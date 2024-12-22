import { Validator } from './components/FormBuilder/types';

const formSchema = [
  {
    name: 'username',
    type: 'text',
    value: 'ido',
    label: 'Username',
    validators: [
      {
        errorMessage: 'Username is required',
        validate: (value: string) => value.length > 2,
      },
    ] as Validator[],
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    validators: [
      {
        errorMessage: 'Password is required',
        validate: (value: any) => value.length > 0,
      },
      {
        errorMessage: 'Password must be at least 6 characters',
        validate: (value: any) => value.length >= 6,
      },
    ] as Validator[],
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    validators: [
      {
        errorMessage: 'Email is required',
        validate: (value: any) => value.length > 0,
      },
      {
        errorMessage: 'Email must be a valid email address',
        validate: (value: any) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      },
    ] as Validator[],
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    validators: [
      {
        errorMessage: 'Age is required',
        validate: (value: any) => value.length > 0,
      },
      {
        errorMessage: 'Age must be a number',
        validate: (value: any) => !isNaN(Number(value)),
      },
      {
        errorMessage: 'Age must be greater than or equal to 18',
        validate: (value: any) => Number(value) >= 18,
      },
    ] as Validator[],
  },
  {
    name: 'subscribe',
    type: 'radio',
    label: 'Subscribe to Tipalti',
    value: 'yes', 
    validators: [
      {
        errorMessage: 'You must subscribe to proceed',
        validate: (value: string) => value === 'yes',
      },
    ] as Validator[],
  },
];

export default formSchema;
