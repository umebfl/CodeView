import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'

export interface userConfigType {
    uploadServer_listConfig: GridInitialStateCommunity
    uploadServer_detailListConfig: GridInitialStateCommunity
    disk_listConfig: GridInitialStateCommunity

    dataSource: DataSourceEnum | undefined
}

export enum DataSourceEnum {
    guangzhou = 'guangzhou',
    shenzhen = 'shenzhen',
}
