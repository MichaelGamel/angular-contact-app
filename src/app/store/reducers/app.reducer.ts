
import * as fromRouter from '@ngrx/router-store';
import { IRouterStateUrl } from '@app/core';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as fromContacts from '../../contacts/store';

export interface IAppState {
    routingState: fromRouter.RouterReducerState<IRouterStateUrl>;
    contactState: fromContacts.IContactState;
}

/** The root reducer */
export const reducers: ActionReducerMap<IAppState> = {
    routingState: fromRouter.routerReducer,
    contactState: fromContacts.ContactReducer
};

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<IRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
