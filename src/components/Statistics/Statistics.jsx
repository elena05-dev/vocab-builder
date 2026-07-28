import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../../redux/slaces/wordSlice";
import { selectStatisticsTotal } from "../../redux/slaces/selectors/wordsSelectors";
import css from "./Statistics.module.css";

export default function Statistics() {
  const dispatch = useDispatch();

  const total = useSelector(selectStatisticsTotal);
  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <div className={css.statistics}>
      <p className={css.statLine}>
        <strong>To study:</strong>
        <span>{total}</span>
      </p>
    </div>
  );
}
