import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
    it('should be able to login', () => {
        apiMock.onPost('sessions').reply(200, {
            user: {
                id: 'user-123',
                name: 'John Doe',
                email: 'joao@forbrig.com',
            },
            token: 'token-123',
        });
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        result.current.signIn({
            email: 'joao@forbrig.com',
            password: '123456',
        });

        expect(result.current.user.email).toEqual('joao@forbrig.com');
    });
});
