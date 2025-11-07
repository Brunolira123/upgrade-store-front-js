import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellPage.css';

const SellPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    model: '',
    condition: 'excellent',
    description: '',
    price: '',
    category: 'gpu'
  });
  
  // Estados para mídia
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);

  // Função para formatar valor em Real
  const formatToBRL = (value) => {
    // Remove tudo que não é número
    const onlyNumbers = value.replace(/\D/g, '');
    
    // Converte para número e divide por 100 para ter centavos
    const number = parseInt(onlyNumbers) / 100;
    
    // Formata para Real brasileiro
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Função para remover formatação (pegar apenas números)
  const removeFormatting = (formattedValue) => {
    return formattedValue.replace(/\D/g, '');
  };

  // Manipular mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Se for o campo de preço, formatar para Real
    if (name === 'price') {
      // Se estiver vazio, limpa o campo
      if (value === '') {
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
        return;
      }
      
      // Formata o valor
      const formattedValue = formatToBRL(value);
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Manipular upload de fotos
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 4) {
      alert('Máximo de 4 fotos permitidas!');
      return;
    }
    
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  // Remover foto
  const handleRemovePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Manipular upload de vídeo
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  // Remover vídeo
  const handleRemoveVideo = () => {
    setVideo(null);
  };

  // Enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validações
    if (!formData.productName || !formData.description || !formData.price) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      setLoading(false);
      return;
    }

    if (photos.length === 0) {
      alert('Por favor, adicione pelo menos uma foto do produto!');
      setLoading(false);
      return;
    }

    try {
      // Remover formatação do preço antes de enviar
      const priceWithoutFormatting = removeFormatting(formData.price);
      
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Dados enviados:', {
        ...formData,
        price: priceWithoutFormatting, // Envia sem formatação
        photos: photos.map(p => p.file),
        video: video?.file
      });
      
      setSubmitted(true);
      
      // Limpar formulário após sucesso
      setTimeout(() => {
        setFormData({
          productName: '',
          brand: '',
          model: '',
          condition: 'excellent',
          description: '',
          price: '',
          category: 'gpu'
        });
        setPhotos([]);
        setVideo(null);
        setSubmitted(false);
      }, 5000);
      
    } catch (error) {
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="sell-page-tech">
        <div className="sell-container-tech">
          <div className="success-message-tech">
            <span className="success-icon-tech">🎉</span>
            <h2 className="success-title-tech">Solicitação Enviada!</h2>
            <p style={{color: '#b0b0c0', marginBottom: '2rem'}}>
              Sua solicitação de venda foi enviada com sucesso. 
              Nossa equipe entrará em contato o mais breve possível para avaliação.
            </p>
            <button 
              className="btn-back-tech"
              onClick={() => navigate('/')}
            >
              ← Voltar para Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-page-tech">
      <div className="sell-container-tech">
        {/* Hero Section */}
        <div className="sell-hero-tech">
          <h1 className="sell-title-tech">💰 VENDA SUA PLACA</h1>
          <p className="sell-subtitle-tech">
            Anuncie sua placa de vídeo usada para venda direta conosco
          </p>
        </div>

        {/* Features */}
        <div className="sell-features-tech">
          <div className="feature-tech">
            <span className="feature-icon-tech">⚡</span>
            <h3>Avaliação em Rápida</h3>
            <p>Nossa equipe analisa rapidamente</p>
          </div>
          <div className="feature-tech">
            <span className="feature-icon-tech">💰</span>
            <h3>Pagamento Seguro</h3>
            <p>Transação garantida e protegida</p>
          </div>
          <div className="feature-tech">
            <span className="feature-icon-tech">🚚</span>
            <h3>Envio Seguro</h3>
            <p>Todos os envios são feitos por empresas resposáveis</p>
          </div>
        </div>

        {/* Formulário de Venda */}
        <div className="sell-form-container-tech">
          <h2 className="form-title-tech">📝 DETALHES DO PRODUTO</h2>
          
          <form onSubmit={handleSubmit} className={`form-grid-tech ${loading ? 'loading-tech' : ''}`}>
            {/* Informações Básicas */}
            <div className="form-group-tech">
              <label className="form-label-tech">Nome do Produto *</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="form-input-tech"
                placeholder="Ex: RTX 3080 10GB"
                required
              />
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Marca</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="form-input-tech"
                placeholder="Ex: NVIDIA, AMD, ASUS"
              />
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Modelo</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="form-input-tech"
                placeholder="Ex: ROG Strix, Gaming X"
              />
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Categoria</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select-tech"
              >
                <option value="gpu">Placa de Vídeo</option>
                <option value="cpu">Processador</option>
                <option value="motherboard">Placa-mãe</option>
                <option value="memory">Memória RAM</option>
                <option value="storage">Armazenamento</option>
              </select>
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Estado de Conservação</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="form-select-tech"
              >
                <option value="excellent">Excelente</option>
                <option value="good">Bom</option>
                <option value="regular">Regular</option>
                <option value="needs_repair">Precisa de Reparo</option>
              </select>
            </div>

            {/* Descrição */}
            <div className="form-group-tech">
              <label className="form-label-tech">Descrição Detalhada *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea-tech"
                placeholder="Descreva o produto, inclua especificações técnicas, tempo de uso, motivo da venda, etc..."
                required
              />
            </div>

            {/* Upload de Fotos */}
            <div className="form-group-tech">
              <label className="form-label-tech">Fotos do Produto (Máx. 4) *</label>
              <div className="file-upload-section-tech">
                <label className="file-upload-area-tech">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="file-input-tech"
                  />
                  <span className="file-upload-icon-tech">📸</span>
                  <div className="file-upload-text-tech">
                    Clique para adicionar fotos ou arraste aqui
                  </div>
                  <div style={{color: '#888', fontSize: '0.8rem'}}>
                    {photos.length}/4 fotos adicionadas
                  </div>
                </label>
              </div>

              {/* Preview das Fotos */}
              {photos.length > 0 && (
                <div className="media-preview-tech">
                  {photos.map((photo, index) => (
                    <div key={index} className="media-preview-item-tech">
                      <img 
                        src={photo.preview} 
                        alt={`Preview ${index + 1}`}
                        className="media-preview-image-tech"
                      />
                      <button
                        type="button"
                        className="media-remove-tech"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload de Vídeo */}
            <div className="form-group-tech">
              <label className="form-label-tech">Vídeo do Produto (Opcional)</label>
              <div className="file-upload-section-tech">
                <label className="file-upload-area-tech">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="file-input-tech"
                  />
                  <span className="file-upload-icon-tech">🎥</span>
                  <div className="file-upload-text-tech">
                    Clique para adicionar um vídeo
                  </div>
                  <div style={{color: '#888', fontSize: '0.8rem'}}>
                    Máximo 1 vídeo
                  </div>
                </label>
              </div>

              {/* Preview do Vídeo */}
              {video && (
                <div className="media-preview-tech">
                  <div className="media-preview-item-tech">
                    <video 
                      src={video.preview}
                      className="media-preview-video-tech"
                      controls
                    />
                    <button
                      type="button"
                      className="media-remove-tech"
                      onClick={handleRemoveVideo}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Preço */}
            <div className="price-section-tech">
              <label className="form-label-tech">Valor Solicitado *</label>
              <div className="price-input-container-tech">
                <input
                  type="text" // Mudado para text para aceitar formatação
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="price-input-tech"
                  placeholder="R$ 0,00"
                  required
                />
              </div>
            </div>

            {/* Ações */}
            <div className="form-actions-tech">
              <button 
                type="button"
                className="btn-back-tech"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                ← Cancelar
              </button>
              <button 
                type="submit"
                className="btn-submit-tech"
                disabled={loading}
              >
                {loading ? '🔄 Enviando...' : '🚀 Enviar Solicitação'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;