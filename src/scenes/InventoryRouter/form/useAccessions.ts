import { useEffect, useMemo, useState } from 'react';

import { useOrganization } from 'src/providers';
import { selectAccessions } from 'src/redux/features/accessions/accessionsSelectors';
import { requestAccessions } from 'src/redux/features/accessions/accessionsThunks';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { SearchResponseAccession } from 'src/services/SeedBankService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAccessions = (record?: { accessionId?: number }, speciesId?: number, excludeUsedUp?: boolean) => {
  const dispatch = useAppDispatch();
  const { selectedOrganization } = useOrganization();

  const accessionsResponseData = useAppSelector(selectAccessions(selectedOrganization?.id || -1, speciesId));
  const availableAccessions = useMemo(
    () =>
      (accessionsResponseData &&
        accessionsResponseData.accessions?.filter(
          (accession) =>
            (accession.remainingUnits === 'Seeds' && Number(accession['remainingQuantity(raw)']) > 0) ||
            Number(accession['estimatedCount(raw)']) > 0
        )) ||
      [],
    [accessionsResponseData]
  );
  const [selectedAccession, setSelectedAccession] = useState<SearchResponseAccession>();

  useEffect(() => {
    if (availableAccessions && record?.accessionId) {
      setSelectedAccession(
        availableAccessions.find((accession: SearchResponseAccession) => accession.id === `${record.accessionId}`)
      );
    } else {
      setSelectedAccession(undefined);
    }
  }, [availableAccessions, record?.accessionId]);

  useEffect(() => {
    if (selectedOrganization) {
      void dispatch(requestAccessions(selectedOrganization.id, speciesId));
    }
  }, [dispatch, selectedOrganization, speciesId]);

  return { availableAccessions, selectedAccession };
};
