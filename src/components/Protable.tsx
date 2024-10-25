import { ColumnsState, ProColumns, ProTable } from "@ant-design/pro-components";
import { useState } from "react";
import { DraggableCarousel } from "./DraggableCarousel";
import { MultiTag } from "./MultiTag";

const valueEnum = {
    0: 'close',
    1: 'running',
    2: 'online',
    3: 'error',
  };

  export enum ProjectJobStatus {
    APPROVED = 'APPROVED',
    AUTO_IGNORED = 'AUTO_IGNORED',
    IGNORED = 'IGNORED',
    NEW = 'NEW',
    PROCESSED = 'PROCESSED',
    REVIEWED = 'REVIEWED',
}

const ProjectTerms = {
  [ProjectJobStatus.APPROVED]: 'Aprovado',
  [ProjectJobStatus.AUTO_IGNORED]: 'Ignorado automaticamente',
  [ProjectJobStatus.IGNORED]: 'Ignorado',
  [ProjectJobStatus.NEW]: 'Novo',
  [ProjectJobStatus.PROCESSED]: 'Processado',
  [ProjectJobStatus.REVIEWED]: 'Revisado',
}
  
  export type TableListItem = {
    key: number;
    name: string;
    status: string;
    updatedAt: number;
    createdAt: number;
    money: number;
    statusJob: ProjectJobStatus[];
  };
  const tableListDataSource: TableListItem[] = [];
  
  for (let i = 0; i < 2; i += 1) {
    tableListDataSource.push({
      key: i,
      name: `TradeCode ${i}`,
      status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
      updatedAt: Date.now() - Math.floor(Math.random() * 1000),
      createdAt: Date.now() - Math.floor(Math.random() * 2000),
      money: Math.floor(Math.random() * 2000) * i,
      statusJob: [ProjectJobStatus.APPROVED, ProjectJobStatus.AUTO_IGNORED, ProjectJobStatus.IGNORED, ProjectJobStatus.NEW, ProjectJobStatus.PROCESSED, ProjectJobStatus.REVIEWED],
    });
  }
  
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: 'All', status: 'Default' },
        close: { text: 'Closed', status: 'Default' },
        running: { text: 'Running', status: 'Processing' },
        online: { text: 'Online', status: 'Success' },
        error: { text: 'Exception', status: 'Error' },
      },
    },
    // {
    //   title: 'Drag - Status do Jobs',
    //   dataIndex: 'statusJob',
    //   key: 'statusJob',
    //   filters: true,
    //   onFilter: true,
    //   valueEnum: ProjectJobStatus,
    //   render: (_, {statusJob } ) => { 
    //    const terms = statusJob.map((status) => ProjectTerms[status]);
    //    return <DraggableCarousel items={terms} />
    //   },
    // },
    {
      title: 'Badge - Status do Jobs',
      dataIndex: 'statusJob',
      key: 'statusJob',
      filters: true,
      onFilter: true,
      valueEnum: ProjectJobStatus,
      render: (_, {statusJob } ) => { 
       const terms = statusJob.map((status) => ProjectTerms[status]);
       return <MultiTag tags={terms} tagDisplay={1} title="Status do Jobs" />
      },
      align: 'center',
    },
    {
      title: 'Update Time',
      key: 'since2',
      dataIndex: 'createdAt',
      valueType: 'date',
      hideInSetting: true,
    },
  
    {
      title: 'Title',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: () => [<a key="1">Operation</a>, <a key="2">Delete</a>],
    },
  ];

  export const ProtableSandbox = () => {
    const [columnsStateMap, setColumnsStateMap] = useState<
      Record<string, ColumnsState>
    >({
      name: {
        show: false,
        order: 2,
      },
    });
    return (
      <ProTable<TableListItem, { keyWord?: string }>
        columns={columns}
        request={(params) =>
          Promise.resolve({
            data: tableListDataSource.filter((item) => {
              if (!params?.keyWord) {
                return true;
              }
              if (
                item.name.includes(params?.keyWord) ||
                item.status.includes(params?.keyWord)
              ) {
                return true;
              }
              return false;
            }),
            success: true,
          })
        }
        options={{
          search: true,
        }}
        rowKey="key"
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        search={false}
        dateFormatter="string"
        headerTitle="Protable Sand Box"
      />
    );
  };
  
