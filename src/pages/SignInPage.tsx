import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { userSlice } from '../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useSignInMutation } from '../redux/services/userApi';
import { useForm, SubmitHandler } from 'react-hook-form';

import styles from './SignInPage.module.css';

interface Inputs {
  username: string;
  password: string;
}

interface Error {
  data: { message: string };
  status: number;
}

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.userSlice);
  const [signIn, { isLoading, isSuccess, error, isError }] =
    useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const handleOnSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    const data = await signIn({
      username,
      password
    }).unwrap();
    dispatch(userSlice.actions.login(data));
  };

  useEffect(() => {
    const path = searchParams.get('redirect');
    if (isSuccess) {
      navigate(path ?? '/');
    }
    if (!isSuccess && user) {
      navigate('/profile');
    }
  }, [isSuccess, user, searchParams]);

  useEffect(() => {
    reset();
  }, [isError, isSuccess]);

  return (
    <div className={styles.container}>
      <Link to="/">
        <img
          // src="./src/assets/amazon-logo.png"
          alt="Asset Placeholder"
          className={styles.logo}
        />
      </Link>
      {error && (
        <Alert
          type="error"
          title="There was a problem"
          text={(error as Error).data.message}
          className={styles.alert}
        />
      )}
      <div className={styles.content}>
        <h1 className={styles.title}>Sign In</h1>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <label htmlFor="username" className={styles.label}>
            Username
            <input
              type="text"
              {...register('username', {
                required: 'Username is required',
                // pattern: {
                //   value:
                //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                //   message: 'Please enter a valid email.'
                // }
              })}
              className={styles.input}
              required
            />
          </label>
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
          <label htmlFor="password" className={styles.label}>
            Password
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password atleast 6 characters'
                },
                maxLength: 30
              })}
              className={styles.input}
              required
            />
          </label>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
          <button disabled={isLoading} type="submit" className={styles.button}>
            {isLoading || isSuccess ? 'Loading...' : 'Continue'}
          </button>
        </form>
      </div>
      <div className={styles.footer}>
        <p>New?</p>
        <Link to="/register">
          <button disabled={isLoading} className={styles.link}>
            Create your account
          </button>
        </Link>
      </div>
    </div>
  );
}