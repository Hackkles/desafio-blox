import React from 'react';
import Modal from 'react-modal';
import closeImg  from '../../assets/Close.svg';
import bookImg  from '../../assets/Bookmark.svg';
import Hexagon from '../Hexagon';
import { Bloxe } from '../Dashboard';


import {
  Header,
  Modalities,
  ModalityContainer,
  WorkloadContainer,
  Section,
  Areas,
  KnowledgeArea,
  FunctionalArea,
  OtherThings,
  Profile,
  Competencies,
} from './styles';

interface DetailsModalProps {
  isOpen: boolean;
  OnRequestClose: () => void;
  bloxeDetail: Bloxe | undefined;
}

export function DetailsModal({
  OnRequestClose,
  isOpen,
  bloxeDetail,
}: DetailsModalProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={OnRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Header color={bloxeDetail?.knowledge_area.color1}>
        <h1>{bloxeDetail?.title}</h1>
      </Header>
      <Modalities>
        
        <Hexagon
          backgroundColor={bloxeDetail?.knowledge_area.color2}
          className="hexagon-position"
        />
        <ModalityContainer>
          <h2>Modalidade</h2>
          <h1>{bloxeDetail?.modality}</h1>
        </ModalityContainer>
        <WorkloadContainer>
          <h2>Carga horária</h2>
          <h1>{bloxeDetail?.hours}h</h1>
        </WorkloadContainer>
      </Modalities>
      <Section>
        <Areas>
          <KnowledgeArea>
            <h2>Área de conhecimento</h2>
            <div>
              <Hexagon
                small
                backgroundColor={bloxeDetail?.knowledge_area.color2}
              />
              <p>{bloxeDetail?.functional_area.name}</p>
            </div>
          </KnowledgeArea>
          <FunctionalArea color={bloxeDetail?.knowledge_area.color2}>
            <h2>Área funcional</h2>
            <div>
              <img src={bookImg} width={20}/>
              <p>{bloxeDetail?.functional_area.name}</p>
            </div>
          </FunctionalArea>
        </Areas>
        <OtherThings>
          <Profile>
            <h2>Perfil</h2>
            <p>{bloxeDetail?.knowledge_area.name}</p>
          </Profile>
          <Competencies color={bloxeDetail?.knowledge_area.color2}>
            <h2>Competências</h2>
            {bloxeDetail?.competences.map(item => (
              <p key={item.name}>{item.name}</p>
            ))}
          </Competencies>
        </OtherThings>
      </Section>
    </Modal>
  );
}
