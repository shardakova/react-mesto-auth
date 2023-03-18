import React, { useEffect } from 'react';

function InfoTooltip (props) {
  function onKeyup (event) {
    if (event.key === 'Escape') {
      props.onClose();
    }
  }

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keyup', onKeyup);
    } else {
      document.removeEventListener('keyup', onKeyup);
    }
  }, [props.isOpen]);

  function handleOutsideClick (event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div
      onMouseDown={handleOutsideClick}
      className={`info_tooltip ${props.isOpen ? 'info_tooltip_opened' : ''}`}
    >
      <div className="info_tooltip__content">
        <button
          className="button button_type_close opacity"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <div className="info_tooltip__icon">
          {props.icon}
        </div>
        <div className="info_tooltip__text">
          {props.text?.split('\n').map((item, key) => <span key={key}>{item}<br/></span>)}
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
