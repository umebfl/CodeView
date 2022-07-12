import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'
import { langType } from 'src/hooks/language/package/type'

export interface userConfigType {
    uploadServer_listConfig: GridInitialStateCommunity
    uploadServer_detailListConfig: GridInitialStateCommunity
    disk_listConfig: GridInitialStateCommunity

    dataSource: DataSourceEnum | undefined
}

export enum DataSourceEnum {
    shenzhen = '1',
    guangzhou = '2',
}

export const DataSourceText: Record<DataSourceEnum, keyof langType> = {
    [DataSourceEnum.shenzhen]: 'shenzhen',
    [DataSourceEnum.guangzhou]: 'guangzhou',
}
