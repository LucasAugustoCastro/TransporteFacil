import styled from 'styled-components';
import backgroundDashboard from '../../assets/backgroundDashboard.jpg';


export const Container = styled.div`

  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    position: relative;
    width: 300px;
    margin-right: 500px;
  }

`;
export const Background = styled.div`
  background: url(${backgroundDashboard}) repeat center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  position: absolute;
  opacity: 0.1;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  position: relative;
  display: block;

  form {
    width: 100%;
    margin-top: 50px;

  }

`;
export const FormsInfo = styled.div`
  display: flex;
  div {
    width: 100%;

    & + div {
      margin-left: 8px;
    }

    title {
      display: flex;
      color: #fff;
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: bold;
    }
    div {
      padding: 16px;
    }

  }

`;

export const SearchRegioes = styled.div`
  margin-top: 80px;
  width: 100%;
  height: 350px;
  position: static;

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

  a {
    background: #232129;
    border: solid 2px #232129;
    border-radius: 5px;
    width: 98%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 10px;
    }

    &:hover {
      transform: translate(10px);
      border-color: #ff9000;
      svg {
        color: #ff9000;
      }
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #fff;
      }

      div {
        display:flex;
        width: 100%;
        margin: 0;
        p {
        font-size: 16px;
        color: #a8a8b3;
        margin-top: 4px;
          & + p {
            margin-left: 50px;
          }
        }
      }
      p {
        font-size: 12px;
        color: #75757d;
        margin-top: 4px;

        }
    }


  }
  svg {
    color: #fff;
  }
`;

