 type Message = {
    message: string;
    date: string;
    sortableDate: number;
  };
  
  export type User = {
    id: string;
    name: string;
    messages: Message[];
  };

  type UserMessage = {
    message: string;
    date: string; // Assuming this is a string, adjust as needed
  };
  
  export type UserEntry = {
    id: string;
    name: string;
    messages: UserMessage[];
  };