import React from 'react';

import Link from 'src/components/common/Link';
import CellRenderer, { TableRowType } from 'src/components/common/table/TableCellRenderer';
import { RendererProps } from 'src/components/common/table/types';
import { useUser } from 'src/providers';

export default function SpecificMetricsRenderer(props: RendererProps<TableRowType>): JSX.Element {
  const { column, row, index, value, onRowClick } = props;
  const { isAllowed } = useUser();

  if (column.key === 'name' && onRowClick) {
    return (
      <CellRenderer
        index={index}
        column={column}
        value={
          isAllowed('UPDATE_REPORTS_SETTINGS') ? (
            <Link fontSize='16px' onClick={() => onRowClick()}>
              {value as React.ReactNode}
            </Link>
          ) : (
            value
          )
        }
        row={row}
      />
    );
  }

  return <CellRenderer {...props} />;
}
