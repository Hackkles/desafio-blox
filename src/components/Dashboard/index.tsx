import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { BiSearch } from 'react-icons/bi';
import gridImg  from '../../assets/Grid.svg';
import listImg  from '../../assets/List.svg';
import { Card } from '../../components/Card';
import { LoadingCard } from '../../components/LoadingCard';
import { DetailsModal } from '../../components/DetailsModal';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  FilterTypesContainer,
  FilterTypeText,
  FilterContainer,
  OrderButtonContainer,
  ItemContainer,
  NextPageButtonContainer,
  NextPageButton,
} from './styles';


export interface Bloxe {
  id: number;
  date_limit_edition: string;
  title: string;
  blox_profile: {
    id: number;
  };
  modality: string;
  knowledge_area: {
    color1: string;
    color2: string;
    icon_url: string | null;
    name: string;
  };
  responsibles: [{ name: string[] | string | null | undefined }];
  status: string;
  functional_area: {
    name: string;
  };
  competences: [
    {
      name: string;
    }
  ];
  hours: number;
}

Modal.setAppElement('#root');

export const Dashboard: React.FC = () => {
  const [bloxes, setBloxes] = useState<Bloxe[]>();
  const [bloxesFiltered, setBloxesFiltered] = useState<Bloxe[]>();
  const [showDetails, setShowDetails] = useState<Bloxe>();
  const [optionActive, setOptionActive] = useState('Todos');
  const [page, setPage] = useState(1);
  const [isGridActive, setIsGridActive] = useState(true);
  const [isFinalPageReached, setIsFinalPageReached] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { signIn } = useAuth();

  function handleOpenNewDetailsModal(bloxe: Bloxe) {
    setIsDetailsModalOpen(true);
    setShowDetails(bloxe);
    document.body.style.overflow = 'hidden';
  }

  function handleCloseNewDetailsModal() {
    setIsDetailsModalOpen(false);

    document.body.style.overflow = 'auto';
  }

  useEffect(() => {
    setIsLoading(true);

    async function loadBloxes() {
      await signIn();

      const response = await api.get(`/bloxes?per=3&page=${page}`);

      if (response.data.length === 0) {
        setIsFinalPageReached(true);
        setIsLoading(false);
      } else {
        const bloxesFormatted = response.data.map((item: Bloxe) => {
          return {
            ...item,
            date_limit_edition: item.date_limit_edition
              ? new Date(item.date_limit_edition).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Sem data limite',
          };
        });
        setBloxes(bloxesFormatted);
        setBloxesFiltered(bloxesFormatted);
        setIsFinalPageReached(false);
        setIsLoading(false);
      }
    }

    loadBloxes();
  }, [signIn, page]);

  const handleFilterByStatus = useCallback(
    (option: string) => {
      switch (option) {
        case 'pending': {
          const bloxesFilteredByStatus = bloxes?.filter(
            item => item.status === 'pending'
          );

          setBloxesFiltered(bloxesFilteredByStatus);
          setOptionActive('Pendentes');
          break;
        }
        case 'review': {
          const bloxesFilteredByStatus = bloxes?.filter(
            item => item.status === 'review'
          );

          setBloxesFiltered(bloxesFilteredByStatus);
          setOptionActive('Aguardando Revisão');
          break;
        }
        case 'accepted': {
          const bloxesFilteredByStatus = bloxes?.filter(
            item => item.status === 'accepted'
          );

          setBloxesFiltered(bloxesFilteredByStatus);
          setOptionActive('Aprovados');
          break;
        }
        case 'archived': {
          const bloxesFilteredByStatus = bloxes?.filter(
            item => item.status === 'archived'
          );

          setBloxesFiltered(bloxesFilteredByStatus);
          setOptionActive('Arquivados');
          break;
        }
        default:
          setBloxesFiltered(bloxes);
          setOptionActive('Todos');
          break;
      }
    },
    [bloxes]
  );

  const handleFilterByTitleOrId = useCallback(
    (value: string | number) => {
      if (value === '') {
        setBloxesFiltered(bloxes);
      } else {
        const bloxesTilteredByIdOrTitle = bloxes?.filter(
          item =>
            item.title.toUpperCase().includes(String(value).toUpperCase()) ||
            String(item.blox_profile.id).includes(String(value))
        );

        setBloxesFiltered(bloxesTilteredByIdOrTitle);
        setOptionActive('Todos');
      }
    },
    [bloxes]
  );

  const handleIncrementPage = useCallback(() => {
    setPage(oldState => oldState + 1);
    window.location.href = '#';
  }, []);

  const handleDecrementPage = useCallback(() => {
    if (page > 1) setPage(oldState => oldState - 1);
    window.location.href = '#';
  }, [page]);

  return (
    <>
      <DetailsModal
        OnRequestClose={handleCloseNewDetailsModal}
        isOpen={isDetailsModalOpen}
        bloxeDetail={showDetails}
      />

      <Container>
        <FilterTypesContainer>
          <FilterTypeText>{optionActive}</FilterTypeText>

          <FilterContainer>
            <Input
              placeholder="Título ou ID"
              icon={BiSearch}
              onChange={e => handleFilterByTitleOrId(e.target.value)}
            />

            <select
              id="status"
              onChange={e => handleFilterByStatus(e.target.value)}
            >
              <option value="default" hidden>
                Filtro
              </option>
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="review">Aguardando revisão</option>
              <option value="accepted">Aprovados</option>
              <option value="archived">Arquivados</option>
            </select>
          </FilterContainer>
        </FilterTypesContainer>

        <OrderButtonContainer>
          <button
            type="button"
            className={isGridActive ? 'active' : ''}
            onClick={() => setIsGridActive(true)}
          >
          <img src={gridImg} width={20} />
          </button>

          <button
            type="button"
            className={!isGridActive ? 'active' : ''}
            onClick={() => setIsGridActive(false)}
          >
            <img src={listImg} width={20} />
          </button>
        </OrderButtonContainer>

        <ItemContainer isGridActive={isGridActive}>
          {isLoading ? (
            <>
              <LoadingCard />
            </>
          ) : (
            bloxesFiltered?.map(item => (
              <Card
                key={item.id}
                bloxe={item}
                onClick={() => handleOpenNewDetailsModal(item)}
              />
            ))
          )}
        </ItemContainer>

        <NextPageButtonContainer>
          <NextPageButton
            isLoading={isLoading}
            disabled={page === 1 || isLoading}
            onClick={handleDecrementPage}
          >
            Anterior
          </NextPageButton>
          <NextPageButton
            isLoading={isLoading}
            disabled={isFinalPageReached || isLoading}
            onClick={handleIncrementPage}
          >
            Próximo
          </NextPageButton>
        </NextPageButtonContainer>
      </Container>
    </>
  );
};
