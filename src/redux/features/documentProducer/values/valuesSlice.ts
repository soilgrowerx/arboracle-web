import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { StatusT, buildReducers } from 'src/redux/features/asyncUtils';
import { VariableValue } from 'src/types/documentProducer/VariableValue';

import { deliverableCompositeKeyFn } from '../../deliverables/deliverablesSlice';
import { specificVariablesCompositeKeyFn } from '../variables/variablesSlice';
import {
  requestListDeliverableVariablesValues,
  requestListSpecificVariablesValues,
  requestListVariablesValues,
  requestUpdateVariableValues,
  requestUploadImageValue,
  requestUploadManyImageValues,
} from './valuesThunks';

/**
 * Variable Values List
 */
type VariableValuesListState = Record<string, StatusT<VariableValue[]>>;

type VariableListArg = { projectId: number; maxValueId?: number };
export const variableListCompositeKeyFn = (arg: unknown): string => {
  const castArg = arg as VariableListArg;
  if (!castArg.projectId) {
    return '';
  }

  return `p${castArg.projectId}-mv${castArg.maxValueId || -1}`;
};

const initialVariableValuesListState: VariableValuesListState = {};

const deliverableVariableValuesListSlice = createSlice({
  name: 'deliverableVariableValuesListSlice',
  initialState: initialVariableValuesListState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<VariableValuesListState>) => {
    buildReducers(requestListDeliverableVariablesValues, true, deliverableCompositeKeyFn)(builder);
  },
});

const variableValuesListSlice = createSlice({
  name: 'variableValuesListSlice',
  initialState: initialVariableValuesListState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<VariableValuesListState>) => {
    buildReducers(requestListVariablesValues, true, variableListCompositeKeyFn)(builder);
  },
});

const specificVariableValuesListSlice = createSlice({
  name: 'specificVariableValuesListSlice',
  initialState: initialVariableValuesListState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<VariableValuesListState>) => {
    buildReducers(requestListSpecificVariablesValues, true, specificVariablesCompositeKeyFn)(builder);
  },
});

/**
 * Variable Values Update
 */
type VariableValuesUpdateState = Record<string, StatusT<number>>;

const initialVariableValuesUpdateState: VariableValuesUpdateState = {};

const variableValuesUpdateSlice = createSlice({
  name: 'variableValuesUpdateSlice',
  initialState: initialVariableValuesUpdateState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<VariableValuesUpdateState>) => {
    buildReducers(requestUpdateVariableValues)(builder);
  },
});

/**
 * Upload Variable Value Image
 */
type VariableValuesImageUploadState = Record<string, StatusT<number>>;

const initialVariableValuesImageUploadState: VariableValuesImageUploadState = {};

const variableValuesImageUploadSlice = createSlice({
  name: 'variableValuesImageUploadSlice',
  initialState: initialVariableValuesImageUploadState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<VariableValuesImageUploadState>) => {
    buildReducers(requestUploadImageValue)(builder);
    buildReducers(requestUploadManyImageValues)(builder);
  },
});

export const documentProducerVariableValuesReducers = {
  documentProducerDeliverableVariableValues: deliverableVariableValuesListSlice.reducer,
  documentProducerVariableValuesImageUpload: variableValuesImageUploadSlice.reducer,
  documentProducerVariableValuesList: variableValuesListSlice.reducer,
  documentProducerSpecificVariableValues: specificVariableValuesListSlice.reducer,
  documentProducerVariableValuesUpdate: variableValuesUpdateSlice.reducer,
};
