import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  fetchTrainingWords,
  saveTraining,
  fetchWords,
  fetchStatistics,
} from "../../redux/slaces/wordSlice";
import {
  selectTrainingTasks,
  selectTrainingLoading,
} from "../../redux/slaces/selectors/wordsSelectors";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import TrainingProgress from "../../components/TrainingProgress/TrainingProgress";
import TrainingEmpty from "../../components/TrainingEmpty/TrainingEmpty";
import WellDoneModal from "../../components/WellDoneModal/WellDoneModal";
import toast from "react-hot-toast";
import Loader from "../../components/loader/loader";
import css from "./TrainingPage.module.css";

export default function TrainingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTrainingTasks);
  const loading = useSelector(selectTrainingLoading);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const wordMap = useMemo(() => {
    return Object.fromEntries(tasks.map((t) => [`${t._id}_${t.task}`, t]));
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchWords({ page: 1, limit: 1000 }));
    dispatch(fetchTrainingWords());
    dispatch(fetchStatistics());
  }, [dispatch]);

  const currentTask = tasks?.[currentIndex];

  const normalize = (str = "") =>
    str.trim().replace(/\s+/g, " ").replace(/–/g, "-");

  const handleNext = () => {
    if (!currentTask) return;
    if (!answer.trim()) return;

    setAnswers((prev) => ({
      ...prev,
      [`${currentTask._id}_${currentTask.task}`]: normalize(answer),
    }));

    setAnswer("");

    if (currentIndex < tasks.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const handleSave = async () => {
    const finalAnswers = {
      ...answers,
      ...(answer.trim() && currentTask
        ? {
            [`${currentTask._id}_${currentTask.task}`]: normalize(answer),
          }
        : {}),
    };

    const payload = Object.entries(finalAnswers)
      .map(([id]) => {
        const word = wordMap[id];

        if (!word) return null;

        return {
          _id: word._id,
          en: word.en,
          ua: word.ua,
          task: word.task,
        };
      })
      .filter(Boolean);

    if (!payload.length) return;

    try {
      await dispatch(saveTraining(payload)).unwrap();

      await dispatch(fetchWords({ page: 1, limit: 1000 }));

      await dispatch(fetchStatistics());

      const resultData = Object.entries(finalAnswers)
        .map(([id, userAnswer]) => {
          const word = wordMap[id];
          if (!word) return null;

          const isCorrect =
            normalize(userAnswer) ===
            normalize(word.task === "ua" ? word.ua : word.en);
          return {
            _id: word._id,
            task: word.task,
            en: word.en,
            ua: word.ua,
            isCorrect,
          };
        })
        .filter(Boolean);

      const correctWords = resultData.filter((w) => w.isCorrect);
      const mistakes = resultData.filter((w) => !w.isCorrect);

      setResult({
        correct: correctWords.length,
        total: resultData.length,
        mistakes,
        correctWords,
      });
      setCurrentIndex(0);
      setAnswers({});
      setAnswer("");

      setIsModalOpen(true);
    } catch {
      toast.error("Failed to save training");
    }
  };

  if (loading) return <Loader />;

  if (!tasks.length) return <TrainingEmpty />;

  return (
    <main>
      <section className={css.trainingSection}>
        <div className="container">
          {currentTask ? (
            <div className={css.trainingPage}>
              <TrainingProgress
                completed={
                  result?.correctWords?.length + result?.mistakes?.length || 0
                }
                total={tasks.length}
              />

              <TrainingRoom
                task={currentTask}
                answer={answer}
                setAnswer={setAnswer}
                onNext={handleNext}
                currentIndex={currentIndex}
                total={tasks.length}
              />
            </div>
          ) : (
            !isModalOpen && <TrainingEmpty />
          )}

          <footer className={css.footerActions}>
            <button className={css.saveBtn} onClick={handleSave}>
              Save
            </button>

            <button
              className={css.cancelBtn}
              onClick={() => navigate("/dictionary")}
            >
              Cancel
            </button>
          </footer>

          {isModalOpen && result && (
            <WellDoneModal
              onClose={() => {
                setIsModalOpen(false);
                navigate("/dictionary");
              }}
              correctWords={result.correctWords}
              mistakes={result.mistakes}
            />
          )}
        </div>
      </section>
    </main>
  );
}
