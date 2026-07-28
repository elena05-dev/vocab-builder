import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import WordsTable from "../../components/WordsTable/WordsTable";
import EditModal from "../../components/EditModal/EditModal";
import {
  addWordToDictionary,
  fetchRecommendWords,
} from "../../redux/slaces/wordSlice";
import {
  selectRecommendTotalPages,
  selectRecommendWords,
} from "../../redux/slaces/selectors/wordsSelectors";
import useDebounce from "../../hooks/useDebounce";
import css from "./RecommendPage.module.css";

export default function RecommendPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState("");
  const [verbType, setVerbType] = useState("");
  const [addedWords, setAddedWords] = useState([]);
  const dispatch = useDispatch();
  const words = useSelector(selectRecommendWords);
  const totalPages = useSelector(selectRecommendTotalPages);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const resetPage = () => {
    setSearchParams({ page: "1" });
  };

  useEffect(() => {
    dispatch(
      fetchRecommendWords({
        page,
        limit: 7,
        keyword: debouncedSearch || undefined,
        category: category || undefined,
        isIrregular: category === "verb" ? verbType === "irregular" : undefined,
      }),
    );
  }, [dispatch, page, debouncedSearch, category, verbType]);

  const handleAddWord = async (word) => {
    try {
      await dispatch(addWordToDictionary(word._id)).unwrap();

      setAddedWords((prev) =>
        prev.includes(word._id) ? prev : [...prev, word._id],
      );

      toast.success(`${word.en} added to dictionary`);
    } catch (error) {
      toast.error(error.message || "Failed to add word");
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);

    if (page !== 1) {
      setSearchParams({ page: "1" });
    }
  };
  const handleCategoryChange = (value) => {
    setCategory(value);
    setVerbType("");
    resetPage();
  };

  const handleVerbTypeChange = (value) => {
    setVerbType(value);
    resetPage();
  };

  return (
    <main className={css.main}>
      <section className={css.recomendSection}>
        <div className="container">
          <div className={css.recomend}>
            <Dashboard
              showAddWordBtn={false}
              search={search}
              setSearch={handleSearchChange}
              category={category}
              setCategory={handleCategoryChange}
              verbType={verbType}
              setVerbType={handleVerbTypeChange}
            />

            <WordsTable
              words={words}
              variant="recommend"
              onAdd={handleAddWord}
              addedWords={addedWords}
            />

            <WordsPagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={(p) =>
                p === 1
                  ? setSearchParams({})
                  : setSearchParams({ page: String(p) })
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
