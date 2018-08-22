import { IAppState } from '@app/store';
import { createSelector } from '@ngrx/store';
import { IRouterStateUrl } from '@app/core';
import { RouterReducerState } from '@ngrx/router-store';

export const selectFeature = (state: IAppState) => state.routingState;

export const getRoutingState = createSelector(
    selectFeature,
    (state: RouterReducerState<IRouterStateUrl>) => state.state
);
