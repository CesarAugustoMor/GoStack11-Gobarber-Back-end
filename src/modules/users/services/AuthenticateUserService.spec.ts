import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('shuld be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@exemple.com',
      password: '12345678',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  // it('shuld not be able to create two users with the same email', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const createUser = new AuthenticateUserService(fakeUsersRepository);

  //   await createUser.execute({
  //     name: 'John Doe',
  //     email: 'johndoe@exemple.com',
  //     password: '12345678',
  //   });
  //   expect(
  //     createUser.execute({
  //       name: 'John Doe',
  //       email: 'johndoe@exemple.com',
  //       password: '12345678',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});