import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import { useAuth } from "react-oidc-context";

const CreateTaskContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const PageTitle = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
`;

const Form = styled.form`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #4338ca;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
    color: #374151;
  }
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #a7f3d0;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #b91c1c;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fca5a5;
`;

const CREATE_TASK = gql`
  mutation CreateTask($taskname: String!, $description: String!, $userid: ID!) {
    createTask(
      taskname: $taskname
      description: $description
      userid: $userid
    ) {
      statusCode
      message
    }
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
const CreateTask: React.FC = () => {
  const auth = useAuth();
  const [taskname, setTaskname] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const client = useApolloClient();
  const [createTask, { loading }] = useMutation(CREATE_TASK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!taskname.trim() || !description.trim()) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const result = await createTask({
        variables: {
          taskname: taskname.trim(),
          description: description.trim(),
          userid: auth.user?.profile?.sub,
        },
      });

      if (result.data?.createTask?.statusCode === 200) {
        setSuccessMessage("Task created successfully!");
        setTimeout(() => {
          handleClear();
        }, 1000);
        client.refetchQueries({
          include: [GET_TASKS_BY_USER_ID],
        });
      } else {
        setErrorMessage(
          result.data?.createTask?.message || "Failed to create task"
        );
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while creating the task"
      );
    }
  };

  const handleClear = () => {
    setTaskname("");
    setDescription("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <CreateTaskContainer>
      <PageTitle>Create New Task</PageTitle>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="taskname">Task Name</Label>
          <Input
            id="taskname"
            type="text"
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
            placeholder="Enter task name"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Task Description</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </SubmitButton>
          <ClearButton type="button" onClick={handleClear}>
            Clear
          </ClearButton>
        </ButtonGroup>
      </Form>
    </CreateTaskContainer>
  );
};

export default CreateTask;
