import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';
import { BUTTON_TYPES, STATUSSES, USER_TYPE } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import carActions from '../../redux/actions/carActions';
import AfButton from '../Button/Button';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import AfModal from '../Modal/Modal';

const ExtendedSummary = ({summary}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const [totalPrice, setTotalPrice] = useState(0);
  const carJobs = useSelector((state) => state.car.carJobs).filter((job) => summary.id === job.carId);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCarJobId, setSelectedCarJobId] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  function handleDeleteModalClose() {
    setShowDeleteModal(false);
  }
  function handleEditModalClose() {
    setShowEditModal(false);
  }

  function handleDeleteCarJob() {
    console.log(selectedCarJobId);

    dispatch(carActions.deleteCarJob(selectedCarJobId))
      .then((res) => {
        console.log(res);
        handleDeleteModalClose();
      });
  };
  function handleEditCarJob() {

    // dispatch(carActions.editCarStatus(summary.id, STATUSSES.IN_SERVICE))
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  const handleOpenDeleteModal = (carJobIdSelected) => {
    setSelectedCarJobId(carJobIdSelected);
    setShowDeleteModal(true);

  };
  const handleOpenEditModal = (serviceIdSelected) => {
    setShowEditModal(true);

  };

  useEffect(() => {
    const initialValue = 0;
    dispatch(carActions.getCarsJobs())
      .then((res) => {
        console.log(res);
        const sum = res
        .filter((job) => job.carId === summary?.id)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue.price,
          initialValue
        );
        setTotalPrice(sum);
      });

      
    
    
    
  }, []);

  return (
    <div className='car-repairs-wrapper'>
      <div className='car-repairs'>
        
        {carJobs.length > 0 ? 
          <table>
            <tbody>
              <tr className="table-header">
                <th>
                  Index
                </th>
                <th>
                  Repair name
                </th>
                <th>
                  Description
                </th>
                <th>
                  price
                </th>
                <th>
                  length
                </th>
                {currentUser.role !== USER_TYPE.client.toString()
                ? (<th>
                  {translate('SERVICES.tableHeaders.actions')}
                </th>)
                : ""
                }
              </tr>
              {carJobs.map((repair, index) => {
              console.log(repair);
                  return (
                    <tr key={repair?.id} className="table-row">
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {repair.name}
                      </td>
                      <td>
                        {repair.description}
                      </td>
                      <td>
                        {repair.price} ron
                      </td>
                      <td>{repair.duration}</td>
                      <td>
                        {currentUser.role !== USER_TYPE.client.toString() 
                        ? (<div className="action-buttons">
                          {/* <AfButton
                            text={translate('BUTTONS.edit')}
                            onClick={() => {
                            }}
                            buttonType={BUTTON_TYPES.primary}
                            small
                          /> */}
                          <AfButton 
                            text={translate('BUTTONS.delete')} 
                            onClick={() => handleOpenDeleteModal(repair?.id)} 
                            buttonType={BUTTON_TYPES.remove} small 
                          />
                          
                        </div>) 
                        : ""
                        }
                      </td>
                    </tr>
                  );
              })}
              {/* {filteredLocationsCount === 0 ? <div className="filter-not-found">{translate('LOCATIONS.emptyLocations')}</div> : ''} */}
            </tbody>
          </table>
          :
          ""
          }

      </div>
      <div className="add-job-button">
        {(summary.status === STATUSSES.IN_PROGRESS && currentUser.role !== USER_TYPE.client.toString()) 
        ? (
        <AfButton
          text='Add Car Repair'
          small 
          buttonType={BUTTON_TYPES.add}
          buttonIcon={faPlus}
          onClick={() => {history.push(`/admin/addCarjobs/${summary.id}`);}}  
        />
        ) : ""
        }
        <div className={`total-price ${(summary.status === STATUSSES.IN_PROGRESS && currentUser.role !== USER_TYPE.client.toString()) ? 'in-progress' : ""}`}>Total price: <div className="price">{totalPrice} ron</div> </div>
      </div>

      <AfModal show={showDeleteModal} title={translate("MODAL.DeleteCarJob")} onClose={handleDeleteModalClose} onSave={() => handleDeleteCarJob()} text={translate("MODAL.areYouSureMessage")} />
      <AfModal show={showEditModal} title={translate("MODAL.EditCarJob")} onClose={handleEditModalClose} onSave={() => handleEditCarJob()} text={translate("MODAL.areYouSureMessage")} />
    </div>
  );
}

ExtendedSummary.propTypes = {
  summary: PropTypes.object.isRequired,
};

export default ExtendedSummary;