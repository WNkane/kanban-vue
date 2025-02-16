<template>
    <button class="button-insert" @click="openAddmode()">新增卡片</button>
    <div class="kanban-board">
      <div v-for="(column, index) in columns" :key="index" class="kanban-column" :class=column.class >
        <h3>{{ column.name }}</h3>
        <draggable v-model="column.tasks" :group="{ name: 'tasks', put: true }" itemKey="id" @change="log">
          <template #item="{ element }" >
            <div class="kanban-task"  @dblclick="openEditmode(element)" > 
            <div class = "row slim"><label for ="name1" >標題</label><div class="content">{{ element.title }}</div> </div> 
            <div class = "row slim"><label >內容</label><div class="content">{{ element.content }}</div> </div> 
            <div class = "row slim"><label >編號</label><div class="content">{{ element.id }}</div> </div> 
            <div class = "row slim"><label >時間</label><div class="content">{{ element.date }}</div> </div> 
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <CardFactory :type="cardFactoryType" :card="editCard" v-if="isOpenCardFactory" @close="boxCloseEvent" @done="boxDoneEvent" @delete="deleteEvent"/>
  </template>
  
  <script lang="ts" setup>
  import { reactive,ref } from 'vue';
  import draggable from 'vuedraggable';
  import { useStore } from 'vuex';
  import { key } from '@/store';
  import { CardTypeEnum,cardFactoryTypeEnum }from '@/lib/enum/typeEnum'
  import CardFactory from '@/components/CardFactory.vue'; 
 
  const isOpenCardFactory = ref(false); 
  const cardFactoryType = ref("");
  let editCard:Card = {};
  
  const openAddmode = () => {
      cardFactoryType.value = cardFactoryTypeEnum.add;
      isOpenCardFactory.value = true;
    };
  
  const openEditmode = (card :Card) => {
    editCard = card;
    cardFactoryType.value = cardFactoryTypeEnum.edit;
    isOpenCardFactory.value = true;
  };
  
  const boxCloseEvent = (type: boolean) => {
        isOpenCardFactory.value = type;
        editCard = {};
    };
  
  const boxDoneEvent = (newCard: Card) => {
        isOpenCardFactory.value = false;
        if(cardFactoryType.value === cardFactoryTypeEnum.add){
          todo.tasks.push(newCard);
          store.state.Cards.push(newCard);
        }
        else{
          if(Object.values(CardTypeEnum).includes(newCard.type!)){
            var card = columnTasks[newCard.type!].find(column => column.id === newCard.id!);
            card!.title = newCard.title;
            card!.content = newCard.content;
  
            const storedata = store.state.Cards.find(card => card.id === newCard.id);
            storedata!.title = newCard.title;
            storedata!.content = newCard.content;
          }
        }
    };
  
    const deleteEvent = (deletCard: Card) => {
      var index = -1;
      if(Object.values(CardTypeEnum).includes(deletCard.type!)){
        index = columnTasks[deletCard.type!].findIndex(card => card.id === deletCard.id);
        if (index > -1)  columnTasks[deletCard.type!].splice(index, 1);
        var storeIndex = store.state.Cards.findIndex(card => card.id === deletCard.id);
        if (storeIndex > -1)  store.state.Cards.splice(storeIndex, 1);
      }
      isOpenCardFactory.value = false;
    }
  
  let columns = reactive<Column[]>([
    {
      class: 'todo',
      name: 'To Do',
      tasks: [],
    },
    {
      class:'doing',
      name: 'Doing',
      tasks: [],
    },
    {
      class:'pending',
      name: 'Pending',
      tasks: [],
    },
    {
      class:'done',
      name: 'Done',     
      tasks: [],
    },
  ]);
  
  let store = useStore(key);
  
  const getList = (className: string) => columns.filter(column => column.class === className)[0];
  
  let todo = getList("todo");
  let doing = getList("doing");
  let pending = getList("pending");
  let done = getList("done");
  
  const columnTasks: { [key: number]: Card[] } = {
    0: todo.tasks,
    1: doing.tasks,
    2: pending.tasks,
    3: done.tasks
  };
  
  
  store.state.Cards.forEach(card => {
    const tasks = columnTasks[card.type!];
    if (tasks) {
      tasks.push(card);
    }
  });
    
  
  // const add = () => {
  //   columns[0].tasks.push({ name: "Juan " , id: 123 })
  // };
  
  
  
  const log = (evt: any) => {
    const { added } = evt;
    if (added !== undefined) {
      const changer = added;
      const updatedata = store.state.Cards.find(card => card.id === changer.element.id);
  
      if (updatedata) {
        updatedata.type = changer.newIndex;
  
        const isCardInList = (list: any[]) => list.some(card => card.id === changer.element.id);
  
        let newType: CardTypeEnum | undefined;
  
        if (isCardInList(todo.tasks)) {
          newType = CardTypeEnum.Todo;
        } else if (isCardInList(doing.tasks)) {
          newType = CardTypeEnum.Doing;
        } else if (isCardInList(pending.tasks)) {
          newType = CardTypeEnum.Pending;
        } else if (isCardInList(done.tasks)) {
          newType = CardTypeEnum.Done;
        }
  
        if (newType !== undefined) {
          updatedata.typeName = CardTypeEnum[newType];
          updatedata.type = newType;
        }
      }
    }
  };
  
  
  
  </script>
  
  <style scoped lang="scss">
  $color-todo: #f4f4f4;
  $color-doing: #bbffe0;
  $color-pending: #fddeea;
  $color-done: #9cd6ff;
  
  .kanban-board {
    display: flex;
    // gap: 16px;
    justify-content: center;
  
      h3{    
        padding: 10px 0px;
        margin: 5px;
        border-bottom: solid;
      }
  
      .kanban-column {
        background-color: #f4f4f4;
        padding-top: 0px;
        width: 45vh;
  
        &.todo{background-color: $color-todo;}
        &.doing{background-color:$color-doing;}
        &.pending{background-color:$color-pending;}
        &.done{background-color: $color-done;}
      }
  
    .kanban-task {
      background-color: #ffffff;
      padding: 8px;
      border: 1px solid #ddd;
      margin: 8px  15px 8px 15px ;
      cursor: pointer;
      &:hover{
      border: 3px solid #fadd5e;
      }
      &:active{
        cursor:grab;
      }
    }
  }
  
  
  
  
  </style>