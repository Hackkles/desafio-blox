import styled from 'styled-components';

export const Container = styled.div`
  background: var(--blue);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 auto;

  @media (max-width: 760px) {
    text-align: center;
  }
`;
