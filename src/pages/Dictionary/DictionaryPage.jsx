import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import EditModal from "../../components/EditModal/EditModal";
import {
  updateWord,
  deleteWord,
  fetchWords,
  fetchStatistics,
} from "../../redux/slaces/wordSlice";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AddWordModal from "../../components/AddWordModal/AddWordModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWordsList,
  selectTotalPages,
} from "../../redux/slaces/selectors/wordsSelectors";
import useDebounce from "../../hooks/useDebounce";
import css from "./DictionaryPage.module.css";

export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState("");
  const [verbType, setVerbType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingWord, setEditingWord] = useState(null);
  const [deletingWord, setDeletingWord] = useState(null);
  const dispatch = useDispatch();

  const words = useSelector(selectWordsList);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    const safePage = Number(page);

    if (!Number.isFinite(safePage) || safePage < 1) return;

    dispatch(
      fetchWords({
        page: safePage,
        category: category || undefined,
        keyword: debouncedSearch || undefined,
        isIrregular: category === "verb" ? verbType === "irregular" : undefined,
      }),
    );
  }, [dispatch, category, verbType, page, debouncedSearch]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setVerbType("");
    setSearchParams({ page: "1" });
  };

  const handleVerbTypeChange = (value) => {
    setVerbType(value);
    setSearchParams({ page: "1" });
  };
  const handleSaveEdit = async (updatedWord) => {
    await dispatch(
      updateWord({
        id: updatedWord._id,
        data: {
          en: updatedWord.en,
          ua: updatedWord.ua,
          category: updatedWord.category,
          isIrregular: updatedWord.isIrregular,
        },
      }),
    );

    await dispatch(fetchWords({ category, verbType, page }));

    dispatch(fetchStatistics());
    setEditingWord(null);
  };

  const handleEdit = (word) => setEditingWord(word);

  const handleConfirmDelete = async (word) => {
    await dispatch(deleteWord(word._id));

    const res = await dispatch(fetchWords({ category, verbType, page }));

    const totalPages = res.payload?.totalPages;

    if (totalPages && page > totalPages) {
      setSearchParams({ page: String(totalPages) });
    }

    dispatch(fetchStatistics());
    setDeletingWord(null);
  };

  const handleAddWordSuccess = async () => {
    setSearchParams({ page: "1" });

    await dispatch(
      fetchWords({
        category,
        verbType,
        page: 1,
      }),
    );
  };

  const handleSearchChange = (value) => {
    setSearch(value);

    if (page !== 1) {
      setSearchParams({ page: "1" });
    }
  };

  const handleDeleteClick = (word) => setDeletingWord(word);

  return (
    <main className={css.main}>
      <section className={css.dictionarySection}>
        <div className="container">
          <div className={css.dictionary}>
            <Dashboard
              showAddWordBtn
              search={search}
              setSearch={handleSearchChange}
              category={category}
              setCategory={handleCategoryChange}
              verbType={verbType}
              setVerbType={handleVerbTypeChange}
              onAddWordClick={() => setIsAddModalOpen(true)}
            />

            {isAddModalOpen && (
              <AddWordModal
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddWordSuccess}
              />
            )}

            <WordsTable
              words={words}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              variant="dictionary"
            />

            {editingWord && (
              <EditModal
                key={editingWord._id}
                word={editingWord}
                onSave={handleSaveEdit}
                onClose={() => setEditingWord(null)}
              />
            )}

            {deletingWord && (
              <DeleteModal
                word={deletingWord}
                onConfirm={handleConfirmDelete}
                onClose={() => setDeletingWord(null)}
              />
            )}

            <WordsPagination
              currentPage={page}
              totalPages={totalPages}
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
