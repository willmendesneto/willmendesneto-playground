import { SAVE_COLLECTION_ITEMS_SUBSCRIPTION, } from '../actions/saveCollectionItemsSubscription';
export default function saveCollectionItemsSubscription(state, action) {
    if (action.type === SAVE_COLLECTION_ITEMS_SUBSCRIPTION) {
        return { ...state, collectionItemsSubscription: action.subscription };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=saveCollectionItemsSubscription.js.map