import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useAuth } from "react-oidc-context";
import Task from "../components/card/Task";

const MyTaskContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  color: #1f2937;
  font-size: 1.25rem;
  margin-bottom: 15px;
  font-weight: 600;
`;

const ModalMessage = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #dc2626;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
    color: #374151;
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
  mutation DeleteTaskById($userid: ID!, $id: ID!) {
    deleteTaskById(userid: $userid, id: $id) {
      statusCode
      message
    }
  }
`;

const MyTasks: React.FC = () => {
  const auth = useAuth();
  const userid = auth.user?.profile?.sub;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{id: string, name: string} | null>(null);
  
  const { loading, error, data, refetch } = useQuery(GET_TASKS_BY_USER_ID, {
    variables: { userid },
  });

  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK);

  const handleDeleteClick = (taskid: string, taskname: string) => {
    setTaskToDelete({ id: taskid, name: taskname });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    
    try {
      await deleteTask({
        variables: { 
          id: taskToDelete.id, 
          userid: userid 
        },
        onCompleted: () => {
          refetch();
          setShowDeleteModal(false);
          setTaskToDelete(null);
        },
      });
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
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
              onDelete={(taskid) => handleDeleteClick(taskid, task.taskname)}
            />
          ))}
        </TasksGrid>
      )}
      
      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Delete Task</ModalTitle>
            <ModalMessage>
              Are you sure you want to delete "{taskToDelete?.name}"? This action cannot be undone.
            </ModalMessage>
            <ModalButtons>
              <CancelButton onClick={handleCancelDelete}>
                Cancel
              </CancelButton>
              <DeleteButton onClick={handleConfirmDelete} disabled={deleteLoading}>
                {deleteLoading ? "Deleting..." : "Delete"}
              </DeleteButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </MyTaskContainer>
  );
};

export default MyTasks;
