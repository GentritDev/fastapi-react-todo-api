import React, { useEffect, useState } from "react";
import { Box, Button, Container, Flex, Input, Stack, Text } from "@chakra-ui/react";

interface Todo {
  id: number;
  item: string;
}

interface UpdateTodoProps {
  id: number;
  currentItem: string;
  onUpdated: () => void;
}

interface DeleteTodoProps {
  id: number;
  onDeleted: () => void;
}

function AddTodo({ onAdded }: { onAdded: () => void }) {
  const [item, setItem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim()) return;

    await fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });

    setItem("");
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        mt={3}
        placeholder="Add a todo item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
    </form>
  );
}

function UpdateTodo({ id, currentItem, onUpdated }: UpdateTodoProps) {
  const [item, setItem] = useState(currentItem);

  const updateTodo = async () => {
    if (!item.trim()) return;

    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });

    onUpdated();
  };

  return (
    <Flex gap={2}>
      <Input size="sm" value={item} onChange={(e) => setItem(e.target.value)} />
      <Button size="sm" onClick={updateTodo}>Save</Button>
    </Flex>
  );
}

function DeleteTodo({ id, onDeleted }: DeleteTodoProps) {
  const deleteTodo = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, { method: "DELETE" });
    onDeleted();
  };

  return (
    <Button size="sm" colorScheme="red" onClick={deleteTodo}>
      Delete
    </Button>
  );
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo");
    const json = await response.json();
    setTodos(json.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxW="container.md" pt="90px">
      <AddTodo onAdded={fetchTodos} />

      <Stack mt={5} gap={3}>
        {todos.map((todo) => (
          <Box key={todo.id} p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={2}>{todo.item}</Text>
            <Flex gap={2} direction={{ base: "column", md: "row" }}>
              <UpdateTodo id={todo.id} currentItem={todo.item} onUpdated={fetchTodos} />
              <DeleteTodo id={todo.id} onDeleted={fetchTodos} />
            </Flex>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}