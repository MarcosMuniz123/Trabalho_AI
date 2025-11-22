import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './NewMovie.module.css';

const API_URL = 'https://690d0e41a6d92d83e85053b7.mockapi.io/filmes';
const NewMovie = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [imagem, setImagem] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoTitle, setAutoTitle] = useState('');
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !sinopse || !imagem) { 
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const newMovie = {
        titulo: titulo,
        sinopse: sinopse,
        imagem: imagem,
      };

      const response = await axios.post(API_URL, newMovie); 

      console.log('Filme criado:', response.data);
      alert('Filme cadastrado com sucesso!');
      
      navigate('/');

    } catch (err) {
      setError('Ocorreu um erro ao cadastrar o filme. Tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoAdd = async (e) => {
    e.preventDefault();
    if (!autoTitle) return;
    setIsAutoSubmitting(true);
    const n8nWebhookUrl = 'http://localhost:5678/webhook/adicionar-filme'; // Verifique sua URL de produção do N8N!
    try {
      await axios.post(n8nWebhookUrl, { title: autoTitle });
      
      alert('Filme adicionado com sucesso pela automação!');
      setAutoTitle(''); // Limpa o campo
      // Opcional: navegar para a home também
      // navigate('/'); 
    } catch (err) {
      alert('Ocorreu um erro ao buscar o filme. Verifique o N8N e a API.');
      console.error(err);
    } finally {
      setIsAutoSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Cadastrar Novo Filme</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título do filme"
          />
        </div>
        
        <div className={styles.formControl}>
          <label htmlFor="imagem">URL da Imagem:</label>
          <input
            type="text"
            id="imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="Cole a URL de uma capa"
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="sinopse">Sinopse:</label>
          <textarea
            id="sinopse"
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            placeholder="Digite a sinopse do filme"
          ></textarea>
        </div>
        
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar Filme'}
        </button>
      </form>
      
      <hr />
      <h2>Adicionar Filme Automaticamente</h2>
      <form onSubmit={handleAutoAdd}>
        <div className={styles.formControl}>
          <label htmlFor="autoTitulo">Título do Filme:</label>
          <input
            type="text"
            id="autoTitulo"
            value={autoTitle}
            onChange={(e) => setAutoTitle(e.target.value)}
            placeholder="Digite o título (ex: Batman)"
          />
        </div>
        <button type="submit" disabled={isAutoSubmitting}>
          {isAutoSubmitting ? 'Buscando...' : 'Buscar e Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default NewMovie;