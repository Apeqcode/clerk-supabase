import styles from "../../styles/Home.module.css";

import React from "react";
import { useState, useEffect } from "react";
import {
  useSession,
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};

export default function TodoList({ todos, setTodos }) {
  const { session } = useSession();
  const [loadingTodos, setLoadingTodos] = useState(true);

  // on first load, fetch and set todos
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoadingTodos(true);
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data: todos } = await supabase.from("todos").select("*");
        setTodos(todos);
      } catch (e) {
        alert(e);
      } finally {
        setLoadingTodos(false);
      }
    };
    loadTodos();
  }, []);

  // if loading, just show basic message
  if (loadingTodos) {
    return <div className={styles.label}>Loading...</div>;
  }

  // display all the todos
  return (
    <>
      {todos?.length > 0 ? (
        <div className={styles.todoList}>
          <ol>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className={styles.label}>You don&apos;t have any todos!</div>
      )}
    </>
  );
}

function AddTodoForm({ todos, setTodos }) {
  const { session } = useSession();
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo === "") {
      return;
    }

    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { data } = await supabase
      .from("todos")
      .insert({ title: newTodo, user_id: session.user.id })
      .select();

    setTodos([...todos, data[0]]);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
      &nbsp;<button>Add Todo</button>
    </form>
  );
}
