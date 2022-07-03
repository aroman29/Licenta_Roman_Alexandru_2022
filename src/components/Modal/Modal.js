import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { BUTTON_TYPES } from '../../utils/constants';
import RbButton from '../../components/Button/Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

function AfModal({
  title, show, onClose, onSave, text, onCloseText, onSaveText, confirm,
}) {
  const { t: translate } = useTranslation();
  return (
    <>
      {show && (
      <div className="modal-background">
        <div className="modal">
          <div className="header">
            <h3>{title}</h3>
            <div className="modal-exit">
              <RbButton
                buttonIcon={faTimes}
                onClick={onClose}
                small
                buttonType={BUTTON_TYPES.remove}
              />
            </div>
          </div>
          <div className="modal-content">{text}</div>
          <div className="actions">
            <RbButton buttonType="secondary" text={onCloseText || translate('MODAL.cancel')} onClick={onClose} />
            {!confirm && <RbButton text={onSaveText || translate('MODAL.confirm')} onClick={onSave} /> }
          </div>
        </div>
      </div>
      )}
    </>
  );
}

AfModal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  text: PropTypes.string,
  onCloseText: PropTypes.string,
  onSaveText: PropTypes.string,
  confirm: PropTypes.bool,
};

AfModal.defaultProps = {
  title: '',
  show: false,
  onClose: () => {},
  onSave: () => {},
  text: '',
  onCloseText: '',
  onSaveText: '',
  confirm: false,
};

export default AfModal;
