import Header from "../../components/Header/Header";

export default function SubjectsPage() {
  return (
    <div className="subjects-page">
      <Header />

      <div className="subjects-content p-4">
        <h1 className="text-3xl font-bold">Assuntos</h1>
        <p>Cadastre e acompanhe os assuntos que você estudou.</p>

        {/* Formulário */}
        <div className="subject-form mt-4">
          <h2 className="text-xl font-semibold">Novo Assunto</h2>
          <form>
            <label className="block mt-2">Título</label>
            <input type="text" placeholder="Ex: Matemática - Álgebra" className="border p-2 w-full" />

            <label className="block mt-2">Descrição</label>
            <textarea placeholder="Ex: Estudando equações do 2º grau" className="border p-2 w-full"></textarea>

            <button type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
              Salvar
            </button>
          </form>
        </div>

        {/* Lista de assuntos */}
        <div className="subject-list mt-6">
          <h2 className="text-xl font-semibold">Meus Assuntos</h2>
          <ul className="list-disc pl-5">
            <li>Matemática - Álgebra</li>
            <li>História - Idade Moderna</li>
            <li>Inglês - Leitura de textos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
