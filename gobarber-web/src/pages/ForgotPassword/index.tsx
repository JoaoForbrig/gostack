/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import logoImg from '../../assets/logo.svg';
import getValidationErros from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            try {
                setLoading(true);
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um email válido'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                // RECUPERAÇÃO DE SENHA

                await api.post('/password/forgot', {
                    email: data.email,
                });

                addToast({
                    type: 'success',
                    title: 'E-mail de recuperação enviado',
                    description:
                        'Enviamos um e-mail para confirmar a recuração de senha, cheque sua caixa de entrada',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErros(err);
                    formRef.current?.setErrors(errors);

                    return;
                }
                // disparar um  Toast
                addToast({
                    type: 'error',
                    title: 'Erro na recuperação de senha',
                    description:
                        'Ocorreu um erro  ao  tentar realizar a recuperação de senha, tente novamente',
                });
            } finally {
                setLoading(false);
            }
        },
        [addToast],
    );
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar Senha</h1>

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />

                        <Button loading={loading} type="submit">
                            Recuperar
                        </Button>
                    </Form>

                    <Link to="/signin">
                        <FiLogIn />
                        Voltar ao Login
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
};

export default ForgotPassword;
