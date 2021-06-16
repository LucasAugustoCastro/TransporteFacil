/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent, useCallback, useRef } from 'react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowLeft,
  FiFileText,
  FiList,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.png';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  cpf: string;
  driver: 'motorista' | 'usuario';
  nCNH?: string;
}

const SignIn: React.FC = () => {
  const [isValue, setValue] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(true);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatorio'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
          passwordConfirmation: Yup.string()
            .required('Confirmação de senha obrigatoria')
            .oneOf([Yup.ref('password'), null], 'Senhas diferentes'),
          cpf: Yup.string()
            .min(11, 'Deve ter 11 numeros')
            .max(11, 'Deve ter 11 numeros'),
          driver: Yup.string().required('Escolha um dos dois'),
          nCNH: Yup.string().notRequired(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        if (data.nCNH) {
          await api.post('/drivers', data);
        } else {
          await api.post('/users', data);
        }
        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no Transporte Facil',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);

          formRef.current?.setErrors(erros);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );
  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    if (event.target.value === 'motorista') {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="TransporFacil" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Nome Completo"
            />
            <Input name="cpf" icon={FiFileText} type="text" placeholder="CPF" />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirme sua senha"
            />
            {/** eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            {/* <label>
            <FiList size={20} />
            <select name="driver" onChange={handleChange}>
              <option value="vazio">Who are you?</option>
              <option value="usuario">Usuario</option>
              <option value="motorista">Motorista</option>
            </select>
          </label> */}
            <Select
              name="driver"
              icon={FiList}
              value={isValue}
              onChange={handleChange}
            />
            {/* <input
            name="motorista"
            type="checkbox"
            checked={isValue}
            onChange={handleChange}
          /> */}
            <Input
              name="nCNH"
              hidden={hidden}
              icon={FiLock}
              type="text"
              placeholder="Numero de registro da CNH"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignIn;
