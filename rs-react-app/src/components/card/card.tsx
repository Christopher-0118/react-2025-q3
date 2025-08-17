'use client';
import type { Result } from '../../store/type';
import './card.css';
import { addItem, deleteItem } from '../../store/item-slice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Card = ({ id, name, description }: Result) => {
  const item = { id, name, description };
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((state) => state.item.items);
  const isChecked = selectedItem.some((item) => item.id === id);
  const router = useRouter();
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
      <Link
        className="description"
        href={`/details/${name}`}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/details/${name}`);
        }}
      >
        <p>{name}</p>
        <p>{description}</p>
      </Link>
      <input
        type="checkbox"
        data-testid="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      ></input>
    </div>
  );
};

export default Card;
