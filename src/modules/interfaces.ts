export interface IRequests {
    type: string;
    data: string;
    id: number;
  }
  export interface IRooms {
    roomId: string,
    roomUsers:
      {
        name: string,
        index: string,
      }[],
  }