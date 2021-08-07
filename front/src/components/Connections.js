import React, {useState, useEffect, useMemo, useRef} from "react";
import ApiBackendService from "../services/ApiBackendService";
import {useTable, usePagination} from "react-table";

const ConnectionsList = (props) => {
    const [tutorials, setTutorials] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLine, setSearchLine] = useState("");
    const [pageCountUpdated, setPageCountUpdted] = useState(0);
    const [sortBy, setSortBy] = useState({});
    const tutorialsRef = useRef();

    tutorialsRef.current = tutorials;

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const onChangeSearchLine = (e) => {
        const searchLine = e.target.value;
        setSearchLine(searchLine);
    };

    const fetchTableData = () => {
        //console.log('!!!!!!!!!!!!!!! fetchTableData', pageCount, pageIndex, pageSize);
    };

    const fetch = () => {
        if(searchTitle.length === 0 && searchLine.length === 0){
            fetchAll();
        }else{
            fetchFiltered();
        }
    }

    const fetchAll = () => {
        ApiBackendService.getAll({pageIndex, pageSize})
            .then((response) => {
                response.data._embedded.connections.map(c => {
                    c.line = c._links.line.href;
                    return c;
                });
                setTutorials(response.data._embedded.connections);
                //setPageSize(response.data.page.size);
                setPageCountUpdted(response.data.page.totalPages);
                this.state.pageCount = 10;
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const fetchFiltered = () => {
        ApiBackendService.findBy({pageIndex, pageSize, searchTitle, searchLine})
            .then((response) => {
                setTutorials(response.data._embedded.connections);
                setPageCountUpdted(Math.round(response.data._embedded.connections.length/pageSize));
                setPageIndex(0);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteTutorial = (rowIndex) => {
        const id = tutorialsRef.current[rowIndex].id;

        ApiBackendService.remove(id)
            .then((response) => {
                props.history.push("/tutorials");

                let newTutorials = [...tutorialsRef.current];
                newTutorials.splice(rowIndex, 1);

                setTutorials(newTutorials);
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
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Duration, mins",
                accessor: "duration",
            },
            {
                Header: "Distance, km",
                accessor: "distance",
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
                            <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageIndex,
        setPageSize,
        setPageCount,
        state: {pageIndex, pageSize, pageCount},
    } = useTable({
        columns,
        data: tutorials,
        initialState: {pageIndex: 0, pageSize: 10, pageCountUpdated: 3},
        fetchData: fetchTableData(),
        manualPagination: true,
        pageCount: pageCountUpdated
    }, usePagination);

    useEffect(() => {
        fetch();
    },[pageSize, pageIndex, pageCount]);

    return (
        <div className="list row">
            <pre>
        <code>
          {JSON.stringify(
              {
                  pageIndex,
                  pageSize,
                  pageCountUpdated,
                  canNextPage,
                  canPreviousPage,
              },
              null,
              2
          )}
        </code>
      </pre>
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
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                    <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
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
