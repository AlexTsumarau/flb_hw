import React, {useState, useEffect, useMemo, useRef, useCallback} from "react";
import ApiBackendService from "../services/ApiBackendService";
import {useTable, usePagination, useSortBy} from "react-table";
import EditableCell from "./EditableCell";

const ConnectionsList = (props) => {
    const [connectionsData, setConnectionsData] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLine, setSearchLine] = useState("");
    const [pageCountUpdated, setPageCountUpdted] = useState(0);
    const connectionsDataRef = useRef();
    connectionsDataRef.current = connectionsData;

    const defaultColumn = {
        Cell: EditableCell,
    }

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const onChangeSearchLine = (e) => {
        const searchLine = e.target.value;
        setSearchLine(searchLine);
    };

    const fetch = () => {
        if(searchTitle.length === 0 && searchLine.length === 0){
            fetchAll();
        }else{
            fetchFiltered();
        }
    }

    const fetchAll = () => {
        const sortByCond = sortBy.length > 0 ? sortBy[0].id + ',' + (sortBy[0].desc?'desc':'asc') : null;
        ApiBackendService.getAll({pageIndex, pageSize, sortByCond})
            .then((response) => {
                response.data._embedded.connections.map(c => {
                    c.line = c._links.line.href;
                    return c;
                });
                setConnectionsData(response.data._embedded.connections);
                setPageCountUpdted(response.data.page.totalPages);
                this.state.pageCount = 10;
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const fetchFiltered = () => {
        const sortByCond = sortBy.length > 0 ? sortBy[0].id + ',' + (sortBy[0].desc?'desc':'asc') : null;
        ApiBackendService.findBy({pageIndex, pageSize, searchTitle, searchLine, sortByCond})
            .then((response) => {
                setConnectionsData(response.data._embedded.connections);
                setPageCountUpdted(Math.round(response.data._embedded.connections.length/pageSize));
                setPageIndex(0);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteConnection = (rowIndex) => {
        const id = connectionsDataRef.current[rowIndex].id;

        ApiBackendService.remove(id)
            .then((response) => {
                props.history.push("/connections");

                let newconnectionsData = [...connectionsDataRef.current];
                newconnectionsData.splice(rowIndex, 1);

                setConnectionsData(newconnectionsData);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header: "#",
                accessor: "id",
                sortable: true
            },
            {
                Header: "Name",
                accessor: "name",
                sortable: true
            },
            {
                Header: "Duration, mins",
                accessor: "duration",
                sortable: true
            },
            {
                Header: "Distance, km",
                accessor: "distance",
                sortable: true
            },
            {
                Header: "Line",
                accessor: "lineNumber",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => deleteConnection(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const updateMyDataF = (id, key, value) => {
        let data = {};
        data[key] = value;
        ApiBackendService.update(id, data);
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageIndex,
        updateMyData,
        state: {pageIndex, pageSize, pageCount, sortBy},
    } = useTable({
        columns,
        defaultColumn,
        data: connectionsData,
        initialState: {pageIndex: 0, pageSize: 10, pageCountUpdated: 0},
        //fetchData: fetchTableData(),
        manualPagination: true,
        pageCount: pageCountUpdated,
        autoResetSortBy: false,
        autoResetPage: false,
        manualSortBy: true,
        updateMyData: updateMyDataF
    }, useSortBy, usePagination);

    useEffect(() => {
        fetch();
    },[pageSize, pageIndex, pageCount, sortBy]);

    return (
        <div className="list row">
            <div className="col-md-12">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by connection name"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                        onKeyUp={fetch}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by exact line number"
                        value={searchLine}
                        onChange={onChangeSearchLine}
                        onKeyUp={fetch}
                    />
                </div>
            </div>
            <div className="col-md-12 list">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                    {column.isSorted && column.sortable
                        ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                        : ""}
                  </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                <div className="pagination">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    {' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    {' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    {' '}
                    <button onClick={() => gotoPage(pageCountUpdated-1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                    {' '}
                    <span>
          Page{' '}
                        <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
                </div>
            </div>
        </div>
    );
};

export default ConnectionsList;
