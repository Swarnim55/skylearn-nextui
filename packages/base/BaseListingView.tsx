'use client';
import { ChevronDownIcon } from '@/constants/ChevronDownIcon';
import { PlusIcon } from '@/constants/PlusIcon';
import { SearchIcon } from '@/constants/SearchIcon';
import { capitalize } from '@/utils/string';
import {
  Button,
  Card,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  Skeleton,
  SortDescriptor,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { columns, statusOptions, users } from '../dummy/listingdata';
import { GrActions, GrFormView, GrView } from 'react-icons/gr';
import BaseLayout from './BaseLayout';
// import { useCustomQuery } from '@/services/api';
import { PORTAL_BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { TbEdit } from 'react-icons/tb';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { debounce } from 'lodash';

const axios = require('axios').default;

const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'status', 'actions'];

type User = (typeof users)[0];

const BaseListingView = ({
  title,
  endpoint,
  filterKey,
  tableSchema,
  initialVisibleColumns,
  handleCreate,
  onActionClick,
}: {
  title: string;
  endpoint: string;
  filterKey: string;
  tableSchema: any;
  initialVisibleColumns: any;
  handleCreate: any;
  onActionClick: (rowData: any, action: string) => void;
}) => {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};

  const actionId = useMemo(() => {
    if (selectedKeys instanceof Set && selectedKeys.size === 1) {
      const id = selectedKeys.values().next().value ?? 'id';
      return id;
    }
  }, [selectedKeys]);

  const fetchDataList = async ({
    endpoint,
    jwtToken,
    page,
    rowsPerPage,
  }: {
    endpoint: string;
    jwtToken: string;
    page: number;
    rowsPerPage: number;
  }) => {
    const response = await axios.get(`${PORTAL_BASE_URL}${endpoint}`, {
      params: {
        paginate: true,
        pageSize: rowsPerPage,
        pageNumber: page,
        [filterKey]: filterValue,
      },

      headers: {
        Authorization: jwtToken,
      },
    });

    return response.data;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['lists', jwtToken, page, rowsPerPage],
    queryFn: () =>
      fetchDataList({
        endpoint: endpoint,
        jwtToken: jwtToken,
        page: page,
        rowsPerPage: rowsPerPage,
      }),
    // ⬇️ disabled as long as the jwtToken is empty
    enabled: !!jwtToken,
  });

  useEffect(() => {
    debounce(() => refetch(), 300);
  }, [filterValue]);

  const pages = data?.data?.totalPages;

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    return tableSchema.map((column) => ({
      uid: column.key,
      name: column.label,
      sortable: column.type === 'text', // You can adjust this condition based on your requirements
    }));
  }, [tableSchema]);

  const filteredItems = React.useMemo(() => {
    let filteredData = data ? [...data?.data?.data] : [];

    // if (hasSearchFilter && filterKey) {
    //   filteredData = filteredData.filter((user) => {
    //     return user[filterKey]
    //       .toLowerCase()
    //       .includes(filterValue.toLowerCase());
    //   });
    // }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredData;
  }, [data, filterValue, statusFilter, filterKey]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems;
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (item, columnKey) => {
      const cellValue = item[columnKey] || '';
      console.log('actionId', actionId);

      switch (tableSchema.find((column) => column.key === columnKey)?.type) {
        case 'text':
          return cellValue;
        case 'switch':
          return <Switch isSelected={cellValue} />;
        case 'date':
          return <p>{new Date(cellValue).toLocaleDateString()}</p>;
        // Add more cases as needed for other types
        case 'actions':
          return (
            <div className="flex">
              <Button
                isIconOnly
                variant="light"
                color="primary"
                aria-label="View"
                style={{ fontSize: '1.5rem' }}
                onClick={() => onActionClick(item.pid, 'view')}
              >
                <GrFormView />
              </Button>
              <Button
                isIconOnly
                variant="light"
                aria-label="Edit"
                style={{ fontSize: '1.5rem' }}
                onClick={() => onActionClick(item.pid, 'edit')}
              >
                <TbEdit />
              </Button>
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="md"
                aria-label="Delete"
                style={{ fontSize: '1.5rem' }}
                onClick={() => onActionClick(actionId, 'delete')}
              >
                <BiSolidTrashAlt />
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [tableSchema, selectedKeys]
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
      // refetch();
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  // const debouncedOnSearchChange = debounce(onSearchChange, 300);

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              classNames={{
                base: 'w-full sm:max-w-[44%]',
                inputWrapper: 'border-1',
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue('')}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    size="sm"
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    size="sm"
                    variant="flat"
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                className="bg-foreground text-background"
                endContent={<PlusIcon />}
                size="sm"
                onClick={handleCreate}
              >
                Add New
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {sortedItems.length} {title}
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      </>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    selectedKeys,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showShadow
          total={pages}
          isCompact
          page={page}
          initialPage={1}
          size="sm"
          onChange={(page) => setPage(page)}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  );

  const listSkeleton = () => {
    return (
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    );
  };

  return (
    <BaseLayout title={title}>
      <Table
        isCompact
        removeWrapper
        aria-label="Listing table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              'after:bg-foreground after:text-background text-background',
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align="start"
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={isLoading ? 'Requesting Data ...' : 'No data available'}
          items={sortedItems ?? []}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {(columnKey) => (
                    <TableCell>
                      {' '}
                      <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                      </Skeleton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            : (item) => {
                return (
                  <TableRow key={item.pid}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                );
              }}
        </TableBody>
      </Table>
    </BaseLayout>
  );
};

export default BaseListingView;
