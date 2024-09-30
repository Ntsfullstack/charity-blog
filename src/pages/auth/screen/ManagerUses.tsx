import { SearchOutlined } from "@ant-design/icons";
import type { GetProp, InputRef, TableProps } from "antd";
import {
  Alert,
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  TableColumnType,
  Checkbox,
  Modal,
} from "antd";
import type {
  FilterDropdownProps,
  SorterResult,
  TableRowSelection,
} from "antd/es/table/interface";
import date from "date-and-time";
import qs from "qs";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getListUsers, deleteUsers } from "../api/auth.api";
import { UserData } from "../types/types";

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

type DataIndex = keyof UserData;

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ManageUsers: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

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
  ): TableColumnType<UserData> => ({
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

  const columns: ColumnsType<UserData> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
    },
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
      width: "30%",
      render: (value) => <p>{value}</p>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            key={`view-${record._id}`}
            type="primary"
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này không?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button key={`delete-${record._id}`} type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUsers(id);
      if (res?.status === 200) {
        toast.success("Xóa thành công");
        setData(data.filter((item: UserData) => item._id !== id));
      } else {
        toast.error("Xóa thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      toast.error("Xóa thất bại");
    }
  };

  const handleView = (record: UserData) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getListUsers(
        qs.stringify(getRandomuserParams(tableParams))
      );
      // Kiểm tra xem res.data có phải là một mảng không
      if (Array.isArray(res?.data)) {
        setData(res.data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: Number(res.pagination.total),
          },
        });
      } else {
        throw new Error("Dữ liệu nhận được không phải là một mảng");
      }
    } catch (error: any) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
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

  const handleTableChange: TableProps<UserData>["onChange"] = (
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

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Thông tin chi tiết người dùng"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Tên:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Câu hỏi:</strong> {selectedUser.question}
            </p>
            <p>
              <strong>Thời gian:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageUsers;
