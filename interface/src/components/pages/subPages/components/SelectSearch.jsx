import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const SelectWithSearch = ({ options, onSelect }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Filtra as opções com base no termo de pesquisa
    const filtered = options.filter((option) =>
      option.nome_contato.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [options, searchTerm]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setOpen(false);
  };

  const dropdownOptions = useMemo(() => {
    return (
      <div className={`your-dropdown-styles ${open ? 'open' : 'closed'}`}>
        {filteredOptions.map((option) => (
          <div
            key={option.id_contato}
            className="your-option-styles"
            onClick={() => handleSelect(option)}
          >
            {option.nome_contato}
          </div>
        ))}
      </div>
    );
  }, [filteredOptions, open]);

  return (
    <div>
      <div className="your-container-styles">
        <div className="your-input-container-styles">
          <input
            className="your-input-styles"
            placeholder="Pesquisar ou selecionar um Contato..."
            value={selectedOption ? selectedOption.nome_contato : searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpen(true);
            }}
            onBlur={() => setOpen(false)}
          />
          <span
            className="your-toggle-styles"
            onClick={() => setOpen((p) => !p)}
          >
            {/* Sua lógica para o ícone de seta ou outro indicador */}
          </span>
        </div>
        {open && dropdownOptions}
      </div>
    </div>
  );
};

SelectWithSearch.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SelectWithSearch;
