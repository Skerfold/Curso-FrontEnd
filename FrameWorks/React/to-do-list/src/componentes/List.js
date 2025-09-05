import "./List.css";

// arrow function
const List = ({ tarefas, removerTarefas }) => {
  return (
    // lista não ordenada com as tarefas como elemento da Lista
    <ul>
      {tarefas.map((tarefa, index) => (
        <li key={index}>
          {tarefa}
          <button onClick={() => removerTarefas(index)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
