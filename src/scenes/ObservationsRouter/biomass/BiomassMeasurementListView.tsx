import React from 'react';

import { TableColumnType } from '@terraware/web-components';

import Table from 'src/components/common/table';
import BiomassMeasurementRenderer from 'src/scenes/ObservationsRouter/biomass/BiomassMeasurementRenderer';
import strings from 'src/strings';
import { ObservationResultsPayload } from 'src/types/Observations';

export type BiomassMeasurementListProps = {
  adHocObservationResults?: ObservationResultsPayload[];
};

export default function BiomassMeasurementList({ adHocObservationResults }: BiomassMeasurementListProps): JSX.Element {
  const columns = (): TableColumnType[] => {
    return [
      {
        key: 'monitoringPlotNumber',
        name: strings.PLOT,
        type: 'string',
      },
      {
        key: 'monitoringPlotDescription',
        name: strings.PLOT_DESCRIPTION,
        type: 'string',
      },
      {
        key: 'plantingSiteName',
        name: strings.PLANTING_SITE,
        type: 'string',
      },
      {
        key: 'startDate',
        name: strings.DATE,
        type: 'date',
      },
      {
        key: 'totalPlants',
        name: strings.PLANTS,
        type: 'number',
      },
      {
        key: 'totalSpecies',
        name: strings.SPECIES,
        type: 'number',
      },
      {
        key: 'actionsMenu',
        name: '',
        type: 'string',
      },
    ];
  };

  return (
    <Table
      id='biomass-measurement-table'
      columns={columns}
      rows={adHocObservationResults || []}
      orderBy='startDate'
      showTopBar={true}
      Renderer={BiomassMeasurementRenderer}
    />
  );
}
