import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiChevronRight } from 'react-icons/fi';
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Background, Content, SearchRegioes, FormsInfo} from './styles';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';

interface Regiao {

  id: string;
  origem: string;
  destino: string;
  info?: string;
  hour: string;
  driver: {
    id: string;
    name: string;
  };

}

const Dashboard: React.FC = () => {
  const [newOri, setNewOri] = useState('');
  const [newDest, setNewDest] = useState('');

  const [regioes, setRegioes] = useState<Regiao[]>([]);

  async function handleSubmit(): Promise<void> {

    const response = await api.get(`/users/regiao/${newOri}/${newDest}`);
    console.log(response);
    const searchRegioes= response.data.regioes;

    console.log(searchRegioes);

    setRegioes(searchRegioes);
    setNewOri('');
    setNewDest('');
  }

  return (
    <Container>
      <Background/>
      <img src={logoImg} alt=""/>
      <Content>
        <Form onSubmit={handleSubmit}>
          <FormsInfo>
            <div>
              <title>Origem:</title>
              <Input
                name="origem"
                icon={FiSearch}
                value={newOri}
                onChange={e   => setNewOri(e.target.value)}
                placeholder="Ex: Bairo Alto"
              />
            </div>
            <div>
              <title>Destino:</title>
              <Input
                name="destino"
                icon={FiSearch}
                value={newDest}
                onChange={e => setNewDest(e.target.value)}
                placeholder="Ex: Prado Velho"
              />
            </div>
          </FormsInfo>

          <Button type="submit">Pesquisar</Button>
        </Form>
        <SearchRegioes>

          {/* <Link
            key="sdfsdf"
            to={`/motoristas/1234`}
            >
            <div >
              <strong>Motorista: nao sei</strong>
              <div>
                <p>Parte de: onde</p>
                <p>Vai até: la</p>
              </div>
              <p>Descriçao vai aqui aaaaaaa</p>
            </div>
            <FiChevronRight size={30}/>
            </Link> */}

          {regioes.map(regiao => (
            <Link
            key={regiao.id}
            to={`/motoristas/${regiao.driver.id}`}
            >
            <div >
              <strong>Motorista: {regiao.driver.name}</strong>
              <div>
                <p>Parte de: {regiao.origem}</p>
                <p>Vai até: {regiao.destino}</p>
              </div>
              <p>{regiao.info}</p>
              <p>Hora de saida: {regiao.hour}</p>
            </div>
            <FiChevronRight/>
            </Link>
            ))}
        </SearchRegioes>
      </Content>
    </Container>
  );
};

export default Dashboard;
