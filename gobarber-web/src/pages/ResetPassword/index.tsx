/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useLocation, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import logoImg from '../../assets/logo.svg';
import getValidationErros from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const history = useHistory();
    const location = useLocation();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    password: Yup.string().required('Senha obrigatória'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), undefined],
                        'As duas senhas precisam ser iguais',
                    ),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                const { password, password_confirmation } = data;
                const token = location.search.replace('?token=', '');

                if (!token) {
                    throw new Error();
                }

                await api.post('password/reset', {
                    password,
                    password_confirmation,
                    token,
                });

                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErros(err);
                    formRef.current?.setErrors(errors);

                    return;
                }
                // disparar um  Toast
                addToast({
                    type: 'error',
                    title: 'Erro ao resetar a enha',
                    description:
                        'Ocorreu um erro  ao  resetar sua senha, tente novamente',
                });
            }
        },
        [addToast, history, location.search],
    );
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar senha</h1>

                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Nova senha"
                        />

                        <Input
                            name="password_confirmation"
                            icon={FiLock}
                            type="password"
                            placeholder="confirmação da nova senha"
                        />

                        <Button type="submit">Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default SignIn;
