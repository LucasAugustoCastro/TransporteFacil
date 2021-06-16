import styled from 'styled-components';
import backgroundDashboard from '../../assets/backgroundDashboard.jpg';



export const Container = styled.div`

  height: 100vh;
  display: flex;
  justify-content: center;


`;

export const Background = styled.div`
  background: url(${backgroundDashboard}) no-repeat center;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  opacity: 0.1;
`;
export const Content = styled.div`
    width: 100%;
    max-width: 960px;
    position: relative;
`;


export const Header = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;

  img {
    width:300px;
  }
  a {
    display: flex;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const DriverInfo = styled.div`
  margin-top: 30px;
  background: #433149;

  border-radius: 5px;

  header {
    display: flex;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }

    div {
      margin-top: 15px;
      div {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        strong {
          font-size: 36px;
          color: #a8a8b3;
        }
        p {
          font-size: 18px;
          color: #737380;
          margin-left: 30px;
          margin-top: 7px;

        }
      }
      p {
        margin-left: 5px;
        color: #737380;
      }

    }
  }
`;

export const Regioes = styled.div`
  margin-top: 80px;
  margin-left: 24px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar-track {
    background-color: #433149;

  }
  ::-webkit-scrollbar {
    width: 6px;
    background: #433149;
  }
  ::-webkit-scrollbar-thumb {
    background: #321E38;
  }
  title {
    display: flex;
    color: #a8a8b3;
    font-size: 30px;
    margin-bottom: 16px;
  }
`;

export const Driver = styled.div`

  background: #232129;
  border: solid 2px #232129;
  border-radius: 5px;
  width: 98%;
  padding: 24px;

  margin-left: 10px;
  transition: transform 0.2s;

  & + div {
    margin-top: 10px;
  }

  &:hover {
    border-color: #ff9000;
  }


    div {
      display: flex;
      align-items: center;
      strong {
      font-size: 20px;
      color: #737380;

        & + strong {
          margin-left: 20px;
        }

      }
    }
    p{
      margin-left: 10px;
      color: #a8a8b3;
    }






`;
