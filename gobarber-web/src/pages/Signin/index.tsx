/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo.svg';
import getValidationErros from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { user, signIn } = useContext(AuthContext);

    console.log(user);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um email válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);

                const errors = getValidationErros(err);
                formRef.current?.setErrors(errors);
            }
        },
        [signIn],
    );
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="New">
                    <FiLogIn />
                    Criar Conta
                </a>
            </Content>

            <Background />
        </Container>
    );
};

export default SignIn;