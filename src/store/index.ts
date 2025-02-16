import { Store, createStore } from 'vuex'
//import {Card} from '@/lib/api'
import { InjectionKey } from 'vue';

export interface State {
  Cards: Card[];
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    Cards: [],
  },
  mutations: {
    setCards(state, Cards: Card[]) {
      state.Cards = Cards;
    },
    addCard(state, Card: Card) {
      state.Cards.push(Card);
    },
    removeCard(state, CardId: number) {
      state.Cards = state.Cards.filter(Card => Card.id !== CardId);
    },
    updateCard(state, updatedCard: Card) {
      const index = state.Cards.findIndex(Card => Card.id === updatedCard.id);
      if (index !== -1) {
        state.Cards[index] = updatedCard;
      }
    }
  }
    
});