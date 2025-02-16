<template>
    <div id="CardFactory" class="lightbox-background" @click="close">
      <div id="control-panel" class="center-panel">
        <div class="panel-top">
          <a>{{ title }}</a>
          <div class="close" @click="close">X</div>
        </div>
        <div class="panel-body">
          <div class="row">
            <label for="name1">項目:</label>
            <input type="text" v-model="cardModel.title" >
          </div>
          <div class="row">
            <label for="name2">內容:</label>
            <input type="text" v-model="cardModel.content"  >
          </div>
  
        </div>
        <div class="panel-footer">
          <button class="delete" type="button"  v-if="type === cardFactoryTypeEnum.edit"  @click="deleteEvent">Delete</button>
          <button class="update" type="button" v-if="type === cardFactoryTypeEnum.edit" @click="done">Update</button>
          <button class="add" type="button" v-if="type === cardFactoryTypeEnum.add" @click="done">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue';
  import { cardFactoryTypeEnum ,CardTypeEnum }from '@/lib/enum/typeEnum'
  import { insert ,update, del } from '@/lib/api';
  
  const props = defineProps<{
    type: string,
    card: Card
  }>();
  const emit = defineEmits(['close','done','delete']);
  const title = ref('');
  let cardModel:Card = {id:0,title:'',content:'',date:'',creater:'',typeName :'',type:0,sort :0};
  
  const close = (event: MouseEvent) => { 
    const className = (event.target as HTMLElement).className;
    if ((className === "lightbox-background" || className === "close")) {
      cardModel = {};
      emit('close', false);
    }
  };
  
  
  const done = async () => {
    if(props.type == cardFactoryTypeEnum.add){
      cardModel.creater = "1"
      cardModel.project = "test"
      // let id =  await insertCards(cardModel);
      // if(id){
      //   cardModel.id = id ;
      //   emit('done', cardModel);
      // }
      //TODO:補上時間和流水編號
      emit('done', cardModel);
    }else{
      // cardModel.handler = "1"
      // cardModel.project = "SideProject"
      // let result =  await updateCards(cardModel);
      // if(result){
      //   console.log(cardModel)
      //   emit('done', cardModel);
      // }
      emit('done', cardModel);
    }
  };
  
  
  const deleteEvent = async () => {
    // let result =  await deletCard(cardModel);
    // if(result){
    //   emit('delete', cardModel);
    // }
    emit('delete', cardModel);
  };
  
  const init = () => {
    if (props.type === cardFactoryTypeEnum.add) {
      title.value = '新增';
      cardModel = {id:0,title:'',content:'',date:'',creater:'',typeName :CardTypeEnum[CardTypeEnum.Todo],type:CardTypeEnum.Todo,sort :0};
    } else {
      title.value = '修改';
      cardModel.id = props.card.id;
      cardModel.title = props.card.title;
      cardModel.content = props.card.content;
      cardModel.type = props.card.type;
    }
  };
  
  let insertCards = async (card:Card) => {
        try {
          let postData = {
              "header": {
                  "apiCode":"0000",
                  "userId":"20167"
              },
              "body": card
          }
  
  
          let result = await insert(postData);
          if(result.header.resultCode === '0000'){
            console.error(result);
            return result.body;
          }
          else { throw new Error();
          }
        } catch (error) {
          console.error('Error fatch data:');
        }
  };
  
  let updateCards = async (card:Card) => {
    try {
      let postData = {
          "header": {
              "apiCode":"0000",
              "userId":"20167"
          },
          "body": card
      }
  
      let result = await update(postData);
      if(result.header.resultCode === '0000'){
        console.error(result);
        return result.body;
      }
      else { throw new Error();
      }
    } catch (error) {
      console.error('Error fatch data:');
    }
  };
  
  let deletCard = async (card:Card) => {
    try {
      let postData = {
          "header": {
              "apiCode":"0000",
              "userId":"20167"
          },
          "body": card
      }
  
      let result = await del(postData);
      if(result.header.resultCode === '0000'){
        console.error(result);
        return result.body;
      }
      else { throw new Error();
      }
    } catch (error) {
      console.error('Error fatch data:');
    }
  };
  
  onMounted(() => {
    init();
  });
  
  </script>
  
  <style lang="scss">
  $heightParam: 500px;
  $widthParam: 500px;
  
  .center-panel {
    width: $widthParam;
    height: $heightParam;
  }
  </style>