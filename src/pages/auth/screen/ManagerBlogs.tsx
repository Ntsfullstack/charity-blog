import React, { useEffect, useRef, useState } from "react";
import type { GetProp, InputRef, TableProps } from "antd";
import { Button, Popconfirm, Space, Table, TableColumnType, Input } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import qs from "qs";
import { deletePost, getListBlogs } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { BlogData } from "../types/types";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
type ColumnsType<T> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

type DataIndex = keyof BlogData;
const handleDelete = async (slug: string) => {
  const res = await deletePost(slug);
  if (res?.status === 200) {
    // setData(data.filter((item) => item.slug !== slug));
  }
};

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ManageBlogs: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const Navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<BlogData> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<BlogData> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "10%",
      render: (value) => (
        <img src={value} alt="Thumbnail" style={{ width: 70, height: 50 }} />
      ),
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      width: "45%",
      render: (value) => <p>{value}</p>,
    },
    {
      title: "author",
      dataIndex: "author",
      width: "10%",
      key: "author",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.slug)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record.slug)}
            okText="Yes"
            cancelText="No"
          >
            <Button key={record.slug} type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (slug: string) => {
    const res = await deletePost(slug);
    if (res?.status === 200) {
      toast.success("Delete success");
      setData(data.filter((item: any) => item.slug !== slug));
    } else {
      toast.error("Delete failed");
    }
  };
  const handleEdit = async (slug: any) => {
    Navigate(`/auth/edit-blog/${slug}`);
  };
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      await getListBlogs(qs.stringify(getRandomuserParams(tableParams))).then(
        (res) => {
          setData(res.data.content); // Lấy dữ liệu content từ response và cập nhật vào state
          setLoading(false); // Đặt trạng thái loading về false khi đã tải xong dữ liệu
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: Number(res.data.pagination.total), // Cập nhật tổng số lượng trang
            },
          });
        }
      );
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange: TableProps<BlogData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ManageBlogs;
