import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import checkImg from '../../assets/Check.svg';
import Hexagon from '../Hexagon';
import { Bloxe } from '../Dashboard';

import {
  Container,
  Header,
  Main,
  ItemType,
  Details,
  IDContainer,
  ModalityContainer,
  Footer,
} from './styles';

interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bloxe: Bloxe;
}

export function Card({ bloxe, ...rest }: CardProps): JSX.Element {
  const names = bloxe.responsibles.map(item => item.name && item.name);

  return (
    <Container {...rest}>
      <Header backgroundColor={bloxe.knowledge_area.color1}>
        <div>
          <p>Data limite</p>
          <h2 id="title">{bloxe.date_limit_edition}</h2>
        </div>
        <img src={checkImg} width={20}/>
      </Header>
      <Main backgroundColor={bloxe.knowledge_area.color2}>
        <ItemType>
          {bloxe.knowledge_area.icon_url ? (
            <img src={bloxe.knowledge_area.icon_url} alt="teste" />
          ) : (
            <Hexagon backgroundColor={bloxe.knowledge_area.color1} />
          )}

          <Details>
            <IDContainer>
              <span>ID</span>
              <p>{bloxe.blox_profile.id}</p>
            </IDContainer>
            <ModalityContainer>
              <span>Modalidade</span>
              <p>{bloxe.modality}</p>
            </ModalityContainer>
          </Details>
        </ItemType>

        <strong>{bloxe.title}</strong>
      </Main>
      <Footer backgroundColor={bloxe.knowledge_area.color1}>
        {names.length ? (
          <p>{names.join(' e ').toUpperCase()}</p>
        ) : (
          <p>
            error
          </p>
        )}
      </Footer>
    </Container>
  );
}
