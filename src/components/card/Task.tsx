import React from "react";
import styled from "styled-components";

const TaskCard = styled.div`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: #4f46e5;
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const TaskTitle = styled.h3`
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
`;

const TaskId = styled.span`
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
  flex-shrink: 0;
  margin-left: 12px;
`;

const TaskDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TaskFooter = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span`
  background: #dbeafe;
  color: #1e40af;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: 1px solid #fca5a5;
  color: #ef4444;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fee2e2;
    border-color: #ef4444;
    color: #b91c1c;
  }
`;

interface TaskProps {
  taskid: string;
  taskname: string;
  description: string;
  onDelete?: (taskid: string) => void;
}

const Task: React.FC<TaskProps> = ({ taskid, taskname, description, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (onDelete) {
      onDelete(taskid);
    }
  };
  return (
    <TaskCard>
      <TaskHeader>
        <TaskTitle>{taskname}</TaskTitle>
        <TaskId>#{taskid.slice(-6)}</TaskId>
      </TaskHeader>
      
      <TaskDescription>{description}</TaskDescription>
      
      <TaskFooter>
        <StatusBadge>Active</StatusBadge>
        <DeleteButton onClick={handleDelete}>Delete Task</DeleteButton>
      </TaskFooter>
    </TaskCard>
  );
};

export default Task;
