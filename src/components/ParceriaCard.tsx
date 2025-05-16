type Parceria = {
  id?: number;        // opcional, pode não ter no cadastro inicial
  title: string;
  url: string;
  newsDate: string;
};

export default function ParceriaCard({ parceria }: { parceria: Parceria }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold text-black">{parceria.title}</h2>
      <p className="text-blue-600 underline mb-2">
        <a href={parceria.url} target="_blank" rel="noopener noreferrer">
          {parceria.url}
        </a>
      </p>
      <p className="text-xs text-gray-500">
        Data: {new Date(parceria.newsDate).toLocaleDateString()}
      </p>
    </div>
  );
}