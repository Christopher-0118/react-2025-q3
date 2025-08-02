import { useNavigate } from 'react-router-dom';
import type { Result } from '../api/type';
import './card.css';
import { addItem, deleteItem } from '../../store/item-slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Card = ({ id, name, description }: Result) => {
  const item = { id, name, description };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    navigate(`/pokemon/${name}/details`);
  };
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxState = event.target.checked;
    if (checkboxState) {
      dispatch(addItem(item));
    } else {
      dispatch(deleteItem(item));
    }
  };

  return (
    <div className="item">
      <div className={'description'} onClick={handleClick} data-testid="card">
        <p>{name}</p>
        <p>{description}</p>
      </div>
      <input
        type="checkbox"
        data-testid="checkbox"
        onChange={handleChecked}
      ></input>
    </div>
  );
};

export default Card;
