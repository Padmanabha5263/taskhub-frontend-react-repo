import React from "react";
import styled from "styled-components";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useAuth } from "react-oidc-context";
import Task from "../components/card/Task";

const MyTaskContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const PageTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const TaskCount = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #e74c3c;
  font-size: 1.1rem;
  background-color: #fdf2f2;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  margin: 20px 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const GET_TASKS_BY_USER_ID = gql`
  query GetTasksByUserId($userid: ID!) {
    getTasksByUserId(userid: $userid) {
      statusCode
      message
      data {
        id
        taskname
        description
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($taskid: ID!) {
    deleteTask(taskid: $taskid) {
      statusCode
      message
    }
  }
`;

const MyTasks: React.FC = () => {
  const auth = useAuth();
  const userid = auth.user?.profile?.sub;
  const { loading, error, data, refetch } = useQuery(GET_TASKS_BY_USER_ID, {
    variables: { userid },
  });
  
  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK);
  
  const handleDeleteTask = async (taskid: string) => {
    try {
      await deleteTask({ 
        variables: { taskid },
        onCompleted: () => {
          refetch(); // Refresh the task list after deletion
        }
      });
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (loading)
    return (
      <MyTaskContainer>
        <LoadingContainer>Loading your tasks...</LoadingContainer>
      </MyTaskContainer>
    );

  if (error)
    return (
      <MyTaskContainer>
        <ErrorContainer>Error loading tasks: {error.message}</ErrorContainer>
      </MyTaskContainer>
    );

  const AllTasks = data?.getTasksByUserId?.data || [];

  return (
    <MyTaskContainer>
      <PageTitle>My Tasks</PageTitle>
      <TaskCount>
        {AllTasks.length} {AllTasks.length === 1 ? "task" : "tasks"} found
      </TaskCount>

      {AllTasks.length === 0 ? (
        <EmptyState>
          <h3>No tasks found</h3>
          <p>
            You don't have any tasks assigned yet. Check back later or create a
            new task.
          </p>
        </EmptyState>
      ) : (
        <TasksGrid>
          {AllTasks.map((task: any) => (
            <Task
              key={task.id}
              taskid={task.id}
              description={task.description}
              taskname={task.taskname}
              onDelete={handleDeleteTask}
            />
          ))}
        </TasksGrid>
      )}
    </MyTaskContainer>
  );
};

export default MyTasks;
