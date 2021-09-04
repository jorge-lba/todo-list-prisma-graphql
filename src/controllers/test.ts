import { TodoRepositoryImpInMemory } from "../repositories/inMemory/TodoRepositoryImpInMemory";

const test = TodoRepositoryImpInMemory.getInstance();

(async () => {
  await test.create({
    title: "Todo pronto",
    description: "Criar a funcionalidade que vai atualizar um ToDo como Pronto!"
  });

  const todos = await test.findAll();
  console.log(todos);

  const todo = await test.findById(2);
  console.log(todo);

  const check = await test.readyById(1);
  console.log(check);
})();