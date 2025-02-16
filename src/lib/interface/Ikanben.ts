interface Task {
    id: number;
    name: string;
  }
  
interface Column {
    class:string;
    name: string;
    tasks: Card[];
}