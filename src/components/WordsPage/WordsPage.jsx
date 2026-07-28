import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import WordsTable from "../WordsTable/WordsTable";
import WordsPagination from "../WordsPagination/WordsPagination";
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddWordModal from "../AddWordModal/AddWordModal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWords } from "../../redux/words/wordsSlice";
import { selectWords } from "../../redux/slaces/selectors/wordsSelectors";
import Loader from "../loader/loader";

export default function WordsPage({ showAddWordBtn = false }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [verbType, setVerbType] = useState("");
  const [page, setPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [deletingWord, setDeletingWord] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const words = useSelector(selectWords);

  const status = useSelector((state) => state.words.status);

  const totalPages = useSelector((state) => state.words.totalPages);

  useEffect(() => {
    dispatch(fetchWords({ page: 1, limit: 1000 })).unwrap();
  }, [dispatch, page]);

  const filteredWords = words.filter((w) => {
    const matchesSearch =
      w.en.toLowerCase().includes(search.toLowerCase().trim()) ||
      w.ua.toLowerCase().includes(search.toLowerCase().trim());

    const matchesCategory = !category || w.category === category;

    return matchesSearch && matchesCategory;
  });
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <section>
      <Dashboard
        showAddWordBtn={showAddWordBtn}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        verbType={verbType}
        setVerbType={setVerbType}
        onAddWordClick={() => setIsAddModalOpen(true)}
      />

      {isAddModalOpen && (
        <AddWordModal onClose={() => setIsAddModalOpen(false)} />
      )}

      <WordsTable
        words={filteredWords}
        openMenuId={openMenuId}
        setOpenMenuId={setOpenMenuId}
        onEdit={setEditingWord}
        onDelete={setDeletingWord}
      />

      {editingWord && (
        <EditModal word={editingWord} onClose={() => setEditingWord(null)} />
      )}

      {deletingWord && (
        <DeleteModal
          word={deletingWord}
          onClose={() => setDeletingWord(null)}
        />
      )}

      <WordsPagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  );
}
