import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import api from '../../services/api';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import avatar from '../../assets/user.jpg';
import { Container, Background, Content, Header, DriverInfo, Regioes, Driver } from './styles';


interface MotoristasParams {
  id: string;
}

interface Driver {
  id: string;
  name: string;
  email: string;
  cpf: string;
  nCNH: string;
  description?: string;
}
interface Regiao {
  id: string;
  origem: string;
  destino: string;
  info: string;
  hour: string
}

const Motoristas: React.FC = () => {

  const { params } = useRouteMatch<MotoristasParams>();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [regioes, setRegioes] = useState<Regiao[]>([]);

  useEffect(() => {
    api.get(`drivers/${params.id}`).then(response => {
      setDriver(response.data.driver);
      setRegioes(response.data.regioes)
    });
  },[params.id])

  return (
    <Container>
      <Background />
      <Content>
        <Header>
          <img src={logoImg} alt=""/>
          <Link to="/dashboard">
            <FiChevronLeft size={20} />
            Voltar
          </Link>
        </Header>
        {driver && (
          <DriverInfo>
            <header>
              <img src={avatar} />
              <div>
                <div>
                  <strong>{driver.name}</strong>
                  <p>{driver.email}</p>
                </div>
                <p>{driver.description}</p>

              </div>

            </header>
          </DriverInfo>
        )}
        <Regioes>
          <title>Regiões que atende:</title>
          {regioes.map(regiao => (

            <Driver key={regiao.id}>



                <div>
                  <strong>Origem: {regiao.origem}</strong>
                  <strong>Destino: {regiao.destino}</strong>
                </div>


                <p>{regiao.info}</p>
                <p>Sai as: {regiao.hour}</p>



            </Driver>


          ))}
        </Regioes>
      </Content>
    </Container>


  )



}

export default Motoristas;
